import React from "react";
import { MemoryRouter } from "react-router-dom";
import createAppContainer from "../appContainer";
import ErrorBoundary from "../components/ErrorBoundary";
import ReactIOCContext from "../ioc/ReactIOCContext";
import { render } from "@testing-library/react";
import type { Service } from "../ioc/Service";


export async function renderWithRouter(ui: React.ReactElement, initialEntries: string[] = ['/']) {
    const appContainer = await createAppContainer();
    // console.info('API implementation is', appContainer.get<Service>('api').name)
    return {
        ...render(
            <React.StrictMode>
                <ErrorBoundary>
                    <MemoryRouter initialEntries={initialEntries}>
                        <ReactIOCContext.Provider value={{ container: appContainer }}>
                            {ui}
                        </ReactIOCContext.Provider>
                    </MemoryRouter>
                </ErrorBoundary>
            </React.StrictMode>
        )
    }

}
