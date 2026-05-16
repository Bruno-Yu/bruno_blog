---
title: K8s Linux 容器存取 Windows Share（SMB/CIFS）
description: 在 Kubernetes 的 Linux 容器節點上存取 Windows SMB/CIFS 網路共享資料夾的正確做法，以及各種方法的安全性對照。
tags: [DevOps, Kubernetes, K8S, Windows, SMB]
date: 2025-02-15
type: doc
publish: true
---

> 在 Kubernetes 的 Linux 容器節點上存取 Windows SMB/CIFS 網路共享資料夾的正確做法，以及各種方法的安全性對照。

## 核心概念

**背景問題**：Linux 容器無法使用 Windows 的 `LogonUser` + `WindowsIdentity.RunImpersonated`（這套 API 依賴 `advapi32.dll`，只存在於 Windows）。因此，在 K8s Linux Pod 裡直接用 UNC 路徑 + .NET Impersonation 存取 Windows 共享資料夾幾乎必然失敗。

**主因**：不是 K8s 的問題，而是**身份模型不同**——Linux 容器無法等價達成 Windows impersonation。

**推薦解法**：使用 **CSI SMB Driver** 把 Windows Share 掛成 PV/PVC，讓應用程式改為讀取容器內的掛載路徑，在 appsettings 中新增預掛載路徑變數，完全不碰 UNC + Impersonation。

---

## 方法比較

| 方法 | 執行中動態 mount | 需要 root/privileged | 安全性 | 部署複雜性 | 說明 |
|---|---|---|---|---|---|
| **CSI SMB Driver（推薦）** | 否 | 通常否（CSI Node plugin 處理）| 高（Secret/RBAC/可設 RO）| 中 | 最主流；可 RO/RW；憑證用 Secret |
| **PV/PVC（static PV）+ CSI** | 否 | 通常否 | 高 | 中 | 本質是 CSI 的用法 |
| **節點預先 mount SMB + hostPath** | 否 | 節點端需要 root | 中偏低 | 中 | 每個 Node 都要一致 mount，維運重 |
| **initContainer 自行 mount CIFS** | 否 | 多半要 privileged/SYS_ADMIN | 中偏低 | 中-高 | mountPropagation 問題多；不建議長期 |
| **應用程式內動態 mount** | 理論是（但幾乎行不通）| 幾乎一定要 | 低（風險最高）| 高 | 強烈不建議：開大洞 |

### 同帳密 + AD 網域 + 只讀需求的最佳解

> **結論：CSI SMB Driver + PV/PVC（ReadOnly）**

| 方法 | 適合嗎 | 說明 |
|---|---|---|
| **CSI SMB Driver + PV/PVC（ReadOnly）** | **最適合** | 標準雲原生作法；share 固定、帳密固定、只讀尤其合適 |
| 節點先 mount SMB + hostPath | 可用但不建議 | 維運重，Node 擴縮/漂移容易出事 |
| initContainer mount CIFS | 不建議 | 權限、可攜性問題多 |
| UNC + Impersonation（.NET）| **不適合** | Linux 容器不等同 Windows token impersonation，部署後必然失敗 |

---

## 關鍵名詞

| 名詞 | 說明 |
|---|---|
| **CSI**（Container Storage Interface）| 容器平台掛載不同廠商儲存設備的標準介面 |
| **SMB/CIFS** | Windows 網路共享協定；CIFS 是 SMB 的早期版本，Linux 可用 `mount -t cifs` 掛載 |
| **PV（Persistent Volume）** | K8s 中的持久化儲存資源，由管理員事先建立（static）或動態建立 |
| **PVC（Persistent Volume Claim）** | 使用者對儲存資源的申請（「我要一個 10GB 磁碟」）|
| **RO/RW** | ReadOnly（只讀）/ ReadWrite（讀寫）|

---

## 落地做法（五步驟）

### Step 1：安裝 CSI SMB Driver（叢集層一次性）

參考：[kubernetes-csi/csi-driver-smb](https://github.com/kubernetes-csi/csi-driver-smb)

### Step 2：用 K8s Secret 放 SMB 帳密

```bash
kubectl create secret generic smb-credentials \
  --from-literal=username='your-domain-account' \
  --from-literal=password='your-password' \
  -n your-namespace
```

> **注意**：Secret 中的值雖然是 base64 編碼，但 base64 不等於加密。建議搭配 RBAC 限制只有需要的 ServiceAccount 才能讀取 Secret，或使用外部 Secret 管理方案（如 Vault、External Secrets Operator）。

### Step 3：建立 PV 指到 SMB 共享路徑

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-app-smb-pv
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  storageClassName: my-app-smb-sc
  csi:
    driver: smb.csi.k8s.io
    volumeHandle: smb-share-01
    volumeAttributes:
      source: "//your-windows-server/your-share-folder"
    nodeStageSecretRef:
      name: smb-credentials
      namespace: your-namespace
```

### Step 4：建立 PVC

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-app-smb-pvc
  namespace: your-namespace
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 5Gi
  storageClassName: my-app-smb-sc
```

### Step 5：在 Deployment 掛載 PVC

```yaml
apiVersion: apps/v1
kind: Deployment
# ... 其他設定 ...
        volumeMounts:
        - name: smb-share
          mountPath: /app/shared-folder/
      volumes:
      - name: smb-share
        persistentVolumeClaim:
          claimName: my-app-smb-pvc
```

---

## 注意事項 / 踩坑記錄

- **UNC 路徑格式**：資料庫欄位中的 `file:\\server\path` 不是標準 UNC 格式，Linux 容器/K8s 不接受。應改為 `//your-windows-server/your-share`（正斜線開頭）

- **initContainer mount 的陷阱**：initContainer mount 完後，主容器不一定能看到（取決於 mountPropagation 與 runtime 行為），很多人以為一定共享，實際上不是

- **K8s 的 in-tree CIFS 支援**：K8s 早期有 in-tree 的 CIFS/SMB 做法，但現在主流推薦是用 CSI（smb.csi.k8s.io）

- **應用程式修改**：改用 CSI 掛載後，應用程式只需讀取容器內的掛載路徑（如 `/app/shared-folder`），不需要再做 UNC + impersonation
