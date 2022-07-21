import { services } from "./services";

export class ServiceNotFoundError extends Error {
    constructor(public serviceName: services) {
        super(`service ${serviceName} is not registered`);
    }
}