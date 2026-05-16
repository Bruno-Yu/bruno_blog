---
title: 訊息傳遞與事件系統選型筆記
description: 從 MQTT、RabbitMQ 到 Kafka——釐清協定、Message Broker、事件串流平台的層級差異，以及如何選對工具。
tags: [後端, 架構, RabbitMQ, Kafka, 訊息佇列]
date: 2024-09-01
type: doc
publish: true
---

> 目標：下次看到 RabbitMQ / Kafka / MQTT / PubSub / Queue 不再混亂  
> 關鍵：先分清「層級」——**協定** vs **產品/平台** vs **架構模式**

---

## 0) 先用一句話分層級

### A. 通訊協定（Protocol）
- 意思：**大家約好怎麼講話、封包怎麼長、怎麼連線、怎麼確認收到**
- 例：**MQTT、AMQP、HTTP、gRPC**（gRPC 是在 HTTP/2 上的一套規則）

### B. 訊息中介 / 訊息代理（Broker / Message Middleware）
- 意思：**像郵局/轉運站**：大家都連到它，它負責收、存、轉送、路由
- 例：**RabbitMQ、ActiveMQ、Mosquitto/EMQX/HiveMQ（MQTT broker）**
- 你常聽到的「Message Broker / Message Queue」多半在講這層

### C. 事件串流平台 / 分散式日誌（Event Streaming / Distributed Log）
- 意思：**像公告欄/記錄簿**：事件會保留一段時間，想重看可以重讀（replay）
- 例：**Kafka、Redpanda、Pulsar（常被歸在這一類）**

### D. 架構模式（Pattern）
- 意思：**怎麼用它**
- 常見模式：
  - **Queue / Work Queue（派工）**
  - **Pub/Sub（發布訂閱）**
  - **Request/Reply（用訊息做類 RPC）**
  - **Event Sourcing / Event Streaming（事件作為可回放的紀錄）**

---

## 1) 快速理解三大類

### RabbitMQ：郵局 + 派工中心（Message Broker 產品；常用 AMQP）
- 比喻：你把「任務紙條」丟到郵局的箱子（Queue），很多工人來拿，誰有空誰處理
- 最像：**把工作可靠地分配出去**

### MQTT：省電對講機的講話規則（Protocol）
- 比喻：小裝置一直連著廣播站，用很省力的方式在「頻道(topic)」發/收消息
- 最像：**物聯網裝置溝通的省電語言**
- 注意：真正讓 pub/sub 跑起來的是 **MQTT + Broker（如 EMQX/Mosquitto）**

### Kafka：公告欄/記錄簿（Event Streaming 平台）
- 比喻：事件貼在公告欄上保留很久，每個人自己決定從哪張開始讀、讀到哪做記號
- 最像：**大量事件的紀錄與回放管線**

---

## 2) 常見技術放到正確層級

### 協定（Protocol）
- **MQTT**：輕量 pub/sub 協定，適合 IoT、弱網、長連線 (複雜訊息不適合)
- **AMQP**：偏企業訊息傳遞的協定，常見於 RabbitMQ (複雜邏輯合適)
- **HTTP / WebSocket**：同步/雙向通訊常用（不一定有 broker）
- **gRPC**：高效 RPC（基於 HTTP/2）

### 產品/平台（Broker / Streaming / Managed）
- **RabbitMQ**：Message Broker（queue / routing / ack / retry / DLQ 很強）
- **MQTT Broker**：Mosquitto、EMQX、HiveMQ（讓 MQTT 的 pub/sub 能落地運作）
- **Kafka / Redpanda / Pulsar**：事件串流平台（保留、重放、超高吞吐）
- **雲託管（Managed）**
  - AWS: SQS(Queue) / SNS(PubSub)
  - GCP: Pub/Sub
  - Azure: Service Bus / Event Hubs

---

## 3) 使用情境對照（最常用的選型捷徑）

### 當你在做「派工/任務」：用 Queue / Work Queue
- 例：影像處理、模型推理任務、批次轉檔、爬蟲、寄信、背景作業
- 優先考慮：**RabbitMQ（或雲 SQS / Service Bus）**
- 為什麼：有 ack、重試、死信（DLQ）、延遲/排程等常見能力（視產品）
- 要注意：
  - **可能重複投遞** → 消費端要能冪等（同一任務來兩次也不出錯）
  - 想要順序處理 → 需要設計（例如同一 key 單一 consumer 或序列化策略）

### 當你在做「裝置互連/弱網大量連線」：用 MQTT + Broker
- 例：家電狀態上報、感測器 telemetry、遠端指令下發
- 優先考慮：**MQTT（協定） + MQTT Broker（產品）**
- 為什麼：協定輕量、省電、省流量；長連線友善
- 要注意：後端複雜工作流/企業路由能力可能要搭配其他系統（例如 MQTT → RabbitMQ/Kafka/DB）

### 當你在做「大量事件紀錄/串流/回放」：用 Kafka 類
- 例：用戶行為事件、交易事件流、監控與日誌管線、即時分析、資料平台
- 優先考慮：**Kafka / Redpanda / Pulsar**
- 為什麼：高吞吐、可保留一段時間、可重放（replay）、多下游各自消費
- 要注意：更像資料平台——需要懂 partition、offset、保留策略、消費語義等

### 當你需要「立刻回答案」：用 RPC（HTTP/gRPC）
- 例：前端呼叫 API、同步查詢
- 優先考慮：HTTP/gRPC（必要時加上快取、熔斷、超時、重試）
- 常見做法：**同步入口 + 非同步 MQ**：入口收請求→丟任務到 queue→稍後再取結果/通知

---

## 4) 優缺點快速表

