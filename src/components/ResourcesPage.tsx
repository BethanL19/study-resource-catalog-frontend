import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { baseURL } from "../config";
import axios from "axios";
import { AddResourceComponent } from "./AddResourceComponent";
import { getResources } from "../utils/getResources";
import { Button } from "@chakra-ui/react";
import { searchResources } from "../utils/searchResources";
import { filterResourceTags } from "../utils/filterResourceTags";
import { Login } from "./Login";

interface Tag {
    tag: string;
}

export function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [searchableTags, setSearchableTags] = useState<Tag[]>([]);
    // set to be 1 until login built
    const [userId, setUserId] = useState<number>(1);
    const [showResourcesPage, _setShowResourcesPage] = useState<boolean>(true);
    const [typedSearch, setTypedSearch] = useState("");
    const [clickedTags, setClickedTags] = useState<string[]>([]);

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

    const handleTagClick = (tag: string) => {
        if (!clickedTags.includes(tag)) {
            setClickedTags([...clickedTags, tag]);
        } else {
            setClickedTags(
                clickedTags.filter((clickedTag) => clickedTag !== tag)
            );
        }
    };

    const resourcesData = searchResources(
        typedSearch,
        filterResourceTags(clickedTags, resources)
    );

    const resourcesForRender = resourcesData.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            user_id={userId}
            showResourcesPage={showResourcesPage}
            setResources={setResources}
        />
    ));
    const searchTags = searchableTags.map((t, index) => (
        <Button
            key={index}
            colorScheme="pink"
            onClick={() => {
                handleTagClick(t.tag);
            }}
        >
            {t.tag}
        </Button>
    ));
    return (
        <div>
            <div className="login">
                <Login setUserId={setUserId} />
            </div>
            <div className="add-button">
                <AddResourceComponent setResources={setResources} />
            </div>
            <div className="searchables">
                <input
                    className="searchBar"
                    placeholder="Search..."
                    value={typedSearch}
                    onChange={(event) => {
                        handleSearch(event.target.value);
                    }}
                />
                <div className="searchTags">{searchTags}</div>
            </div>
            <div className="resources">{resourcesForRender}</div>
        </div>
    );
}
