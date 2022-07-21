import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactIOCContext from './ioc/ReactIOCContext';
import createAppContainer from "./appContainer";
import ErrorBoundary from "./components/ErrorBoundary";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
createAppContainer().then((appContainer) => {
    root.render(
        <React.StrictMode>
            <ErrorBoundary>
                <HashRouter>
                    <ReactIOCContext.Provider value={{ container: appContainer }}>
                        <App/>
                    </ReactIOCContext.Provider>
                </HashRouter>
            </ErrorBoundary>
        </React.StrictMode>
    );
}).catch(console.error)
