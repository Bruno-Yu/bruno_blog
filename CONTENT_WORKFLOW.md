# Content workflow

## Source of truth

Obsidian is the long-term source of truth for technical notes. The public site only receives content that has been manually curated for release.

## Required frontmatter

Every public Markdown document must include:

```yaml
title:
description:
tags: []
date: YYYY-MM-DD
type: doc # or blog
publish: true
```

## Current release rule

- `docs/` contains all public technical notes.
- Drafts, private notes, company material, and mixed-purpose Notion pages are not valid publication inputs.
- Future automation may sync Obsidian notes, but only notes explicitly marked `publish: true`.


## Category to path map

Use the existing path conventions below when adding new public notes:

| Sidebar category | `docs/` path |
| --- | --- |
| Frontend > JavaScript | `frontend/javascript/` |
| Frontend > TypeScript | `frontend/typescript/` |
| Frontend > Vue / Nuxt | `frontend/vue/` |
| Frontend > CSS / Layout | `frontend/css/` |
| Frontend > Libraries | `frontend/libraries/` |
| Frontend > Frameworks | `frontend/frameworks/` |
| Frontend > Web APIs | `frontend/web-apis/` |
| Tooling | `tooling/` |
| Testing & Performance | `testing-performance/` |
| Web Platform | `web-platform/` |
| Backend & API | `backend-api/` |
| DevOps | `devops/` |
| .NET / C# | `dotnet/` |
| Analytics | `analytics/` |

When adding a new top-level category, create the directory, add the sidebar category, and update this table in the same change.
