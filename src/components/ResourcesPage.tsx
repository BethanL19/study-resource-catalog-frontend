
import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { baseURL } from "../config";
import axios from "axios";

export function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [userId, _setUserId] = useState<number>(0);
    const [showResourcesPage, _setShowResourcesPage] = useState<boolean>(true);

    useEffect(() => {
        async function getResources() {
            const response = await axios.get(`${baseURL}/resources`);
            setResources(response.data);
        }
        getResources();
    }, []);

    useEffect(() => {
        async function getTags() {
            const response = await axios.get(`${baseURL}/tags`);
            setTags(response.data);
        }
        getTags();
    }, []);

    const resourcesForRender = resources.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            tags={tags}
            user_id={userId}
            showResourcesPage={showResourcesPage}
        />
    ));
    return <div>{resourcesForRender}</div>;

}
