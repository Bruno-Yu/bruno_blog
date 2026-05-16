---
title: C# 多執行緒研究
description: C# 多執行緒常見應用場景、注意事項（Thread Safety、Deadlock、Race Condition）以及 lock 同步機制實例。
tags: [C#, .NET, 多執行緒, 後端]
date: 2024-12-01
type: doc
publish: true
---

## 常見場景

- **背景工作處理**：例如檔案上傳/下載、資料庫存取、影像處理等，不希望主執行緒（UI）被卡住
- **伺服器端並行處理**：例如 Web 伺服器同時處理多個用戶請求，每個請求分配一個執行緒
- **計算密集型任務**：例如大量數據運算、科學計算，分割成多個執行緒加速處理
- **定時任務或排程**：例如定時備份、定時發送郵件等
- **UI 程式的非同步操作**：例如 WinForms/WPF 程式中，避免 UI 卡住，將耗時操作丟到背景執行緒

---

## 需要注意事項

### 資料同步（Thread Safety）
多個執行緒同時存取/修改同一份資料，可能造成資料錯亂。

**解法**：使用 `lock`、`Mutex`、`Monitor` 等同步機制。

### 死鎖（Deadlock）
多個執行緒互相等待對方釋放資源，導致程式卡住。

**解法**：設計好鎖定順序，避免循環等待。

### 資源競爭（Race Condition）
執行緒間競爭資源，導致結果不一致。

**解法**：同樣要用同步機制。

### 效能問題
UI 只能在主執行緒更新，不能直接在背景執行緒操作 UI。

---

## 程式碼範例

### 多執行緒下載

```csharp
using System;
using System.Threading;

class Program
{
    static void DownloadFile(string url)
    {
        Console.WriteLine($"開始下載: {url} (執行緒: {Thread.CurrentThread.ManagedThreadId})");
        Thread.Sleep(2000); // 模擬下載
        Console.WriteLine($"下載完成: {url} (執行緒: {Thread.CurrentThread.ManagedThreadId})");
    }

    static void Main()
    {
        string[] urls = { "file1", "file2", "file3" };
        foreach (var url in urls)
        {
            Thread t = new Thread(() => DownloadFile(url));
            t.Start();
        }
        Console.WriteLine("主執行緒繼續執行...");
    }
}
```

### 資料同步（lock）

使用 `lock` 確保多個執行緒不會同時修改 `counter`：

```csharp
int counter = 0;
object lockObj = new object();

void Increase()
{
    for (int i = 0; i < 1000; i++)
    {
        lock (lockObj)
        {
            counter++;
        }
    }
}
```

> 若不加 `lock`，多執行緒同時對 `counter++` 操作時，結果可能小於預期值（因為讀-改-寫不是原子操作）。

---

## 現代做法：Task 與 async/await

在現代 C# 中，更推薦使用 `Task` 和 `async/await` 搭配 `Task.Run` 來處理非同步操作，而非直接建立 `Thread`：

```csharp
// 非同步下載（現代寫法）
async Task DownloadFileAsync(string url)
{
    Console.WriteLine($"開始下載: {url}");
    await Task.Delay(2000); // 模擬非同步 I/O
    Console.WriteLine($"下載完成: {url}");
}

// 並行執行多個 Task
async Task Main()
{
    var tasks = new[] { "file1", "file2", "file3" }
        .Select(url => DownloadFileAsync(url));
    
    await Task.WhenAll(tasks);
}
```

**好處**：`async/await` 對 I/O 密集型任務更高效（不會佔用 Thread Pool），且程式碼可讀性更高。
