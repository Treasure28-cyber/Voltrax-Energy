import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  reporter: [['list'], ['html', { outputFolder: 'tmp/qa/playwright-report', open: 'never' }]],
  outputDir: 'tmp/qa/test-results',
  use: { baseURL: 'http://127.0.0.1:4173', headless: true, trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', testMatch: 'site.spec.js', use: { browserName: 'chromium', channel: 'chrome' } },
    { name: 'edge', testMatch: 'compatibility.spec.js', use: { browserName: 'chromium', channel: 'msedge' } },
    { name: 'firefox', testMatch: 'compatibility.spec.js', use: { browserName: 'firefox' } },
    { name: 'webkit', testMatch: 'compatibility.spec.js', use: { browserName: 'webkit' } },
  ],
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: false, timeout: 30000 },
})
