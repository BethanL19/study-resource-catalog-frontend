import { Resource } from "../components/Resource";
import { baseURL } from "../config";
import axios from "axios";

export async function getStudyList(
    setStudyList: React.Dispatch<React.SetStateAction<Resource[]>>,
    userId: number
) {
    const response = await axios.get(`${baseURL}/study_list/${userId}`);
    setStudyList(response.data);
}
