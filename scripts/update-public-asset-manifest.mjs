import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const output = path.join(root, 'PUBLIC_ASSET_MANIFEST.json')
const ignoredDirs = new Set(['.git', 'node_modules'])
const ignoredFiles = new Set(['PUBLIC_ASSET_MANIFEST.json'])

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    const rel = path.relative(root, full).replaceAll('\\', '/')
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) files.push(...walk(full))
      continue
    }
    if (!entry.isFile()) continue
    if (ignoredFiles.has(rel) || ignoredFiles.has(entry.name)) continue
    const bytes = fs.statSync(full).size
    const sha256 = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex')
    files.push({ path: rel, bytes, sha256 })
  }
  return files
}

const files = walk(root).sort((a, b) => a.path.localeCompare(b.path))
fs.writeFileSync(output, JSON.stringify({
  asset_id: 'L3AI_PUBLIC_SITE_ASSET_MANIFEST',
  status: 'prepared',
  generated_at: new Date().toISOString(),
  total_assets: files.length,
  files,
}, null, 2) + '\n')

console.log(JSON.stringify({
  status: 'prepared',
  total_assets: files.length,
  manifest: 'PUBLIC_ASSET_MANIFEST.json',
}, null, 2))
