import { renderWithRouter } from "../utils/test";
import App from "../App";
import { waitFor } from "@testing-library/react";

describe('<App>', () => {
    it('renders', async () => {
        const res = await renderWithRouter(<App/>, ['/404'])
        expect(res.getByText('Jimmy')).toBeInTheDocument()
    })
    it('correctly routed: not found', async () => {
        const res = await renderWithRouter(<App/>, ['/404'])
        expect(res.getByText('Go Home')).toBeInTheDocument()
    })
    it('correctly routed: index', async () => {
        const res = await renderWithRouter(<App/>)
        await waitFor(() => expect(res.queryByRole('table')).toBeInTheDocument())
    });
    it('correctly routed: details', async () => {
        const res = await renderWithRouter(<App/>, ['/mfr/1'])
        expect(res.getByText('← Back')).toBeInTheDocument()
    })
})