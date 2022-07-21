import { Service } from "../../ioc/Service";
import { VehicleAPI, VehicleAPIConfig } from "../interfaces/VehicleAPI";
import { APISchema } from "../interfaces/APISchema";
import type { ExtendedManufacturer, Make, Manufacturer, Model } from "../../types";
import MAKE_MOCK from "../../__mocks__/Make";
import EXTENDED_MANUFACTURER_MOCK from "../../__mocks__/ExtendedManufacturer";
import MANUFACTURER_MOCK from "../../__mocks__/Manufacturer";
import MODEL_MOCK from "../../__mocks__/Model";

export default class MockAPI implements Service, VehicleAPI {
    _config: VehicleAPIConfig = { base: '', retries: 0, retryDelay: 0 };
    public name = 'MockAPI';

    private static shapeAPISchema<T>(mock: T): APISchema<T> {
        return { Count: 1, Message: "", Results: [mock] }
    }

    loadMakeForManufacturer(id: number): Promise<APISchema<Make>> {
        return Promise.resolve(MockAPI.shapeAPISchema(MAKE_MOCK));
    }

    loadManufacturerById(id: number): Promise<APISchema<ExtendedManufacturer>> {
        return Promise.resolve(MockAPI.shapeAPISchema(EXTENDED_MANUFACTURER_MOCK));
    }

    loadManufacturers(page: number): Promise<APISchema<Manufacturer>> {
        return Promise.resolve(MockAPI.shapeAPISchema(MANUFACTURER_MOCK));
    }

    loadModelsForMakeId(id: number): Promise<APISchema<Model>> {
        return Promise.resolve(MockAPI.shapeAPISchema(MODEL_MOCK));
    }

}