import { Resource } from "../components/Resource";
import { baseURL } from "../config";
import axios from "axios";

export async function getResources(
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>,
    currentPage: number,
    typedSearch: string,
    searchTags: string[]
) {
    const response = await axios.get(`${baseURL}/resources/filter/pages`, {
        params: {
            typedSearch: typedSearch,
            searchTags: searchTags,
            currentPage,
        },
    });
    setResources(response.data);
}
