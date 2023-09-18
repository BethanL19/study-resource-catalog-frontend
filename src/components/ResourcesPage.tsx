import { Resource, ResourceComponent } from "./Resource";
import { useEffect, useState } from "react";
import { baseURL } from "../config";
import axios from "axios";
import { AddResource } from "./AddResource";
import { getResources } from "../utils/getResources";
import { Button } from "@chakra-ui/react";
import { searchResources } from "../utils/searchResources";
import { filterResourceTags } from "../utils/filterResourceTags";
import showToast from "../utils/showToast";

interface Tag {
    tag: string;
}
interface ResourcePageProps {
    userId: number;
    showResourcesPage: boolean;
    setShowResourcesPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ResourcesPage(props: ResourcePageProps) {
    const [resources, setResources] = useState<Resource[]>([]);
    const [searchableTags, setSearchableTags] = useState<Tag[]>([]);
    const [typedSearch, setTypedSearch] = useState("");
    const [clickedTags, setClickedTags] = useState<string[]>([]);

    useEffect(() => {
        getResources(setResources);
    }, []);
    console.log(resources);

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

    const resourcesData = searchResources(
        typedSearch,
        filterResourceTags(clickedTags, resources)
    );

    const resourcesForRender = resourcesData.map((r, index) => (
        <ResourceComponent
            key={index}
            resource={r}
            user_id={props.userId}
            showResourcesPage={props.showResourcesPage}
            setResources={setResources}
        />
    ));
    const searchTags = searchableTags.map((t, index) => (
        <Button
            key={index}
            colorScheme={clickedTags.includes(t.tag) ? "blue" : "pink"}
            onClick={() => {
                handleTagClick(t.tag);
            }}
        >
            {t.tag}
        </Button>
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
                <div>
                    <Button onClick={handleStudyListPage}>
                        Go to my study list
                    </Button>
                </div>
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
