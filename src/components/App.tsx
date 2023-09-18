import { useState } from "react";
import "./App.css";
import { ResourcesPage } from "./ResourcesPage";
import { ChakraProvider } from "@chakra-ui/react";
import { StudyList } from "./StudyList";
import { Login } from "./Login";

function App() {
    const [showResourcesPage, setShowResourcesPage] = useState<boolean>(true);
    const [userId, setUserId] = useState<number>(0);
    return (
        <ChakraProvider>
            <Login
                userId={userId}
                setUserId={setUserId}
                setShowResourcesPage={setShowResourcesPage}
            />
            {showResourcesPage ? (
                <ResourcesPage
                    userId={userId}
                    showResourcesPage={showResourcesPage}
                    setShowResourcesPage={setShowResourcesPage}
                />
            ) : (
                <StudyList
                    showResourcesPage={showResourcesPage}
                    userId={userId}
                    setShowResourcesPage={setShowResourcesPage}
                />
            )}
        </ChakraProvider>
    );
}
export default App;
