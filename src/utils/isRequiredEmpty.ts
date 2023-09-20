import { IResource } from "../components/AddResource";

export default function isRequiredEmpty({
    resource_name,
    author_name,
    url,
    description,
    content_type,
    tags,
}: IResource): boolean {
    return (
        resource_name === "" ||
        author_name === "" ||
        url === "" ||
        description === "" ||
        content_type === "" ||
        tags.length === 0
    );
}
