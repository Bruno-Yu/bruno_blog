# Deployment

## Target

- Platform: Cloudflare Pages
- Production domain: `blog.jackhellowin.win`
- Build command: `npm run build`
- Build output directory: `build`

## Release flow

1. Work on a feature branch or pull request.
2. Let Cloudflare Pages create a preview deployment.
3. Bruno reviews the preview deployment.
4. Only after approval, merge or promote the reviewed build to production.

Production should not be treated as approved until the preview has been manually checked.
