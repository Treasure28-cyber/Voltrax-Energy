import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { preview } from 'vite'
import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'
const output = new URL('../tmp/qa/lighthouse/', import.meta.url)
await mkdir(output, { recursive: true })
const server = await preview({ preview: { host: '127.0.0.1', port: 4174, strictPort: true } })
let chrome
const previewOutput = (await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')).includes('noindex')
const summary = []
const requestedRoute = process.argv.find((value) => value.startsWith('--route='))?.slice(8)
const routes = requestedRoute ? [requestedRoute] : ['/', '/products']
if (routes.some((route) => !['/', '/products'].includes(route))) throw new Error('Only Home and Products routes are supported')
try {
  chrome = await launch({ chromeFlags: ['--headless=new', '--disable-gpu'] })
  for (const device of ['mobile', 'desktop']) for (const route of routes) {
    const settings = device === 'desktop' ? { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 } } : {}
    const result = await lighthouse('http://127.0.0.1:4174' + route, { port: chrome.port, output: ['html','json'], logLevel: 'error', onlyCategories: ['performance','accessibility','best-practices','seo'], ...settings })
    const name = device + '-' + (route === '/' ? 'home' : 'products')
    await writeFile(new URL(name + '.html', output), result.report[0])
    await writeFile(new URL(name + '.json', output), result.report[1])
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]))
    const failedAudits = Object.values(result.lhr.audits).filter((audit) => audit.score !== null && audit.score < 1).map((audit) => ({ id: audit.id, title: audit.title, score: audit.score, displayValue: audit.displayValue }))
    summary.push({ device, route, scores, failedAudits }); console.log(name, scores)
  }
  await writeFile(new URL(requestedRoute ? 'products-summary.json' : 'summary.json', output), JSON.stringify(summary, null, 2))
} finally { await chrome?.kill(); await new Promise((resolve) => server.httpServer.close(resolve)) }
const defects = summary.some((run) => run.scores.performance < 90 || run.scores.accessibility < 95 || run.scores['best-practices'] < 95 || (!previewOutput && run.scores.seo < 95))
if (defects) process.exitCode = 1
// Preview SEO deliberately loses indexing points. Re-run against release output after client approval.
