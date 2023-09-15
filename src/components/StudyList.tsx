import { getStudyList } from "../utils/getStudyList";
import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

interface StudyListProps {
    userId: number;
    showResourcesPage: boolean;
    setShowResourcesPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export function StudyList(props: StudyListProps): JSX.Element {
    const [studyList, setStudyList] = useState<Resource[]>([]);

    useEffect(() => {
        getStudyList(setStudyList, props.userId);
    }, [props.userId]);

    const handleResourcesPage = () => {
        props.setShowResourcesPage(true);
    };

    const studyResources = studyList.map((r, index) => (
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
                <Button onClick={handleResourcesPage}>
                    Back to all resources
                </Button>
            </div>
            <div>{studyResources}</div>
        </div>
    );
}
