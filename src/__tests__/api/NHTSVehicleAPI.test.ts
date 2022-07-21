import NHTSAVehicleAPI from "../../api/NHTSAVehicleAPI";
import fetchMock from "jest-fetch-mock"
import MANUFACTURER_MOCK from "../../__mocks__/Manufacturer";
import EXTENDED_MANUFACTURER_MOCK from "../../__mocks__/ExtendedManufacturer";
import MODEL_MOCK from "../../__mocks__/Model";
import MAKE_MOCK from "../../__mocks__/Make";

describe('NHTSAVehicleAPI', () => {
    const methodsMap = {
        loadManufacturers: MANUFACTURER_MOCK,
        loadManufacturerById: EXTENDED_MANUFACTURER_MOCK,
        loadModelsForMakeId: MODEL_MOCK,
        loadMakeForManufacturer: MAKE_MOCK,
    }
    const api = new NHTSAVehicleAPI()
    api.config = { base: 'test', retries: 0, retryDelay: 0 }
    for (const [methodName, mock] of Object.entries(methodsMap)) {
        it(methodName + ' success', async () => {

            const expected = { Count: 0, Message: "", Result: [mock] }
            fetchMock.mockResponseOnce(JSON.stringify(expected))
            // @ts-ignore
            const res = await api[methodName]()
            expect(res).toStrictEqual(expected)
        })
        it(methodName + ' error', () => {
            fetchMock.mockReject()
            // @ts-ignore
            expect(api[methodName]()).rejects.toEqual(undefined)
        })
    }
    it('updates config', () => {
        expect(api._config.base).toEqual('test')
    })
    it('retries', () => {
        api.config = { base: 'test', retries: 5, retryDelay: 0 }
        fetchMock.mockRejectOnce()
        expect(api.loadManufacturers()).rejects.toEqual(undefined)
        fetchMock.mockResponse(JSON.stringify({ Count: 0, Message: "", Result: [MANUFACTURER_MOCK] }))
        expect(api.loadManufacturers()).resolves.toEqual({ Count: 0, Message: "", Result: [MANUFACTURER_MOCK] })
    })
    it('4xx errors', () => {
        api.config = { base: 'test', retries: 5, retryDelay: 0 }
        fetchMock.mockResponse(() => Promise.resolve({
            status: 404,
            body: "Not Found"
        }))
        expect(api.loadManufacturers()).rejects.toEqual(new Error("Not Found"))
    })
})