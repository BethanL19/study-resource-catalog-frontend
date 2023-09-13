export interface Resource {
    id: number;
    resource_name: string;
    author_name: string;
    url: string;
    description: string;
    date_added: string;
    likes: number;
    dislikes: number;
}

export interface ResourceCompontentProps {
    resource: Resource;
}

export function ResourceComponent(props: ResourceCompontentProps): JSX.Element {
    return (
        <div className="resource">
            <div>{props.resource.resource_name}</div>
            <div>{props.resource.author_name}</div>
            <a href={props.resource.url}>link</a>
            <div>{props.resource.description}</div>
            <div>{props.resource.likes}</div>
            <div>{props.resource.dislikes}</div>
            <div>{props.resource.date_added}</div>
        </div>
    );
}
