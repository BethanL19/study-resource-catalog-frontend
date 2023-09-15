import { Resource } from "../components/Resource";
// name, desc, tags, author
export function searchResources(typedSearch: string, resources: Resource[]) {
    let filteredResources;
    if (typedSearch.length > 0) {
        filteredResources = resources.filter(
            (resource) =>
                resource.resource_name
                    .toLowerCase()
                    .includes(typedSearch.toLowerCase()) ||
                resource.description
                    .toLowerCase()
                    .includes(typedSearch.toLowerCase()) ||
                resource.author_name
                    .toLowerCase()
                    .includes(typedSearch.toLowerCase()) ||
                resource.tags
                    .toString()
                    .toLowerCase()
                    .includes(typedSearch.toLowerCase())
        );
    } else {
        filteredResources = resources;
    }
    return filteredResources;
}
