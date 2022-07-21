import { ServiceNotFoundError } from "./ServiceNotFoundError";
import { ServiceRegisterError } from "./ServiceRegisterError";
import { services } from "./services";
import { Service } from "./Service";

export class IOC {
    private services: Record<string, unknown> = {}
    constructor(private configs: Record<services, { [serviceImplementationName: string]: unknown }>) {
    }

    register(name: services, service: Service) {
        if (!(name in this.configs)) {
            throw new ServiceRegisterError(name)
        }
        service._config = this.configs[name][service.name];
        this.services[name] = service;
    }

    get<T>(name: services): T {
        if (name in this.services) {
            return this.services[name] as T
        } else {
            throw new ServiceNotFoundError(name)
        }
    }
}

