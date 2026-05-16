---
title: 資料庫 Migration 版本控管
description: 什麼是 Database Migration？如何用 Entity Framework Core、Flyway、Liquibase 對資料庫結構做版本控管與自動變更。
tags: [後端, 資料庫, EF Core, Flyway, Migration]
date: 2024-12-20
type: doc
publish: true
---

## 什麼是 Database Migration？

Migration 主要是「**資料庫結構的版本控管與自動變更**」，不是備份，也不是單純的資料搬移。

它的核心概念是：讓資料庫結構隨著程式碼自動演進。

---

## 常見情境

- 開發一個新功能，需要在資料庫加一個欄位
- 要把這個變更同步到所有環境（開發、測試、正式）
- 用程式碼自動管理這些變更，而不是手動對資料庫下 SQL

---

## 常見 Migration 工具

### Entity Framework Core（.NET）

EF Core 的 Code-First Migration：先在程式碼定義資料模型，再自動產生對應的 SQL。

```bash
# 建立新 migration
dotnet ef migrations add AddUserEmailColumn

# 套用到資料庫
dotnet ef database update
```

每次 `migrations add` 會產生一個含有 `Up()` 和 `Down()` 方法的 C# 檔案：

```csharp
public partial class AddUserEmailColumn : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "Email",
            table: "Users",
            nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(name: "Email", table: "Users");
    }
}
```

### Flyway（跨語言）

Flyway 使用 SQL 腳本做 migration，命名規則帶版本號：

```
V1__Create_users_table.sql
V2__Add_email_column.sql
V3__Create_orders_table.sql
```

執行 `flyway migrate` 後，它會記錄哪些腳本已執行過（存在 `flyway_schema_history` 表），下次只執行新增的腳本。

### Liquibase（跨語言）

Liquibase 類似 Flyway，支援 XML、YAML、JSON、SQL 格式的 changeset，適合需要跨多種資料庫（MySQL、PostgreSQL、Oracle 等）的團隊。

---

## 為什麼要用 Migration？

不用 Migration，改動資料庫的常見做法是直接連到各環境手動下 SQL——這會造成：
- 環境不一致（「開發環境有這欄，測試環境忘了加」）
- 沒有記錄（不知道什麼時候改了什麼）
- 回滾困難（不知道要怎麼復原）

Migration 讓這些變更**可版本化、可追蹤、可自動化部署**，和程式碼一起進 Git、一起跑 CI/CD。
