const config = {
    'NHTSAVehicleAPI': {
        'base': process.env.REACT_APP_API_BASE,
        'retries': Number.parseInt(process.env.REACT_APP_API_RETRIES),
        'retryDelay': Number.parseInt(process.env.REACT_APP_API_RETRIES_DELAY)
    }
}
export default config