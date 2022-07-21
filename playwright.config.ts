import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
    testDir: './e2e',
    webServer: {
        command: 'npm run-script serve',
        port: 3000,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use:{
        baseURL: 'http://localhost:3000',
        browserName: 'chromium',
        headless: false,
    }
}
export default config