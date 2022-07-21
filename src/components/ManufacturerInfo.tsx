import React from "react";
import type { FC } from 'react'
interface ManufacturerInfoProps {
    name: string;
    id: string;
    country: string;
}

/**
 * Presenter for manufacturer info
 */
const ManufacturerInfo: FC<ManufacturerInfoProps> = ({ name, id, country }) => {
    return <>
        <h2>{name} (#{id})</h2>
        <p>{country}</p>
    </>
}
export default ManufacturerInfo