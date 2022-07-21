import { IOC } from "./ioc";
import apiConfig from './config/api'


async function createAppContainer(): Promise<IOC> {
    const appContainer = new IOC({
        api: apiConfig,
        logger: {}
    });
    const apiImplementationName = process.env.REACT_APP_API_NAME;
    const implementations = ['NHTSAVehicleAPI', 'MockAPI']
    if (!implementations.includes(apiImplementationName)) return Promise.reject('Incorrect API realisation name, check env variables');
    return new Promise((resolve, reject) => {
        import(`./api/${apiImplementationName}`)
            .then((res) => {
                    appContainer.register('api', new res.default())
                    resolve(appContainer)
                }
            ).catch(reject)

    })
}

export default createAppContainer;