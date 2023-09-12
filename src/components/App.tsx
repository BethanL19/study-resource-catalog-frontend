import "./App.css";
import { ResourcesPage } from "./ResourcesPage";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
    return (
        <ChakraProvider>
            <ResourcesPage />;
        </ChakraProvider>
    );
}
export default App;
