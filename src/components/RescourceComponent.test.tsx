import { render, screen } from "../testUtils/testUtils";
import { ResourceComponent } from "./RescourceComponent";

//An example of using react-testing-library
describe("MyComponent", async () => {
    test("Should have text this is Resource Component", () => {
        render(<ResourceComponent />);
        const elem = screen.getByText("This is Resource Component");
        expect(elem).toBeInTheDocument();
    });
});
