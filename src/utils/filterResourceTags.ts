import { Resource } from "../components/Resource";

export function filterResourceTags(tags: string[], resources: Resource[]) {
    let filteredData;
    if (tags.length > 0) {
        filteredData = resources.filter((item) => {
            return tags.some((tag) => item.tags.includes(tag));
        });
    } else {
        filteredData = resources;
    }
    return filteredData;
}
