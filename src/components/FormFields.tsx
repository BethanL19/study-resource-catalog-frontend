import { FormControl, FormLabel } from "@chakra-ui/react";
import { Action, IResource, TagOption } from "./AddResource";
import InputField from "./InputField";

export interface IInputField {
    label: string;
    type: "text" | "select" | "multiselect" | "radio";
    key: string;
    placeholder?: string;
    value: string | string[];
    isRequired: boolean;
}

interface FormFieldsProps {
    dispatch: React.Dispatch<Action>;
    resource: IResource;
    tagsOptions: TagOption[];
}

export default function FormFields({
    dispatch,
    resource,
    tagsOptions,
}: FormFieldsProps): JSX.Element {
    const allFields: IInputField[] = [
        {
            label: "Resource name",
            type: "text",
            key: "resource_name",
            placeholder: "Provide a name",
            value: resource.resource_name,
            isRequired: true,
        },
        {
            label: "Author name",
            type: "text",
            key: "author_name",
            placeholder: "Who created it?",
            value: resource.author_name,
            isRequired: true,
        },
        {
            label: "URL",
            type: "text",
            key: "url",
            placeholder: "https://google.com",
            value: resource.url,
            isRequired: true,
        },
        {
            label: "Description",
            type: "text",
            key: "description",
            placeholder: "Describe this resource...",
            value: resource.description,
            isRequired: true,
        },
        {
            label: "Content type",
            type: "select",
            key: "content_type",
            value: resource.content_type,
            isRequired: true,
        },
        {
            label: "Tags",
            type: "multiselect",
            key: "tags",
            value: resource.tags,
            isRequired: true,
        },
        {
            label: "Build phase",
            type: "text",
            key: "build_phase",
            placeholder: "0",
            value: resource.build_phase,
            isRequired: false,
        },
        {
            label: "Reason",
            type: "text",
            key: "recommender_reason",
            placeholder: "What do you think about this resource?",
            value: resource.recommender_reason,
            isRequired: false,
        },
        {
            label: "Verdict",
            type: "radio",
            key: "recommender_comment",
            value: resource.recommender_comment,
            isRequired: true,
        },
    ];

    const inputElements: JSX.Element[] = allFields.map((field: IInputField) => {
        return (
            <FormControl key={field.key} mb="5">
                <FormLabel>
                    {field.isRequired && "* "}
                    {field.label}
                </FormLabel>
                <InputField
                    field={field}
                    dispatch={dispatch}
                    resource={resource}
                    tagsOptions={tagsOptions}
                />
            </FormControl>
        );
    });

    return <>{inputElements}</>;
}
