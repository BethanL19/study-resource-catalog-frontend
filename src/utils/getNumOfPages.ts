import { baseURL } from "../config";
import axios from "axios";

interface Params {
    typedSearch?: string;
    searchTags?: string[];
    userId: number;
}

export async function getNumOfPages(
    setNumOfPages: React.Dispatch<React.SetStateAction<number>>,
    typedSearch: string,
    searchTags: string[],
    userId: number
) {
    const params: Params = { typedSearch, searchTags, userId };
    const countResponse = await axios.get(`${baseURL}/resources/filter/count`, {
        params,
    });
    const numOfPages = Math.ceil(countResponse.data.count / 10);
    setNumOfPages(numOfPages);
}
