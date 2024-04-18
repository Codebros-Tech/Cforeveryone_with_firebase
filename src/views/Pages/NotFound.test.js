import {render, screen} from "@testing-library/react";
import NotFound from './NotFound';


test("Renders Private layout", () => {
    render(<NotFound />)
    const linkElement = screen.getByText(/404/i);
    expect(linkElement).toBeInTheDocument();
});