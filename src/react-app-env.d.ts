/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        REACT_APP_API_BASE: string
        REACT_APP_API_RETRIES: number
        REACT_APP_API_RETRIES_DELAY: number
        REACT_APP_API_NAME: string
    }
}