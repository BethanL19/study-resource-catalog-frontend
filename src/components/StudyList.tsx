import { getStudyList } from "../utils/getStudyList";
import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Searchables } from "./Searchables";

interface StudyListProps {
    userId: number;
    showResourcesPage: boolean;
    setShowResourcesPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export function StudyList(props: StudyListProps): JSX.Element {
    const [studyList, setStudyList] = useState<Resource[]>([]);
    const [searchedStudyList, setSearchedStudyList] = useState<Resource[]>([]);

    useEffect(
        () => {
            getStudyList(setStudyList, props.userId);
        },
        // eslint-disable-next-line
        []
    );

    const handleResourcesPage = () => {
        props.setShowResourcesPage(true);
    };

    const studyResources = searchedStudyList.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            user_id={props.userId}
            showResourcesPage={props.showResourcesPage}
            setResources={setStudyList}
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
