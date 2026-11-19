# 部署说明

## GitHub Pages（已上线）

- **线上地址**：https://xilitiay.github.io/deepdeeg.com/
- **仓库**：https://github.com/xilitiay/deepdeeg.com
- **部署方式**：构建产物推送到 `gh-pages` 分支，Pages 从该分支根目录发布
- **源码分支**：`source`（仓库默认分支 `main` 因 API 权限限制仅含初始化占位内容）

构建命令：`npm run build:pages`（base 为 `/deepdeeg.com/`，并生成 404.html 作为深链回退）。

由于当前 GitHub token 只有 `repo` scope、没有 `workflow` scope，`.github/workflows/` 下的 Actions 配置无法通过 API 写入，因此 **实际使用 `gh-pages` 分支直推方式**。`source` 分支包含全部 42 个源码文件（不含 workflow 文件）。

需要自动 Actions 部署时：在 GitHub 网页端手动把 `.github/workflows/*.yml` 两个文件提交到 `source` 分支，或在 Settings → Developer settings 中给 token 增加 `workflow` scope 后重新推送。

## Hostinger（`deepdeeg.com` 主域名）

已准备 `.github/workflows/deploy-hostinger.yml`：push 到 main 后构建 base `/` 的版本并通过 FTP 上传到 `dist/`。

### 需要配置的 Secrets

进入仓库 **Settings → Secrets and variables → Actions → New repository secret**，添加：

| Secret | 示例值 | 说明 |
| --- | --- | --- |
| `HOSTINGER_FTP_SERVER` | `ftp.deepdeeg.com` | hPanel → FTP Accounts 中查看 |
| `HOSTINGER_FTP_USERNAME` | `u123456789` | FTP 用户名 |
| `HOSTINGER_FTP_PASSWORD` | — | FTP 密码 |
| `HOSTINGER_FTP_PORT` | `21` | 可选，默认 21 |
| `HOSTINGER_FTP_PROTOCOL` | `ftp` | 可选，`ftp` 或 `ftps` |
| `HOSTINGER_FTP_DIR` | `/domains/deepdeeg.com/public_html/` | 可选，默认 `./`，建议填域名根目录 |

### 域名绑定

在 hPanel 中把 `deepdeeg.com` 的文档根目录指向 `public_html`，并确保存在 `.htaccess`（已在 `public/` 中，会被复制到 `dist/`，负责 SPA 路由重写）。

配置好 Secrets 后，向 `main` 分支 push 即会自动部署。也可以手动触发：Actions → Deploy to Hostinger via FTP → Run workflow。

### 手动部署备选

若不想使用 Actions，可执行 `npm run build:hostinger`，然后用 FileZilla 等 FTP 客户端把 `dist/` 内全部文件上传到 `public_html/`。

## 本地命令

- `npm run dev` — 开发服务器
- `npm run build:pages` — GitHub Pages 构建
- `npm run build:hostinger` — Hostinger 构建
- `npm run typecheck` — TypeScript 检查
