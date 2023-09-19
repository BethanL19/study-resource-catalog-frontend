import { getStudyList } from "../utils/getStudyList";
import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Searchables } from "./Searchables";

interface StudyListProps {
    userId: number;
    showResourcesPage: boolean;
    setShowResourcesPage: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage: number;
}

export function StudyList({
    userId,
    showResourcesPage,
    setShowResourcesPage,
    currentPage,
}: StudyListProps): JSX.Element {
    const [studyList, setStudyList] = useState<Resource[]>([]);
    const [searchedStudyList, setSearchedStudyList] = useState<Resource[]>([]);

    useEffect(() => {
        getStudyList(setStudyList, userId);
    }, [userId]);

    const handleResourcesPage = () => {
        setShowResourcesPage(true);
    };

    const studyResources = searchedStudyList.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            user_id={userId}
            showResourcesPage={showResourcesPage}
            setResources={setStudyList}
            currentPage={currentPage}
        />
    ));

    return (
        <div>
            <div>
                <div className="nav-button">
                    <Button onClick={handleResourcesPage}>
                        Back to all resources
                    </Button>
                </div>
                <Searchables
                    resources={studyList}
                    setSearchedResources={setSearchedStudyList}
                />
            </div>
            <div className="resources">{studyResources}</div>
        </div>
    );
}
