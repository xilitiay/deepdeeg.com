# Deployment

Two targets are configured, both triggered automatically on push to `main`.

## GitHub Pages
- Build: `npm run build:pages` (base `/deepdeeg.com/` + 404.html SPA fallback)
- Workflow: `.github/workflows/deploy-pages.yml`
- Live URL: https://xilitiay.github.io/deepdeeg.com/
- Enable Pages at: repo Settings → Pages → Source: **GitHub Actions**

## Hostinger (deepdeeg.com)
- Build: `npm run build:hostinger` (base `/` + `.htaccess` SPA rewrite)
- Workflow: `.github/workflows/deploy-hostinger.yml`
- Requires these repo Secrets (Settings → Secrets and variables → Actions):

| Secret | Example | Notes |
| --- | --- | --- |
| `HOSTINGER_FTP_SERVER` | `ftp.deepdeeg.com` | FTP host from hPanel |
| `HOSTINGER_FTP_USERNAME` | `u123456789` | FTP username |
| `HOSTINGER_FTP_PASSWORD` | — | FTP password |
| `HOSTINGER_FTP_PORT` | `21` | Optional, defaults to 21 |
| `HOSTINGER_FTP_PROTOCOL` | `ftp` | Optional, `ftp` or `ftps` |
| `HOSTINGER_FTP_DIR` | `/domains/deepdeeg.com/public_html/` | Optional, defaults to `./` |

In hPanel, point the domain's document root to `public_html` and upload the built `dist/` contents there (the workflow does this automatically once secrets are set).

## Local preview
- `npm run dev` — development server
- `npm run build:pages && npx vite preview` — preview the Pages build
