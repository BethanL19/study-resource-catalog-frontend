import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { AddResource } from "./AddResource";
import { getResources } from "../utils/getResources";
import { Button } from "@chakra-ui/react";
import showToast from "../utils/showToast";
import { Searchables } from "./Searchables";
import { getNumOfPages } from "../utils/getNumOfPages";

interface ResourcePageProps {
    userId: number;
    showResourcesPage: boolean;
    setShowResourcesPage: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
}

export function ResourcesPage({
    userId,
    showResourcesPage,
    setShowResourcesPage,
    setCurrentPage,
    currentPage,
}: ResourcePageProps): JSX.Element {
    const [resources, setResources] = useState<Resource[]>([]);
    const [numOfPages, setNumOfPages] = useState(1);
    const [typedSearch, setTypedSearch] = useState("");
    const [clickedTags, setClickedTags] = useState<string[]>([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        getNumOfPages(setNumOfPages);
        getResources(setResources, currentPage, typedSearch, clickedTags);
        if (resources.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }, [currentPage, typedSearch, clickedTags, resources]);

    const handleStudyListPage = () => {
        if (userId === 0) {
            showToast(
                "Not logged in!",
                "Log in to access your study list",
                "error"
            );
            return;
        }
        setShowResourcesPage(false);
    };

    const resourcesForRender = resources.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            user_id={userId}
            showResourcesPage={showResourcesPage}
            setResources={setResources}
            currentPage={currentPage}
        />
    ));

    const handlePageChange = (page: string) => {
        setCurrentPage(parseInt(page));
        getResources(setResources, currentPage, typedSearch, clickedTags);
    };

    const pageButtons: JSX.Element[] = [];
    for (let i = 1; i <= numOfPages; i++) {
        pageButtons.push(
            <Button
                onClick={(event) => handlePageChange(event.currentTarget.value)}
                key={i}
                value={i}
            >
                {i}
            </Button>
        );
    }

    return (
        <div>
            <div>
                <div className="add-button">
                    <AddResource setResources={setResources} userId={userId} />
                </div>
                <div className="nav-button">
                    <Button onClick={handleStudyListPage}>
                        Go to my study list
                    </Button>
                </div>
                <Searchables
                    resources={resources}
                    typedSearch={typedSearch}
                    setTypedSearch={setTypedSearch}
                    clickedTags={clickedTags}
                    setClickedTags={setClickedTags}
                    noResults={noResults}
                />
            </div>
            <div className="resources">{resourcesForRender}</div>
            {pageButtons}
        </div>
    );
}
