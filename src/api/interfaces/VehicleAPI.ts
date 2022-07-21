import { Make, Manufacturer, Model, ExtendedManufacturer } from "../../types";
import { APISchema } from "./APISchema";

export interface VehicleAPI  {
    loadManufacturers(page: number): Promise<APISchema<Manufacturer>>;

    loadManufacturerById(id: number): Promise<APISchema<ExtendedManufacturer>>;

    loadMakeForManufacturer(id: number): Promise<APISchema<Make>>;

    loadModelsForMakeId(id: number): Promise<APISchema<Model>>;

    _config: VehicleAPIConfig
}

export type VehicleAPIConfig = {
    base: string;
    retries:number;
    retryDelay:number;
}