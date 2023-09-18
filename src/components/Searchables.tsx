import { useEffect, useState } from "react";
import { getSearchableTags } from "../utils/getSearchableTags";
import { Button } from "@chakra-ui/react";
import { searchResources } from "../utils/searchResources";
import { filterResourceTags } from "../utils/filterResourceTags";
import { Resource } from "./Resource";

export interface Tag {
    tag: string;
}
interface SearchableProps {
    resources: Resource[];
    setSearchedResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}
export function Searchables(props: SearchableProps): JSX.Element {
    const [searchableTags, setSearchableTags] = useState<Tag[]>([]);
    const [typedSearch, setTypedSearch] = useState("");
    const [clickedTags, setClickedTags] = useState<string[]>([]);

    useEffect(() => {
        getSearchableTags(setSearchableTags);
    }, []);

    const handleSearchResources = () => {
        const filteredResources = searchResources(
            typedSearch,
            filterResourceTags(clickedTags, props.resources)
        );
        props.setSearchedResources(filteredResources);
    };

    useEffect(
        () => {
            handleSearchResources();
        },
        // eslint-disable-next-line
        [searchableTags, typedSearch, clickedTags]
    );

    const handleSearch = (searchWord: string) => {
        setTypedSearch(searchWord);
    };

    const handleTagClick = (tag: string) => {
        if (!clickedTags.includes(tag)) {
            setClickedTags([...clickedTags, tag]);
        } else {
            setClickedTags(
                clickedTags.filter((clickedTag) => clickedTag !== tag)
            );
        }
    };

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
    );
}
