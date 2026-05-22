import { cpSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const root = process.cwd()
const dist = join(root, 'dist')

cpSync(join(dist, 'index.html'), join(root, 'index.html'))
cpSync(join(dist, 'index.html'), join(root, '404.html'))
cpSync(join(dist, 'assets'), join(root, 'assets'), { recursive: true })

const docsDir = join(root, 'docs')
cpSync(join(dist, 'index.html'), join(docsDir, 'index.html'))
cpSync(join(dist, 'index.html'), join(docsDir, '404.html'))
cpSync(join(dist, 'assets'), join(docsDir, 'assets'), { recursive: true })

console.log('Synced dist -> root + docs for GitHub Pages')
