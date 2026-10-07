import { readFileSync } from 'node:fs'
import { siteConfig } from '../src/config/site.js'
import { siteAssets } from '../src/config/assets.js'
import { validateLaunch } from '../src/utils/validation.js'
const records = JSON.parse(readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'))
const errors = validateLaunch(siteConfig, records, siteAssets)
if (errors.length) { console.error('Production launch blocked:\n- ' + [...new Set(errors)].join('\n- ')); process.exitCode = 1 } else console.log('Launch content validation passed')
