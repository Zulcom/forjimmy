import { IOC } from "../../ioc";
import { ServiceRegisterError } from "../../ioc/ServiceRegisterError";
import { ServiceNotFoundError } from "../../ioc/ServiceNotFoundError";

describe('IOC', () => {
    it('handles not configured module', () => {
        const container = new IOC({ api: {}, logger: {  } })
        // @ts-ignore
        expect(() => container.register('test',{})).toThrow(new ServiceRegisterError('test'))
    })
    it('handles get not configured module', () => {
        const container = new IOC({ api: {}, logger: {  } })
        expect(() => container.get('api')).toThrow(new ServiceNotFoundError('api'))
    })
})