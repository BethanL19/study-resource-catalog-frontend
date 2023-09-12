import { Resource, ResourceComponent } from "./RescourceComponent";
import resources from "../resources.json";
import { baseURL } from "../config";

export function ResourcesPage() {
    const resourcesFromJsonFile: Resource[] = resources.resources;

    return (
        <div>
            {resourcesFromJsonFile.map((el) => {
                return <ResourceComponent key={el.id} resource={el} />;
            })}
        </div>
    );
}
