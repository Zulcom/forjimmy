import { TableVirtuoso } from 'react-virtuoso'
import React from 'react'
import './DynamicTable.css'
import { Link } from 'react-router-dom';
import { Manufacturer } from "../types";
import type { FC } from 'react'

interface DynamicTableProps {
    endReached: () => void;
    data: Manufacturer[]
}

/**
 * Presenter for manufacturer table
 */
const DynamicTable: FC<DynamicTableProps> = ({ endReached, data }) => {
    return <>
        <p className='sr-only'>This table updates rows when user scroll it.</p>
        <TableVirtuoso
            style={{ height: '80vh' }}
            endReached={endReached}
            overscan={20}
            data={data}
            fixedHeaderContent={() => (
                <tr className='table__head'>
                    <th className='table__cell table__cell--id'>ID</th>
                    <th className='table__cell table__cell--name'>Common name</th>
                    <th className='table__cell table__cell--country'>Country</th>
                    <th className='table__cell table__cell--button'>Model names</th>
                </tr>
            )}
            itemContent={(index, { Country, Mfr_ID, Mfr_CommonName, Mfr_Name }) => (
                <>
                    <td className='table__cell table__cell--id'>{Mfr_ID}</td>
                    <td className='table__cell table__cell--name'>{Mfr_CommonName ?? Mfr_Name}</td>
                    <td className='table__cell table__cell--country'>{Country}</td>
                    <td className='table__cell table__cell--button'><Link to={`/mfr/${Mfr_ID}`}
                                                                          className='table__button'>More</Link></td>
                </>
            )}
        /></>


}
export {DynamicTable}