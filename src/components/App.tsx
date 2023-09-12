import "./App.css";
import { Resource, ResourceComponent } from "./RescourceComponent";
import resources from "../resources.json";

function App() {
    const resourcesFromJsonFile: Resource[] = resources.resources;

    return (
        <div className="App">
            {resourcesFromJsonFile.map((el) => {
                return <ResourceComponent key={el.id} resource={el} />;
            })}
        </div>
    );
}

export default App;
