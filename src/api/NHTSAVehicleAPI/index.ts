import { ExtendedManufacturer, Make, Manufacturer, Model } from "../../types";
import { APISchema } from "../interfaces/APISchema";
import { VehicleAPI, VehicleAPIConfig } from "../interfaces/VehicleAPI";
import { Service } from "../../ioc/Service";
import { DEFAULT_PARAMS } from "./constants";

export default class NHTSAVehicleAPI implements Service, VehicleAPI {
    public name = 'NHTSAVehicleAPI'
    _config: VehicleAPIConfig = { base: '', retries: 5, retryDelay: 1000 };
    private paramsFactory = () => new URLSearchParams(DEFAULT_PARAMS);

    set config(value: VehicleAPIConfig) {
        this._config = value as VehicleAPIConfig
    }


    private fetchRetry(url: RequestInfo | URL, attempt = 1): Promise<Response> {
        return window.fetch(url).catch(err => {
            if (attempt >= this._config.retries) {
                throw err;
            }
            console.debug(`[API] Response error for url ${url} handled, scheduled new attempt #${attempt + 1}`)
            return new Promise(resolve => setTimeout(() => resolve(this.fetchRetry(url, ++attempt)), this._config.retryDelay))
        });
    }

    private fetch<T>(url: RequestInfo | URL): Promise<T> {
        console.debug(`[API] Started API call for url`, url)
        return this.fetchRetry(this._config.base + url)
            .then((res) => {
                console.debug(`[API] Finished API call for ${url} with response`, res)
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json() as Promise<T>
            })
            .catch((err) => {
                console.error('[API] Fetch error', err)
                throw err
            })
    }

    private urlParams(value?: { [name: string]: string }): string {
        if (!value) {
            return DEFAULT_PARAMS
        } else {
            const params = this.paramsFactory();
            for (let entry of Object.entries(value)) {
                params.append(...entry)
            }
            return '?' + params.toString()
        }
    }

    loadManufacturers(page = 1): Promise<APISchema<Manufacturer>> {
        return this.fetch<APISchema<Manufacturer>>('getallmanufacturers' + this.urlParams({ page: String(page) }))
    }

    loadMakeForManufacturer(id: number): Promise<APISchema<Make>> {
        return this.fetch<APISchema<Make>>(`GetMakeForManufacturer/${id}` + this.urlParams());
    }

    loadManufacturerById(id: number): Promise<APISchema<ExtendedManufacturer>> {
        return this.fetch<APISchema<ExtendedManufacturer>>(`GetWMIsForManufacturer/${id}` + this.urlParams());
    }

    loadModelsForMakeId(id: number): Promise<APISchema<Model>> {
        return this.fetch<APISchema<Model>>(`GetModelsForMakeId/${id}` + this.urlParams());
    }


}

