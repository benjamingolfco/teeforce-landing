import { build } from 'vite'
import { readFileSync, writeFileSync, rmSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

async function prerender() {
  // Build SSR bundle from the server entry
  await build({
    root,
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist/server',
      rollupOptions: { output: { format: 'esm' } },
    },
    logLevel: 'warn',
  })

  // Render the app to static HTML
  const { render } = await import(join(root, 'dist/server/entry-server.js'))
  const appHtml = render()

  // Inject into the client-built template
  const indexPath = join(root, 'dist/index.html')
  const template = readFileSync(indexPath, 'utf-8')
  writeFileSync(
    indexPath,
    template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
  )

  // Clean up the server bundle
  rmSync(join(root, 'dist/server'), { recursive: true, force: true })

  console.log('Prerendered dist/index.html')
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
