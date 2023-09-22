import { useEffect, useState } from "react";
import { getSearchableTags } from "../utils/getSearchableTags";
import { Button } from "@chakra-ui/react";

export interface Tag {
    tag: string;
}
interface SearchableProps {
    typedSearch: string;
    setTypedSearch: React.Dispatch<React.SetStateAction<string>>;
    clickedTags: string[];
    setClickedTags: React.Dispatch<React.SetStateAction<string[]>>;
}
export function Searchables({
    typedSearch,
    setTypedSearch,
    clickedTags,
    setClickedTags,
}: SearchableProps): JSX.Element {
    const [searchableTags, setSearchableTags] = useState<Tag[]>([]);

    useEffect(() => {
        getSearchableTags(setSearchableTags);
    }, []);

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
            colorScheme={clickedTags.includes(t.tag) ? "pink" : "teal"}
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
