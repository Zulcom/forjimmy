import { services } from "./services";

export class ServiceRegisterError extends Error {
    constructor(public serviceName: services) {
        super(`config for service ${serviceName} is not found`);
    }
}