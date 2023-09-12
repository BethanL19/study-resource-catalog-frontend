import { render, screen } from "../testUtils/testUtils";
import { ResourceComponent } from "./RescourceComponent";
import resources from "../resources.json";
//An example of using react-testing-library
describe("MyComponent", async () => {
    test("Should have text this is Resource Component", () => {
        render(<ResourceComponent resource={resources.resources[0]} />);
        const elem = screen.getByText("MDN website");
        expect(elem).toBeInTheDocument();
    });
});
