import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * GitHub Pages has no native SPA fallback. For a deep link such as
 * /deepdeeg.com/news/some-slug, Pages serves 404.html. We preserve the
 * requested URL in sessionStorage, bounce to the app root, and let the
 * restore snippet in index.html put the URL back before React mounts.
 * Hostinger uses .htaccess rewrites instead and simply ignores 404.html.
 */
const base = (process.env.VITE_BASE || '/').replace(/\/$/, '') || '/'
const indexPath = resolve('dist', 'index.html')
const original = readFileSync(indexPath, 'utf8')

const restore = `<script>(function(){try{var r=sessionStorage.getItem('deepdeeg:redirect');if(r){sessionStorage.removeItem('deepdeeg:redirect');var d=JSON.parse(r);history.replaceState(null,'',d.path+d.search+d.hash)}}catch(e){}})();</script>`
if (!original.includes('deepdeeg:redirect')) {
  writeFileSync(indexPath, original.replace('<head>', `<head>${restore}`))
}

const bounce = `<script>(function(){try{sessionStorage.setItem('deepdeeg:redirect',JSON.stringify({path:location.pathname,search:location.search,hash:location.hash}))}catch(e){}location.replace(${JSON.stringify(base + '/')})})();</script>`
writeFileSync(resolve('dist', '404.html'), original.replace('<head>', `<head>${bounce}`))

console.log(`SPA fallback written for base ${base}/`)
