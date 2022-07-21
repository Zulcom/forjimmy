import { ManufacturerMakesList } from "../../components/ManufacturerMakesList";
import MODEL_MOCK from "../../__mocks__/Model";
import { render, screen } from "@testing-library/react";

describe('ManufacturerMakesList', () => {
    it('renders', () => {
        render(<ManufacturerMakesList makes={[{ id: "0", name: 'Name', models: [MODEL_MOCK] }]}/>)
        expect(screen.getByText(MODEL_MOCK.Model_Name)).toBeInTheDocument()
    })
})