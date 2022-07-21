import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import type { ExtendedManufacturer, Make } from "../types";
import { useService } from "../ioc/hooks/useService";
import { VehicleAPI } from "../api/interfaces/VehicleAPI";
import ManufacturerInfo from "../components/ManufacturerInfo";
import type { ManufacturerMakes } from "../components/ManufacturerMakesList";
import { ManufacturerMakesList } from "../components/ManufacturerMakesList";
import { LoadingError } from "../components/LoadingError";
import { Spinner } from "../components/Spinner";
import { useLoadingState } from "../hooks/useLoadingState";
import type { FC } from 'react'

/**
 * Component that loads data for manufacturer page and presents it
 */
const ManufacturerPage: FC = () => {
    const { id: idParam } = useParams()
    const [manufacturer, setManufacturer] = useState<ExtendedManufacturer | null>(null)
    const [makes, setMakes] = useState<ManufacturerMakes[]>([]);
    const { setLoadingSuccess, setLoadingError, loadingError, loadingInProgress } = useLoadingState()
    const {
        setLoadingSuccess: setMfrLoadingSuccess,
        setLoadingError: setMfrLoadingError,
        loadingError: mfrLoadingError,
        loadingInProgress: mfrLoadingInProgress
    } = useLoadingState()
    const api = useService<VehicleAPI>('api');
    useEffect(() => {
        if (!idParam || !api) return;
        const numberId = Number.parseInt(idParam)
        if (!Number.isSafeInteger(numberId)) return;
        api.loadManufacturerById(numberId)
            .then((res) => {
                const man = res.Results[0];
                setManufacturer(man);
                document.title = `${man.Name} | The NHTSA Product Information Catalog Vehicle Listing Explorer`
                setMfrLoadingSuccess()
            }).catch((e) => {
            console.error(e)
            setMfrLoadingError()
        })
        document.title = 'The NHTSA Product Information Catalog Vehicle Listing Explorer'
        api.loadMakeForManufacturer(numberId)
            .then((res) => res.Results)
            .then((makes: Make[]) => makes.map(({ Make_ID }) => api.loadModelsForMakeId(Number.parseInt(Make_ID))))
            .then((r) => Promise.allSettled(r))
            .then((res) => res.reduce<ManufacturerMakes[]>((acc, i) =>
                i.status === 'fulfilled' ? [...acc, {
                    id: i.value.Results[0].Make_ID,
                    name: i.value.Results[0].Make_Name,
                    models: i.value.Results
                }] : acc, [])
            ).then((makes) => {
            debugger
            if (makes.length) {
                setMakes(makes)
                setLoadingSuccess()
            } else {
                setLoadingError()
            }

        })

    }, [idParam, api, setLoadingError, setLoadingSuccess, setMfrLoadingError, setMfrLoadingSuccess])

    return !idParam ? null : <>
        <Link to="/">← Back</Link>
        {
            mfrLoadingInProgress ? <Spinner/> : (mfrLoadingError || !manufacturer ?
                <LoadingError apiName='manufacturer info'/> :
                <ManufacturerInfo id={idParam} country={manufacturer.Country} name={manufacturer.Name}/>)
        }
        {
            loadingInProgress ? <Spinner/> : (loadingError ? <LoadingError apiName='makes'/> :
                <ManufacturerMakesList makes={makes}/>)
        }
    </>
}
export { ManufacturerPage }