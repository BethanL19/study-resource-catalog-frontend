import { useState } from "react";
import "./App.css";
import { ResourcesPage } from "./ResourcesPage";
import { ChakraProvider } from "@chakra-ui/react";
import { StudyList } from "./StudyList";
import { Login } from "./Login";
import { Footer } from "./Footer";

function App() {
    const [showResourcesPage, setShowResourcesPage] = useState<boolean>(true);
    const [userId, setUserId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);

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
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                <StudyList
                    showResourcesPage={showResourcesPage}
                    userId={userId}
                    setShowResourcesPage={setShowResourcesPage}
                    currentPage={currentPage}
                />
            )}
            <Footer />
        </ChakraProvider>
    );
}
export default App;
