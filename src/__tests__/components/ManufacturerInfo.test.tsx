import ManufacturerInfo from "../../components/ManufacturerInfo";
import { render, screen } from "@testing-library/react";

describe('ManufacturerInfo', () => {
    it('renders', () => {
        render(<ManufacturerInfo name={'name'} id={'0'} country={'country'}/>);
        expect(screen.getByText('country')).toBeInTheDocument()
    })

})