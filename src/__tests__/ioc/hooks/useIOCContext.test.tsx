import React from 'react'
import { useIOCContext } from "../../../ioc/hooks/useIOCContext";
import { renderHook, screen } from "@testing-library/react";
import { renderWithRouter } from "../../../utils/test";
import type { Service } from "../../../ioc/Service";

const TestComponent = () => {
    const app = useIOCContext();
    if (!app) throw Error()
    return <div>{app.get<Service>('api').name}</div>
}
describe('useIOCContext', function () {
    it('handles error if no context', () => {
        expect(() => renderHook(useIOCContext)).toThrow('could not find react-IOC context value; please ensure the component is wrapped in a <Provider>')
    })
    it('returns correct context', async() => {
       await renderWithRouter(<TestComponent/>)
        expect(screen.getByText('MockAPI')).toBeInTheDocument()
    })
});