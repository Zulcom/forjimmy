import React from 'react'
import ErrorBoundary from "../../components/ErrorBoundary";
import { render } from "@testing-library/react";
const Child = () => {
    throw new Error()
}

describe('Error Boundary', () => {
    it(`should render error boundary component when there is an error`, () => {
        const { getByText } = render(
            <ErrorBoundary>
                <Child />
            </ErrorBoundary>
        )
        const errorMessage = getByText('Unhandled Error in UI occurred')
        expect(errorMessage).toBeInTheDocument()
    })
})
