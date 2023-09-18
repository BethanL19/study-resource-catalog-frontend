import { Tag } from "../components/Searchables";
import { baseURL } from "../config";
import axios from "axios";


export async function getSearchableTags(
    setSearchableTags: React.Dispatch<React.SetStateAction<Tag[]>>
) {
    const response = await axios.get(`${baseURL}/tags`);
    setSearchableTags(response.data);
}
