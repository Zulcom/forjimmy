import React from 'react'
import type { FC } from 'react'
import './Spinner.css'
const Spinner: FC = () => (<div className="spinner-box">
    <div className="spinner">
        <div className="sr-only" role="alert">loading...</div>
    </div>
</div>)
export {Spinner}