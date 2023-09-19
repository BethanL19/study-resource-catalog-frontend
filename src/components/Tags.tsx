import axios from "axios";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { baseURL } from "../config";
import { Tag } from "./Searchables";
import { Action } from "./AddResource";
import { MultiValue } from "react-select";

interface TagOption {
    value: string;
    label: string;
}
interface TagsProps {
    dispatch: React.Dispatch<Action>;
}
export function Tags(props: TagsProps): JSX.Element {
    const [tagsOptions, setTagsOptions] = useState<TagOption[]>([]);

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

    const handleTagChange = (tags: MultiValue<TagOption>) => {
        const tagsArray = tags.map((t: TagOption) => t.value);
        props.dispatch({
            type: "update",
            payload: { key: "tags", value: tagsArray },
        });
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
