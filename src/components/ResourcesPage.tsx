import { Resource, ResourceComponent } from "./ResourceComponent";
import resources from "../resources.json";
import { AddResourceComponent } from "./AddResourceComponent";
// import { baseURL } from "../config";

export function ResourcesPage() {
    const resourcesFromJsonFile: Resource[] = resources.resources;

    return (
        <div>
            <AddResourceComponent />
            {resourcesFromJsonFile.map((el) => {
                return <ResourceComponent key={el.id} resource={el} />;
            })}
        </div>
    );
}
