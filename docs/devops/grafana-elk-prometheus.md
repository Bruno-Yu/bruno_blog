---
title: Grafana、ELK、Prometheus 以及 PromQL 監控研究
description: 三大監控工具定位比較：Prometheus 指標收集、ELK 日誌管理、Grafana 視覺化，並附 PromQL 查詢語言入門。
tags: [DevOps, 監控, Prometheus, Grafana, ELK]
date: 2024-09-20
type: doc
publish: true
---

**Prometheus、ELK、Grafana** 這些屬於「監控與可視化」工具，主要負責收集、分析、展示數據，並可設定警報。

| 工具         | 主要用途    | 數據類型        | 查詢語言              | 可視化工具          |
| ---------- | ------- | ----------- | ----------------- | -------------- |
| Prometheus | 系統/應用監控 | 時間序列 metric | PromQL            | Grafana        |
| ELK Stack  | 日誌收集與分析 | 日誌（文本）      | Elasticsearch DSL | Kibana/Grafana |
| Grafana    | 數據可視化   | 各種數據來源      | N/A               | N/A            |

## 1. Grafana

**Grafana** 是一個開源的數據可視化和監控平台。它可以連接多種數據來源（如 Prometheus、Elasticsearch、MySQL、PostgreSQL 等），並將數據以圖表、儀表板等形式展示出來。Grafana 常用於基礎設施監控、應用性能監控、業務數據分析等場景。

**主要特點：**

- 支援多種數據來源
- 強大的可視化能力（折線圖、長條圖、熱力圖等）
- 支援自訂儀表板和警報
- 用戶權限管理
- 插件生態豐富

## 2. ELK

**ELK** 是三個開源軟體的組合，分別是 **Elasticsearch**、**Logstash** 和 **Kibana**，常用於日誌收集、搜尋和分析。

- **Elasticsearch**：分散式搜尋和分析引擎，負責儲存和查詢數據。
- **Logstash**：數據收集和處理管道，負責從各種來源收集、轉換並傳送數據到 Elasticsearch。
- **Kibana**：數據可視化工具，與 Elasticsearch 整合，提供圖表、儀表板等視覺化功能。

**應用場景：**

- 日誌管理與分析
- 事件監控
- 安全審計

## 3. Prometheus

**[Prometheus](https://prometheus.io/)** 是一個開源的系統監控和警報工具（是目前雲原生、微服務架構下最主流的監控系統之一），特別適合用於雲原生和微服務架構。它主要用於收集和儲存時間序列數據 (metric)（如 CPU 使用率、記憶體用量等），並提供 **PromQL** 查詢語言來撈取、分析這些數據。

**主要特點：**

- 多維度數據模型（支援標籤/label）
- 適合監控系統、應用、業務指標
- 靈活的查詢語言（PromQL）
- 自動發現服務
- 易於擴展、整合警報系統（Alertmanager）
- 社群活躍，生態豐富

**典型流程：**

- 系統/應用程式暴露 metric（通常是 HTTP endpoint，格式為 Prometheus 支援的文本格式）
- Prometheus 定期去抓（scrape）這些 metric
- 使用 PromQL 查詢、聚合、分析數據
- 可搭配警報系統（如 Alertmanager）設定自動通知

## 4. PromQL（Prometheus Query Language）

**PromQL** 是 Prometheus 的查詢語言，用於查詢和聚合時間序列數據。它的語法和 SQL 有些相似，但專為時間序列數據設計。

**PromQL 的特點：**

- 支援即時查詢和聚合
- 可以根據標籤（label）篩選數據
- 支援多種聚合函數（如 sum、avg、max、min）
- 可以進行數學運算和函數轉換

**範例：**

```promql
# 查詢所有主機的 CPU 使用率平均值
avg(rate(cpu_usage_seconds_total[5m]))

# 查詢特定服務的記憶體用量
sum(memory_usage_bytes{job="my-service"})
```

**與 SQL 的比較：**

- SQL 用於關聯式資料庫，查詢表格型數據。
- PromQL 用於時間序列資料庫，查詢帶有時間戳的數據。
- PromQL 沒有 JOIN、GROUP BY 等 SQL 關鍵字，但有類似的聚合和過濾功能。

---

## 什麼是 Metric？

**Metric** 是一種用來量化系統、應用程式或業務狀態的數據。它通常是數值型的，會隨著時間變化，並且可以被持續收集、儲存和分析。

### 常見的 Metric 類型

1. **系統層級的 metric**
   - CPU 使用率（CPU usage）
   - 記憶體用量（Memory usage）
   - 磁碟空間（Disk space）
   - 網路流量（Network traffic）

2. **應用層級的 metric**
   - 請求數量（Request count）
   - 錯誤率（Error rate）
   - 響應時間（Response time）

3. **業務層級的 metric**
   - 用戶註冊數（User signups）
   - 訂單數量（Order count）
   - 轉換率（Conversion rate）

---

## 為什麼要做 Metric？

- **監控系統健康狀態**：及早發現異常（如 CPU 飆高、錯誤率上升）。
- **性能分析與優化**：找出瓶頸，提升系統效能。
- **容量規劃**：預測資源需求，避免資源不足或浪費。
- **業務決策支持**：根據數據驅動業務優化。

---

## 如何「做」 Metric？

1. **定義要監控的指標**：例如監控 Web 伺服器的每秒請求數、錯誤率、平均響應時間。
2. **在程式碼或系統中收集數據**：
   - 使用監控 agent（如 node_exporter、cAdvisor）
   - 在應用程式中嵌入 metric 收集程式碼（如 Prometheus client library）
3. **將 metric 傳送到監控系統**：Prometheus 會定期拉取（scrape）這些 metric。
4. **儲存與查詢**：監控系統將 metric 儲存為時間序列數據，方便查詢和分析。
5. **可視化與警報**：使用 Grafana 等工具將 metric 以圖表方式展示，設定警報條件自動通知。

---

## 舉例

假設你有一個網站，可以收集以下 metric：

- `http_requests_total`：每秒收到的 HTTP 請求數
- `http_errors_total`：每秒發生的 HTTP 錯誤數
- `response_time_seconds`：每次請求的響應時間

這些 metric 可以幫助你了解網站的流量、穩定性和效能。

---

## 總結

**Metric** 就是「可量化的指標」，用來反映系統、應用或業務的狀態。  
「做 metric」就是**定義、收集、儲存、分析和可視化這些指標**，以便更好地監控和管理你的系統或業務。
