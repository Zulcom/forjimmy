import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ReactIOCContext from './ioc/ReactIOCContext';
import createAppContainer from "./appContainer";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
createAppContainer().then((appContainer) => {
    root.render(
        <React.StrictMode>
            <ErrorBoundary>
                <BrowserRouter>
                    <ReactIOCContext.Provider value={{ container: appContainer }}>
                        <App/>
                    </ReactIOCContext.Provider>
                </BrowserRouter>
            </ErrorBoundary>
        </React.StrictMode>
    );
}).catch(console.error)
