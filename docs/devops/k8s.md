---
title: K8S 學習筆記
description: Kubernetes 核心概念 Q&A：Pod、Service、Deployment、HPA、ConfigMap、Namespace 實戰解析。
tags: [DevOps, Kubernetes, K8S, 容器]
date: 2025-02-01
type: doc
publish: true
---

## 基礎知識點

- 容器管理平台主要處理部署的解決方案（可用 docker 或其他工具製作）
- **Object** 是 K8s 的管理資源單位（Pod, Service, Deployment）
- **Pod** 最小執行單位，container 必須包在其內
- **YAML 檔案**用來描述 Object，可以一次定義多個 Object
- **HPA**：根據 CPU/Memory 使用率調整 Pod 數量
- **Service (NodePort)**：讓外部流量可以透過指定 port 來存取 cluster 內的 Pod
- **Deployment**：管理 Pod 的部署、升級、回滾（管理 Pod 的生命週期）
- **Pod Label/Selector**：Service 與 Deployment 可以透過 label 來選擇目標 Pod
- **imagePullSecrets**：私有 registry 拉取 image 的密鑰
- **livenessProbe**：健康檢查，確認 container 運作正常
- **resources**：資源預約/限制，確保 Pod 不會超用資源
- **Namespace**：用來隔離資源
- **selector**：依據 Pod 的 label 選擇要導流的 Pod
- **ConfigMap**：存放設定檔資料
- **volume**：用來給容器「掛載外部資料」的機制，資料可以來自持久化儲存（PVC）、ConfigMap、Secret 等

---

## 每個 Object 都有的欄位

| 欄位 | 說明 |
|---|---|
| `apiVersion` | 用哪個 API 版本解析（v1、apps/v1、autoscaling/v2beta2 等）|
| `kind` | 資源類型（Pod、Service、Deployment...）|
| `metadata` | 名稱、標籤等資訊 |
| `spec` | 具體設定（如要跑幾個副本、用什麼 image）|

**apiVersion 常見群組：**
- `v1`：最基礎的群組，包含 Pod、Service、ConfigMap 等
- `apps/v1`：管理 Deployment、StatefulSet、DaemonSet 等
- `autoscaling/v2beta2`：管理 HPA（自動擴縮），官方提供的 API 群組

---

## 什麼是 Service？

Service 是 Kubernetes 用來「讓外部或其他 Pod 能夠存取 Pod」的資源物件，負責網路連線、負載均衡、服務發現。

**為什麼需要 Service？**  
Pod 會隨時被建立、刪除、重啟，IP 也會變動。如果直接用 Pod 的 IP 來存取服務，會很不穩定。Service 提供一個固定的存取入口（IP 或 DNS 名稱），自動幫你導流到正確的 Pod。

**功能：**
- 負載均衡：Service 會自動把流量分配到後端的多個 Pod（同一組 label）
- 服務發現：其他 Pod 可以用 Service 名稱（DNS）來存取服務，不用管 Pod 的 IP
- 穩定入口：即使後端 Pod 換了，Service 的 IP/名稱不會變

**Service 類型：**

| 類型 | 說明 |
|---|---|
| `ClusterIP` | 預設類型，只能在叢集內部存取（內部服務）|
| `LoadBalancer` | 讓雲端平台自動建立外部負載均衡器（雲端常用）|
| `ExternalName` | 讓 Service 指向外部 DNS 名稱（如外部資料庫）|
| `NodePort` | 讓外部可以透過每個 Node 的某個 port 存取服務（簡單對外）|

**Service YAML 範例：**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-svc
  namespace: my-namespace
spec:
  selector:
    app: my-app  # 對應的 Pod label
  type: LoadBalancer
  loadBalancerIP: 10.0.0.x  # 指定靜態 IP（可選）
  ports:
  - port: 80       # Service 的 port
    protocol: TCP
    targetPort: 80  # 對應的 Pod port
```

---

## Q&A

**Q1. apiVersion 是什麼？只是版控工具嗎？**

不是單純的版控工具，而是告訴 Kubernetes 這個資源要用哪個 **API 群組**與**版本**來解析。不同的資源類型（kind）會有不同的 API 群組與版本。例如：
- `apiVersion: apps/v1`：代表這個資源（如 Deployment）屬於 apps 群組的 v1 版本
- `apiVersion: autoscaling/v2beta2`：代表這個資源（如 HPA）屬於 autoscaling 群組的 v2beta2 版本，支援更多 metric 設定

**Q1-1. apiVersion 的 API 群組是自己建置的，還是官方/社群提供的？**

大部分都是 Kubernetes 官方或社群提供的，不是你自己建置的 app。Kubernetes 內建很多資源類型（object），每種資源都屬於某個 API 群組（group）和版本（version）：
- `v1`：最基礎的群組，Pod、Service、ConfigMap
- `apps/v1`：Deployment、StatefulSet、DaemonSet
- `autoscaling/v2beta2`：HPA（自動擴縮）

**Q2. apiVersion, kind, metadata, spec 是每個 container 就是一個嗎？**

這四個欄位是**每一個 Kubernetes 資源（object）**的基本欄位，不是每個 container。一份 YAML 檔案可以定義多個資源（object），每個資源都會有自己的這四個欄位。Pod 是一種資源（kind: Pod），但通常我們用 Deployment 來管理 Pod 的生命週期。

**Q3. namespace 是指同一個 Pod 的意思嗎？**

不是。Namespace 是 Kubernetes 用來**隔離資源的邏輯分區**，同一個 namespace 下的資源可以互相溝通、管理；不同 namespace 的資源預設是隔離的。一個 namespace 可以有很多 Pod、Service、Deployment 等不同類型的資源。