| 類型 | 代表 | 優點 | 缺點 | 最適合 |
|---|---|---|---|---|
| Message Broker / Queue | RabbitMQ | 路由/ack/重試/DLQ 強；派工直覺 | broker 關鍵依賴；要處理重複/冪等 | 任務派工、工作流、削峰 |
| MQTT（協定）+ Broker | MQTT + EMQX/Mosquitto | 輕量省電；弱網友善；IoT 連線多 | 後端複雜處理常需搭配別的系統 | IoT 裝置互連、狀態上報 |
| Event Streaming / Log | Kafka/Redpanda | 吞吐高；可保留/重放；多下游消費 | 概念/運維較重；派工不如 queue 直覺 | 事件資料平台、串流分析 |

---

## 5) 選型自問清單（最實用）

1. **這是「任務」還是「事件」？**
   - 任務：要「做完」→ Queue（RabbitMQ/SQS）
   - 事件：要「記錄、可回放」→ Kafka 類

2. **消費者不在/很慢時怎麼辦？**
   - 需要排隊、慢慢處理 → Broker/Queue
   - 需要保留很久，之後補讀 → Kafka 類

3. **能不能接受重複？**
   - 多數 MQ/串流都是「可能重複」→ 你的處理要冪等

4. **需要多低延遲？**
   - 極低延遲同步互動 → RPC（HTTP/gRPC）
   - 允許排隊非同步 → MQ/串流

5. **訊息量級？**
   - 中等、重投遞控制重要 → RabbitMQ
   - 非常大、要重放/分析 → Kafka 類

---

## 6) 套到常見多服務協作場景（模板）

>「RabbitMQ 作為服務間溝通核心：多個 Worker/Service 都連到 RabbitMQ，發送/接收消息」

- 這種做法屬於：**Message Broker 架構**
- 最常見用途：**派工（Work Queue）**、**事件通知（Pub/Sub）** 或混合
- 優點：解耦、削峰、可靠投遞、易擴展 worker
- 風險/注意：重複訊息（冪等）、失敗重試策略、DLQ、broker HA、監控告警

---

## 7) 一句話記憶法

- **MQTT = 省電好用的「裝置聊天規則」（協定）**
- **RabbitMQ = 很會派工、很會控投遞的「郵局」（broker 產品）**
- **Kafka = 超大本可回放的「事件記錄簿/公告欄」（串流平台）**

---

## RabbitMQ 深入：通訊模型、優缺點與適用場景

### 一、RabbitMQ 的通訊模型（邏輯層）

RabbitMQ（AMQP 常見）涉及這些角色：

- **Producer（發送端）**：把訊息發到 RabbitMQ
- **Exchange（交換器）**：按規則把訊息路由到一個或多個 Queue
- **Queue（佇列）**：承接訊息、暫存、等待被取走
- **Consumer（接收端）**：從 Queue 取訊息處理
- **Ack/Nack（確認/拒收）**：消費成功後回 Ack；失敗可 Nack 讓訊息重送或丟到死信佇列

常見使用方式：

1. **Work Queue（任務派工）**：多個 worker 共同消費同一個 queue（競爭式消費），RabbitMQ 幫你做負載分攤。
2. **Pub/Sub（事件廣播）**：一個事件被路由到多個 queue，每個服務各自訂閱（每個訂閱者通常有自己的 queue）。
3. **Request/Reply**：A 發 request 訊息，B 處理後回覆到 reply queue（可用 correlation id 對應）。

### 二、優點

1. **解耦（Decoupling）**：發送方不需要知道接收方在哪、是否在線，只要 broker 可用即可。
2. **削峰填谷、提升韌性**：突發流量先進 queue，consumer 慢慢處理；下游短暫掛掉時訊息可暫存。
3. **易於水平擴展**：增加 consumer 數量就能加快處理（典型 worker pool 模式）。
4. **可靠投遞與處理控制**：透過 ack、重試、DLQ、持久化訊息、publisher confirm 等機制落地「至少一次」交付。
5. **天然支援非同步**：很適合耗時任務、批處理（模型推理、檔案處理、爬蟲、ETL）。

### 三、缺點與代價

1. **不是即時互動的最佳解**：多了一跳 broker + 排隊，尾延遲可能變大；強即時低延遲場景多半直連 RPC/WebSocket。
2. **系統複雜度上升**：要設計 routing、重試策略、冪等、DLQ、消息格式版本、追蹤（trace id）、監控告警等。
3. **重複訊息問題**：常見交付語義是 at-least-once，consumer 可能收到重複訊息；處理邏輯必須**冪等**。
4. **訊息順序不一定能保證**：單 queue + 單 consumer 才比較像嚴格順序；多 consumer 併行處理需要額外設計。
5. **Broker 成為關鍵依賴**：RabbitMQ 需要高可用部署與良好運維。

### 四、適用場景

1. **派工/任務分散處理**：把工作（推理任務、資料處理、工具呼叫）丟到 queue，多台 worker 去搶任務。
2. **事件驅動架構**：任務完成→發布事件→多個下游服務各自訂閱（寫 DB、通知、產出報表等）。
3. **需要削峰的入口**：API 收到大量請求先入 queue，後端按能力消化，避免尖峰把服務打掛。
4. **跨語言/跨服務協作**：Producer/consumer 可用不同語言與框架，透過消息契約（schema）協作。

### 五、不太適合的場景

1. **強互動、低延遲同步請求**：使用者等著即時回應、需要毫秒級穩定延遲，多半直連 HTTP/gRPC。
2. **需要強一致的同步交易流程**：MQ 更偏向最終一致；若你要「要嘛全成功要嘛全失敗」的同步鏈式呼叫，需要 Saga/補償機制。
