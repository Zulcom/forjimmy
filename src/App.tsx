import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { IndexPage } from "./pages/IndexPage";
import { ManufacturerPage } from "./pages/ManufacturerPage";

function App() {
    return <>
        <header>
            <h1 className='site-title'>The NHTSA Product Information Catalog <a href="https://vpic.nhtsa.dot.gov/api/"
                                                                                target="_blank"
                                                                                rel="noopener noreferrer nofollow">Vehicle Listing
                API</a> Explorer</h1>
            <p className='site-subtitle'>for <a href="https://www.fromjimmy.com/"
                                                target="_blank"
                                                rel='noopener noreferrer nofollow'>Jimmy</a></p>
        </header>
        <hr/>
        <main className='app-main'>
            <section aria-live="polite">
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/mfr/:id" element={<ManufacturerPage/>}/>
            </Routes>
            </section>
        </main>
    </>

}

export default App;
