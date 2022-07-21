import { useIOCContext } from "./useIOCContext";
import { services } from "../services";

export function useService<T>(name: services): T | undefined {
    const container = useIOCContext()
    return container?.get<T>(name)
}