import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { AddResource } from "./AddResource";
import { getResources } from "../utils/getResources";
import { Button } from "@chakra-ui/react";
import showToast from "../utils/showToast";
import { Searchables } from "./Searchables";

interface ResourcePageProps {
    userId: number;
    showResourcesPage: boolean;
    setShowResourcesPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ResourcesPage(props: ResourcePageProps): JSX.Element {
    const [resources, setResources] = useState<Resource[]>([]);
    const [searchedResources, setSearchedResources] = useState<Resource[]>([]);

    useEffect(() => {
        getResources(setResources);
    }, []);

    const handleStudyListPage = () => {
        if (props.userId === 0) {
            showToast(
                "Not logged in!",
                "Log in to access your study list",
                "error"
            );
            return;
        }
        props.setShowResourcesPage(false);
    };

    const resourcesForRender = searchedResources.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            user_id={props.userId}
            showResourcesPage={props.showResourcesPage}
            setResources={setResources}
        />
    ));

    return (
        <div>
            <div>
                <div className="add-button">
                    <AddResource
                        setResources={setResources}
                        userId={props.userId}
                    />
                </div>
                <div className="nav-button">
                    <Button onClick={handleStudyListPage}>
                        Go to my study list
                    </Button>
                </div>
                <Searchables
                    resources={resources}
                    setSearchedResources={setSearchedResources}
                />
            </div>
            <div className="resources">{resourcesForRender}</div>
        </div>
    );
}
