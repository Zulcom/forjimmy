import React from 'react'
import { render, screen } from "@testing-library/react";
import { LoadingError } from "../../components/LoadingError";

describe("Loading error", () => {
    it('renders', () => {
        render(<LoadingError/>)
        expect(screen.getByText('An error happened with connection to API')).toBeInTheDocument()
    });

    it('renders with text', () => {
        render(<LoadingError apiName='test'/>)
        expect(screen.getByText('An error happened with connection to test API')).toBeInTheDocument()
    })
})