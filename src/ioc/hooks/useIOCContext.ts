import { useContext } from "react";
import ReactIOCContext from "../ReactIOCContext";
import { IOC } from "../index";

export function useIOCContext(): IOC | null {
    const contextValue = useContext(ReactIOCContext)
    if (process.env.NODE_ENV !== 'production' && !contextValue) {
        throw new Error(
            'could not find react-IOC context value; please ensure the component is wrapped in a <Provider>'
        )
    }
    return contextValue.container;
}