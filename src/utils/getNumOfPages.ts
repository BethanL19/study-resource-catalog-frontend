import { baseURL } from "../config";
import axios from "axios";

export async function getNumOfPages(
    setNumOfPages: React.Dispatch<React.SetStateAction<number>>
) {
    const countResponse = await axios.get(`${baseURL}/resources/filter/count`);
    const numOfPages = Math.ceil(countResponse.data.count / 10);
    setNumOfPages(numOfPages);
}
