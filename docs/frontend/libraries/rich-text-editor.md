---
title: 富文本編輯器選型與 Email 樣式問題解決
description: react-quill-new、TipTap、CKEditor 表格功能比較，以及 Quill 搭配 juice（前端）和 PreMailer.Net（.NET 後端）解決 email inline-style 問題的完整做法。
tags: [前端, 富文本編輯器, React, 電子郵件, C#]
date: 2025-03-01
type: doc
publish: true
---

## 套件比較

|        | react-quill-new                      | TipTap                                                            | CKEditor                                                     |
| ------ | ------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------ |
| 內建表格功能 | X                                    | V                                                                 | V                                                            |
| 表格功能說明 | 無支援，可使用套件<br/>`quill-table-better`   | 免費版的基礎表格功能<br/>整體寬度無法縮放                                          | 免費版的表格只能置中                                                   |
| 比較     | 1. 功能齊全<br/>2. 美觀<br/>3. 容易上手<br/>4. 免費 | 1. 功能齊全<br/>2. 高度自訂<br/>3. 不容易上手<br/>4. 輕量（下載所需即可）<br/>5. 有免費/付費版區分 | 1. 功能齊全<br/>2. 容易上手<br/>3. 有點肥<br/>4. 有免費/付費版區分              |
| npm 套件 | `react-quill-new`, `quill-table-better` | `@tiptap/react`, `@tiptap/starter-kit`                           | `@ckeditor/ckeditor5-react`, `@ckeditor/ckeditor5-build-classic` |

---

## Email 樣式問題解決

**問題描述**：Quill 的樣式是用 CSS class 定義的，當寄出 email 時，因為非 inline-style 導致郵件沒有樣式（大多數 email client 不支援 `<style>` 或 CSS class）。

**解法**：在 email 送出前，取得目前 user 的 email 內容，以及套件的 CSS，用套件工具將 class 轉換成 inline-style 後再寄出。

---

### 前端解決（React + juice）

**套件**：[juice](https://www.npmjs.com/package/juice)

```javascript
import juice from 'juice';

// 取得 Quill 和 quill-table-better 的 CSS
const css = `${quillCss} ${quillTableBetterCss}`;

// 將 class-based CSS 轉成 inline-style
const htmlWithInlineStyle = juice.inlineContent(editorHtml, css);

// 送出帶有 inline-style 的 HTML
events.sendMail(htmlWithInlineStyle);
```

---

### 後端解決（.NET + PreMailer.Net）

**使用套件**：
- `PreMailer.Net`：將 CSS class 轉成 inline-style
- `HtmlAgilityPack`：操作 HTML 節點
- `SixLabors.ImageSharp`：跨平台圖片壓縮

```csharp
// 載入 CSS
var quillCss = System.IO.File.ReadAllText("wwwroot/css/quill.snow.css");
var tableCss = System.IO.File.ReadAllText("wwwroot/css/quill-table-better.css");
var customCss = ".ql-editor img.attachment-preview { max-width: 100px; max-height: 100px; object-fit: cover; }";
var allCss = customCss + "\n" + quillCss + "\n" + tableCss;

// 將 CSS 嵌入 HTML
string styledContent = $"<style>{allCss}</style>" + innerHtml;

// 用 PreMailer 轉成 inline-style
var preMailer = new PreMailer.Net.PreMailer(styledContent, null);
var inlineContent = preMailer.MoveCssInline().Html;

// 組 mail 內容（加入系統連結等）
var content = $"<a href='{config["Mail:SystemLink"]}'>系統連結</a><br><br>";
content += inlineContent;
```

---

## 完整應用情境

### 需求

1. 有表格可以讓 user 編輯，部分表格背景有不同顏色，表格可以合併
2. 需要附圖，附圖時需要縮圖顯示，並將原圖夾帶在 mail attachment 中

### 設計思路

**縮圖功能**：富文本編輯器（react-quill-new）本身只能照原圖呈現，因此設計只有當使用 Quill 的圖片上傳 toolbar 功能時，會以附件夾帶並以縮圖顯示。以 class `attachment-preview` 辨識，設定 CSS 將原圖做成縮圖；後端也只認有 `attachment-preview` class 的圖片才做壓縮 & 郵件附件。

### React 前端元件

```tsx
import React, { useCallback, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import { Button, Stack } from '@mui/material';
import "react-quill-new/dist/quill.snow.css";
import "quill-table-better/dist/quill-table-better.css";
import Table from 'quill-table-better';

Quill.register({ 'modules/table-better': Table }, true);

export default function MailEditor() {
  const quillRef = useRef<any>(null);

  // 自訂圖片上傳 handler：插入後加上 attachment-preview class
  const customImageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', e.target?.result, 'user');

          // 插入後加 attachment-preview class（讓後端識別並縮圖）
          setTimeout(() => {
            quill.root.querySelectorAll('img').forEach((img: HTMLImageElement) => {
              if (img.src === e.target?.result) {
                img.classList.add('attachment-preview');
              }
            });
          }, 0);
        };
        reader.readAsDataURL(file);
      }
    };
  }, [quillRef]);

  const modules = React.useMemo(() => ({
    toolbar: {
      container: [
        [{ size: ["small", "medium", "large", "huge"] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean'],
        ["table-better"],
      ],
      handlers: { image: customImageHandler },
    },
    "table-better": {
      language: "en_US",
      menus: ["column", "row", "merge", "table", "cell", "wrap", "copy", "delete"],
      toolbarTable: true,
    },
    keyboard: { bindings: Table.keyboardBindings },
  }), [customImageHandler]);

  const handleSendMail = useCallback(() => {
    const html = quillRef.current?.getEditor().root.innerHTML;
    const editorHtml = `<div class="ql-editor">${html}</div>`;
    // 送出 HTML，由後端做 inline-style 轉換
    sendMailApi(editorHtml);
  }, [quillRef]);

  return (
    <>
      <ReactQuill ref={quillRef} theme="snow" modules={modules} style={{ height: 550, marginBottom: 20 }} />
      <Stack flexDirection="row" justifyContent="center">
        <Button variant="contained" onClick={handleSendMail}>寄信</Button>
      </Stack>
    </>
  );
}
```

### .NET 後端：圖片縮圖 + inline-style + 寄信

```csharp
using PreMailer.Net;
using System.Net.Mail;
using HtmlAgilityPack;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Png;

public (string processedHtml, List<Attachment> attachments) ProcessHtmlAndExtractImages(string html)
{
    var doc = new HtmlDocument();
    doc.LoadHtml(html);
    var imgs = doc.DocumentNode.SelectNodes("//img");
    var attachments = new List<Attachment>();
    int imgIndex = 1;

    if (imgs != null)
    {
        foreach (var img in imgs)
        {
            var src = img.GetAttributeValue("src", "");
            var classValue = img.GetAttributeValue("class", "");

            // 只處理帶有 attachment-preview class 的圖片
            if (src.StartsWith("data:image") && classValue.Contains("attachment-preview"))
            {
                var base64Data = src.Substring(src.IndexOf(",") + 1);
                var bytes = Convert.FromBase64String(base64Data);
                var contentId = $"image{imgIndex}@mail";

                // 建立附件（原圖）
                var ms = new MemoryStream(bytes);
                var attachment = new Attachment(ms, $"image{imgIndex}.png", MediaTypeNames.Image.Jpeg);
                attachments.Add(attachment);

                // 縮圖並替換 src
                using var image = Image.Load(bytes);
                image.Mutate(x => x.Resize(120, 0)); // 0 代表等比例
                using var tbms = new MemoryStream();
                image.Save(tbms, new PngEncoder());
                var base64Thumbnail = Convert.ToBase64String(tbms.ToArray());
                img.SetAttributeValue("src", $"data:image/png;base64,{base64Thumbnail}");

                imgIndex++;
            }
        }
    }

    return (doc.DocumentNode.InnerHtml, attachments);
}

public string SendMail(string inputContent)
{
    var (innerHtml, attachments) = ProcessHtmlAndExtractImages(inputContent);

    // 載入 CSS 並轉成 inline-style
    var quillCss = System.IO.File.ReadAllText("wwwroot/css/quill.snow.css");
    var tableCss = System.IO.File.ReadAllText("wwwroot/css/quill-table-better.css");
    var customCss = ".ql-editor img.attachment-preview { max-width: 100px; max-height: 100px; object-fit: cover; }";
    var allCss = customCss + "\n" + quillCss + "\n" + tableCss;

    string styledContent = $"<style>{allCss}</style>" + innerHtml;
    var preMailer = new PreMailer.Net.PreMailer(styledContent, null);
    var inlineContent = preMailer.MoveCssInline().Html;

    // 組 mail 內容
    var content = $"<a href='{_config["Mail:SystemLink"]}'>系統連結</a><br><br>";
    content += inlineContent;

    // 寄信
    _emailHelper.Send(content, attachments);
    return "success!";
}
```

### .NET Email Helper（通用版）

```csharp
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

public class EmailHelper
{
    private readonly IConfiguration _config;

    public EmailHelper(IConfiguration configuration)
    {
        _config = configuration;
    }

    public void Send(string content, IEnumerable<Attachment>? attachments = null, List<string>? mailTo = null)
    {
        try
        {
            var mail = new MailMessage();
            var smtp = new SmtpClient(_config["Mail:SMTPServer"]);

            mail.From = new MailAddress(_config["Mail:Sender"]);

            var isProd = _config["Env"] == "PROD";
            if (isProd && mailTo != null)
                mailTo.ForEach(x => mail.To.Add(x));
            else
                _config["Mail:TestEnvMailTo"].Split(',').ToList().ForEach(x => mail.To.Add(x));

            attachments?.ToList().ForEach(att => mail.Attachments.Add(att));

            mail.IsBodyHtml = true;
            mail.Subject = _config["Mail:Subject"];
            mail.Body = $"<html><body>{content}</body></html>";
            smtp.Port = Convert.ToInt16(_config["Mail:SMTPPort"]);
            smtp.Send(mail);
        }
        catch (Exception ex)
        {
            // log error
            throw;
        }
    }
}
```
