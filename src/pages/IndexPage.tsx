import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { Manufacturer } from "../types";
import { useService } from "../ioc/hooks/useService";
import { VehicleAPI } from "../api/interfaces/VehicleAPI";
import { DynamicTable } from "../components/DynamicTable";
import { Spinner } from "../components/Spinner";
import { LoadingError } from "../components/LoadingError";
import { useLoadingState } from "../hooks/useLoadingState";

/**
 * Component that loads and displays data for index page
 * @constructor
 */
const IndexPage: FC = () => {
    const [page, setPage] = useState<number>(1)
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
    const { setLoadingSuccess, setLoadingError, loadingError, loadingInProgress } = useLoadingState()
    const api = useService<VehicleAPI>('api')
    const handleEnd = useCallback(() => {
        setPage(page + 1);
    }, [setPage, page])
    useEffect(() => {
        if (!api) {
            console.warn('[UI][IndexPage] Attempt to call API, but it not found in app')
            return
        }
        api.loadManufacturers(page)
            .then(data => {
                setManufacturers([...manufacturers, ...data.Results])
                setLoadingSuccess()
            }).catch((e) => {
            console.error(e)
            setLoadingError()
        })
    }, [page, api])
    useEffect(() => {
        document.title = 'The NHTSA Product Information Catalog Vehicle Listing Explorer'
    }, [])
    if (loadingError && manufacturers.length === 0) {
        return <LoadingError/>
    }
    if (loadingInProgress) {
        return <Spinner/>
    }
    return <DynamicTable endReached={handleEnd} data={manufacturers}/>
}
export { IndexPage }