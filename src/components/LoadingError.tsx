import React from "react";
import type { FC } from 'react'

interface LoadingErrorProps {
    apiName?: string
}

const LoadingError: FC<LoadingErrorProps> = ({ apiName = '' }) => (
    <p>An error happened with connection to {apiName} API</p>)
export { LoadingError }