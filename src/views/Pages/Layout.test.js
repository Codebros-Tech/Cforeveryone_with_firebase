import {render, screen} from "@testing-library/react";
import WelcomePage from "./WelcomePage.jsx";

test("Renders Private layout", () => {
    render(<WelcomePage />)

    expect(screen.getByText("Get Started").toBeInTheDocument());
});