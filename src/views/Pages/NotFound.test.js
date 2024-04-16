import {render, screen} from "@testing-library/react";
import NotFound from "@/src/views/Pages/NotFound.jsx";


test("Renders Private layout", () => {
    render(<NotFound />)

    expect(screen.getByText("Get Started").toBeInTheDocument());
});