import { useMemo, useState } from "react";
import { LoadingState } from "../types";

/**
 * Hook for handling loading states with fetch
 */
export function useLoadingState() {
    const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.LOADING)
    const loadingError = useMemo(() => loadingState === LoadingState.ERROR, [loadingState])
    const loadingInProgress = useMemo(() => loadingState === LoadingState.LOADING, [loadingState])
    const setLoadingSuccess = () => setLoadingState(LoadingState.LOADED);
    const setLoadingError = () => setLoadingState(LoadingState.ERROR);
    return {
        setLoadingSuccess, setLoadingError, loadingError, loadingInProgress
    }
}