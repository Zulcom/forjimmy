import React, { Fragment } from "react";
import { Model } from "../types";
import type { FC } from 'react'

type ManufacturerMakes = {
    id: string,
    name: string,
    models: Model[]
}

interface ManufacturerMakesListProps {
    makes: ManufacturerMakes[]
}

/**
 * Presenter of manufacturer makes list
 * @param makes
 * @constructor
 */
const ManufacturerMakesList: FC<ManufacturerMakesListProps> = ({ makes }) => {
    return <>
        {
            makes.map(({ id, name, models }) => <Fragment key={id}>
                <h3>Make: {name}</h3>
                <ul>
                    {
                        models.map(({ Model_Name, Model_ID }) => <li key={Model_ID}>{Model_Name}</li>)
                    }
                </ul>
            </Fragment>)
        }
    </>
}
export type { ManufacturerMakes }
export { ManufacturerMakesList }