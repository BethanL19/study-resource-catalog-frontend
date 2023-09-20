import { Resource } from "../components/Resource";
import { baseURL } from "../config";
import axios from "axios";

interface Params {
    typedSearch?: string;
    searchTags?: string[];
    userId: number;
}

export async function getResources(
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>,
    currentPage: number,
    typedSearch: string,
    searchTags: string[],
    userId: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    setLoading(true);
    const params: Params = { typedSearch, searchTags, userId };

    const response = await axios.get(
        `${baseURL}/resources/filter/pages/${currentPage}`,
        { params }
    );
    setResources(response.data);
    setLoading(false);
}
