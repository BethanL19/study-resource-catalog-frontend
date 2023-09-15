import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { baseURL } from "../config";
import axios from "axios";
import { AddResourceComponent } from "./AddResourceComponent";
import { getResources } from "../utils/getResources";
// import { Button } from "@chakra-ui/react";
import { searchResources } from "../utils/searchResources";

export function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [_searchableTags, setSearchableTags] = useState<string[]>([]);
    // set to be 1 until login built
    const [userId, _setUserId] = useState<number>(1);
    const [showResourcesPage, _setShowResourcesPage] = useState<boolean>(true);
    const [typedSearch, setTypedSearch] = useState("");

    useEffect(() => {
        getResources(setResources);
    }, []);

    useEffect(() => {
        async function getSearchableTags() {
            const response = await axios.get(`${baseURL}/tags`);
            setSearchableTags(response.data);
        }
        getSearchableTags();
    }, []);

    const handleSearch = (searchWord: string) => setTypedSearch(searchWord);

    const resourcesData = searchResources(typedSearch, resources);

    const resourcesForRender = resourcesData.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            user_id={userId}
            showResourcesPage={showResourcesPage}
            setResources={setResources}
        />
    ));
    // const searchTags = searchableTags.map((t, index) => (
    //     <Button key={index}>{t}</Button>
    // ));
    return (
        <div>
            <AddResourceComponent setResources={setResources} />
            <input
                className="searchBar"
                placeholder="Search..."
                value={typedSearch}
                onChange={(event) => {
                    handleSearch(event.target.value);
                }}
            />
            {/* {searchTags} */}
            <div className="resources">{resourcesForRender}</div>
        </div>
    );
}
