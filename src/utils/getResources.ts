import { Resource } from "../components/Resource";
import { baseURL } from "../config";
import axios from "axios";

export async function getResources(
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>,
    currentPage: number
) {
    // const response = await axios.get(`${baseURL}/resources`);
    // setResources(response.data);
    const response = await axios.get(
        `${baseURL}/resources/pages/${currentPage}`
    );
    setResources(response.data);
}
