import { useEffect, useState } from "react";
import { getSearchableTags } from "../utils/getSearchableTags";
import { Button } from "@chakra-ui/react";
import { Resource } from "./Resource";

export interface Tag {
    tag: string;
}
interface SearchableProps {
    resources: Resource[];
    typedSearch: string;
    setTypedSearch: React.Dispatch<React.SetStateAction<string>>;
    clickedTags: string[];
    setClickedTags: React.Dispatch<React.SetStateAction<string[]>>;
    noResults:boolean
}
export function Searchables(props: SearchableProps): JSX.Element {
    const [searchableTags, setSearchableTags] = useState<Tag[]>([]);

    useEffect(() => {
        getSearchableTags(setSearchableTags);
    }, []);

    const handleSearch = (searchWord: string) => {
        props.setTypedSearch(searchWord);
    };

    const handleTagClick = (tag: string) => {
        if (!props.clickedTags.includes(tag)) {
            props.setClickedTags([...props.clickedTags, tag]);
        } else {
            props.setClickedTags(
                props.clickedTags.filter((clickedTag) => clickedTag !== tag)
            );
        }
    };

    const searchTags = searchableTags.map((t, index) => (
        <Button
            key={index}
            colorScheme={props.clickedTags.includes(t.tag) ? "pink" : "teal"}
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
                value={props.typedSearch}
                onChange={(event) => {
                    handleSearch(event.target.value);
                }}
            />
            <div className="searchTags">
                {searchTags}
                <div className="no-results">
                    {props.noResults && "no results found"}
                </div>
            </div>
        </div>
    );
}
