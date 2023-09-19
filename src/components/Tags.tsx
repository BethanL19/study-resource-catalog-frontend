import axios from "axios";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { baseURL } from "../config";
import { Tag } from "./Searchables";

interface TagOption {
    value: string;
    label: string;
}
export function Tags(): JSX.Element {
    const [tagsOptions, setTagsOptions] = useState<TagOption[]>([]);
    const [_selectedTags, setSelectedTags] = useState<string[]>([]);

    const getTagOptions = async () => {
        const response = await axios.get(`${baseURL}/tags`);
        const tagOptions = response.data.map((t: Tag) => ({
            value: t.tag,
            label: t.tag,
        }));
        setTagsOptions(tagOptions);
    };

    useEffect(() => {
        getTagOptions();
    }, []);

    const handleTagChange = (tags: any) => {
        const tagsArray = tags.map((t: TagOption) => t.value);
        setSelectedTags(tagsArray);
    };

    return (
        <CreatableSelect
            isMulti
            options={tagsOptions}
            onChange={(event) => {
                handleTagChange(event);
            }}
        />
    );
}
