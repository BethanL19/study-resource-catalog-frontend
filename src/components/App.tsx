import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import "./App.css";
import { Footer } from "./Footer";
import { Login } from "./Login";
import { ResourceList } from "./ResourceList";

function App() {
    const [listType, setListType] = useState<"browse" | "studyList">("browse");
    const [userId, setUserId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <ChakraProvider>
            <Login
                userId={userId}
                setUserId={setUserId}
                setListType={setListType}
            />
            <ResourceList
                listType={listType}
                userId={userId}
                setListType={setListType}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <Footer />
        </ChakraProvider>
    );
}
export default App;
