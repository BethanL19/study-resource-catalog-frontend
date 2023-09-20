import { Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import { Action, IResource, TagOption } from "./AddResource";
import { IInputField } from "./FormFields";

interface InputFieldProps {
    field: IInputField;
    dispatch: React.Dispatch<Action>;
    resource: IResource;
    tagsOptions: TagOption[];
}

export default function InputField({
    field,
    dispatch,
    resource,
    tagsOptions,
}: InputFieldProps): JSX.Element {
    const contentTypes = [
        "video",
        "article",
        "ebook",
        "podcast",
        "exercise",
        "exercise set",
        "software tool",
        "course",
        "diagram",
        "cheat-sheet",
        "reference",
        "resource list",
        "youtube channel",
        "organisation",
        "other",
    ];

    const handleInput = (value: string | string[], field: IInputField) =>
        dispatch({
            type: "update",
            payload: {
                key: field.key,
                value: value,
            },
        });

    const getInputField = () => {
        switch (field.type) {
            case "text":
                return (
                    <Input
                        border={
                            field.isRequired && field.value === ""
                                ? "1px solid red"
                                : "1px solid gray"
                        }
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(event) =>
                            handleInput(event.target.value, field)
                        }
                    />
                );
            case "select":
                return (
                    <Select
                        border={
                            field.isRequired && field.value === ""
                                ? "1px solid red"
                                : "1px solid gray"
                        }
                        value={field.value}
                        onChange={(event) =>
                            handleInput(event.target.value, field)
                        }
                    >
                        <option value="" disabled>
                            Select content type
                        </option>
                        {contentTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                );

            case "multiselect":
                return (
                    <CreatableSelect
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                border:
                                    field.isRequired && field.value.length === 0
                                        ? "1px solid red"
                                        : "1px solid gray",
                            }),
                        }}
                        isMulti
                        options={tagsOptions}
                        onChange={(event) =>
                            handleInput(
                                event.map((t: TagOption) => t.value),
                                field
                            )
                        }
                    />
                );

            case "radio":
                return (
                    <RadioGroup
                        onChange={(value) => handleInput(value, field)}
                        value={resource.recommender_comment}
                    >
                        <Stack direction="column">
                            <Radio value="I recommend this resource after having used it">
                                I recommend this resource after having used it
                            </Radio>
                            <Radio value="I do not recommend this resource, having used it">
                                I do not recommend this resource, having used it
                            </Radio>
                            <Radio value="I haven't used this resource but it looks promising">
                                I haven't used this resource but it looks
                                promising
                            </Radio>
                        </Stack>
                    </RadioGroup>
                );
            default:
                return <></>;
        }
    };
    return getInputField();
}
