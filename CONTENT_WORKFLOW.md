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
