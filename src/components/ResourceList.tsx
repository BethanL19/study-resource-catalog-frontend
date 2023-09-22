import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { AddResource } from "./AddResource";
import { getResources } from "../utils/getResources";
import { Button } from "@chakra-ui/react";
import showToast from "../utils/showToast";
import { Searchables } from "./Searchables";
import { getNumOfPages } from "../utils/getNumOfPages";

interface ResourceListProps {
    listType: "browse" | "studyList";
    userId: number;
    setListType: React.Dispatch<React.SetStateAction<"browse" | "studyList">>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
}

export function ResourceList({
    listType,
    userId,
    setListType,
    setCurrentPage,
    currentPage,
}: ResourceListProps): JSX.Element {
    const [resources, setResources] = useState<Resource[]>([]);
    const [numOfPages, setNumOfPages] = useState(1);
    const [typedSearch, setTypedSearch] = useState("");
    const [clickedTags, setClickedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNumOfPages(
            setNumOfPages,
            typedSearch,
            clickedTags,
            listType === "browse" ? 0 : userId
        );
        getResources(
            setResources,
            currentPage,
            typedSearch,
            clickedTags,
            listType === "browse" ? 0 : userId,
            setLoading
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typedSearch, clickedTags, currentPage, listType]);

    const handleGoToStudyList = () => {
        if (userId === 0) {
            showToast(
                "Not logged in!",
                "Log in to access your study list",
                "error"
            );
            return;
        }
        setListType("studyList");
    };

    const handleGoToResources = () => {
        setListType("browse");
    };

    const resourcesForRender = resources.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            userId={userId}
            listType={listType}
            setResources={setResources}
            currentPage={currentPage}
            setNumOfPages={setNumOfPages}
            typedSearch={typedSearch}
            clickedTags={clickedTags}
            setLoading={setLoading}
        />
    ));

    const handlePageChange = (page: string) => {
        setCurrentPage(parseInt(page));
        getResources(
            setResources,
            currentPage,
            typedSearch,
            clickedTags,
            listType === "browse" ? 0 : userId,
            setLoading
        );
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
                {listType === "browse" && (
                    <div className="add-button">
                        <AddResource
                            setResources={setResources}
                            userId={userId}
                            setLoading={setLoading}
                        />
                    </div>
                )}

                {listType === "browse" ? (
                    <div className="nav-button">
                        <Button onClick={handleGoToStudyList}>
                            Go to my study list
                        </Button>
                    </div>
                ) : (
                    <div className="nav-button">
                        <Button onClick={handleGoToResources}>
                            Back to all resources
                        </Button>
                    </div>
                )}

                <Searchables
                    typedSearch={typedSearch}
                    setTypedSearch={setTypedSearch}
                    clickedTags={clickedTags}
                    setClickedTags={setClickedTags}
                />
            </div>
            {loading ? (
                <p className="list-message">Loading...</p>
            ) : resources.length > 0 ? (
                <div className="resources">{resourcesForRender}</div>
            ) : (
                <p className="list-message">No results to display!</p>
            )}

            {pageButtons}
        </div>
    );
}
