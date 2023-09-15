import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useReducer } from "react";
import { baseURL } from "../config";
import { getResources } from "../utils/getResources";
import { Resource } from "./Resource";

interface AddResourceComponentProps {
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

type State = {
    resource_name: string;
    author_name: string;
    url: string;
    description: string;
    content_type: string;
    build_phase: string;
    recommender_id: string;
    recommender_comment: string;
    recommender_reason: string;
    tags: string;
};

type Action =
    | {
          type: "update";
          payload: {
              key: string;
              value: string;
          };
      }
    | { type: "reset" };

const initialState = {
    resource_name: "",
    author_name: "",
    url: "",
    description: "",
    content_type: "",
    build_phase: "",
    recommender_id: "1",
    recommender_comment: "I recommend this resource after having used it",
    recommender_reason: "",
    tags: "",
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "update":
            return { ...state, [action.payload.key]: action.payload.value };
        case "reset":
            return initialState;
        default:
            throw new Error(`Unknown action type`);
    }
};

export function AddResourceComponent({
    setResources,
}: AddResourceComponentProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [resource, dispatch] = useReducer(reducer, initialState);
    console.log(resource);

    const toast = useToast();

    const handleSubmit = async () => {
        const allFields = textInputFields.concat(dropDownFields);
        const emptyFields = allFields.filter((field) => {
            return field.isRequired && field.value.length === 0;
        });

        if (emptyFields.length > 0) {
            toast({
                title: "Empty fields",
                description: `Please make sure you populate all the required fields`,
                status: "warning",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        try {
            await axios.post(`${baseURL}/resources/new`, resource);

            onClose();

            toast({
                title: "Resource added.",
                description: "Your resource has been submitted.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            dispatch({ type: "reset" });

            getResources(setResources);
        } catch (error) {
            console.error(error);
            interface ServerError {
                response: {
                    data: {
                        length: number;
                        name: string;
                        severity: string;
                        code: string;
                        detail: string;
                        schema: string;
                        table: string;
                        constraint: string;
                        file: string;
                        line: string;
                        routine: string;
                    };
                };
            }
            const serverError: ServerError = error as ServerError;
            const errorCode = serverError.response.data.code;
            if (errorCode === "23505") {
                // This code means a violation of the unique key constraint on the url column,
                // which means this resource has already been added.
                toast({
                    title: "Duplicate resource",
                    description: "The URL you have provided already exists.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    };

    interface IInputField {
        label: string;
        key: string;
        placeholder?: string;
        value: string;
        isRequired: boolean;
    }

    // This is in an array so that it can be defined in one place, and then used both in empty space validation and creating a Select element.
    const dropDownFields: IInputField[] = [
        {
            label: "Content type",
            key: "content_type",
            value: resource.content_type,
            isRequired: true,
        },
    ];

    const textInputFields: IInputField[] = [
        {
            label: "Resource name",
            key: "resource_name",
            placeholder: "Provide a name",
            value: resource.resource_name,
            isRequired: true,
        },
        {
            label: "Author name",
            key: "author_name",
            placeholder: "Who created it?",
            value: resource.author_name,
            isRequired: true,
        },
        {
            label: "URL",
            key: "url",
            placeholder: "https://google.com",
            value: resource.url,
            isRequired: true,
        },
        {
            label: "Description",
            key: "description",
            placeholder: "Describe this resource...",
            value: resource.description,
            isRequired: true,
        },
        {
            label: "Build phase",
            key: "build_phase",
            placeholder: "0",
            value: resource.build_phase,
            isRequired: true,
        },
        {
            label: "Reason",
            key: "recommender_reason",
            placeholder: "What do you think about this resource?",
            value: resource.recommender_reason,
            isRequired: false,
        },
        {
            label: "Tags (separated by commas)",
            key: "tags",
            placeholder: "React,TypeScript,JavaScript",
            value: resource.tags,
            isRequired: true,
        },
    ];

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

    return (
        <>
            <Button onClick={onOpen} colorScheme="green">
                + Add resource
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new resource</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {textInputFields.map((field) => (
                            <FormControl key={field.key}>
                                <FormLabel>
                                    {field.isRequired && "* "}
                                    {field.label}
                                </FormLabel>
                                <Input
                                    mb="5"
                                    borderColor={
                                        field.isRequired && field.value === ""
                                            ? "red"
                                            : "inherit"
                                    }
                                    placeholder={field.placeholder}
                                    value={field.value}
                                    onChange={(event) =>
                                        dispatch({
                                            type: "update",
                                            payload: {
                                                key: field.key,
                                                value: event.target.value,
                                            },
                                        })
                                    }
                                />
                            </FormControl>
                        ))}

                        {dropDownFields.map((field) => (
                            <FormControl key={field.key} mb="5">
                                <FormLabel>
                                    {field.isRequired && "* "}
                                    {field.label}
                                </FormLabel>
                                <Select
                                    borderColor={
                                        field.isRequired && field.value === ""
                                            ? "red"
                                            : "inherit"
                                    }
                                    value={field.value}
                                    onChange={(event) =>
                                        dispatch({
                                            type: "update",
                                            payload: {
                                                key: "content_type",
                                                value: event.target.value,
                                            },
                                        })
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
                            </FormControl>
                        ))}

                        <FormControl mb="5">
                            <FormLabel>* Verdict</FormLabel>
                            <RadioGroup
                                mb="5"
                                onChange={(value) =>
                                    dispatch({
                                        type: "update",
                                        payload: {
                                            key: "recommender_comment",
                                            value,
                                        },
                                    })
                                }
                                value={resource.recommender_comment}
                            >
                                <Stack direction="column">
                                    <Radio value="I recommend this resource after having used it">
                                        I recommend this resource after having
                                        used it
                                    </Radio>
                                    <Radio value="I do not recommend this resource, having used it">
                                        I do not recommend this resource, having
                                        used it
                                    </Radio>
                                    <Radio value="I haven't used this resource but it looks promising">
                                        I haven't used this resource but it
                                        looks promising
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <Text>(* Required)</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={handleSubmit}
                            colorScheme="green"
                            mr={3}
                        >
                            Submit
                        </Button>
                        <Button onClick={onClose} colorScheme="red">
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
