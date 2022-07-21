import { createContext } from 'react'
import type { IOC } from "./index";


export interface ReactIOCContextValue{
    container: IOC
}

export const ReactIOCContext =
    /*#__PURE__*/ createContext<ReactIOCContextValue>(null as any)


if (process.env.NODE_ENV !== 'production') {
    ReactIOCContext.displayName = 'ReactIOCContext'
}

export default ReactIOCContext