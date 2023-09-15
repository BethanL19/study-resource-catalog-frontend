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
import { useState } from "react";
import { baseURL } from "../config";
import { getResources } from "../utils/getResources";
import { Resource } from "./Resource";

interface AddResourceComponentProps {
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function AddResourceComponent({
    setResources,
}: AddResourceComponentProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [resourceName, setResourceName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [contentType, setContentType] = useState("");
    const [buildPhase, setBuildPhase] = useState("");
    const [comment, setComment] = useState(
        "I recommend this resource after having used it"
    );
    const [reason, setReason] = useState("");
    const [tags, setTags] = useState("");

    const toast = useToast();

    const handleSubmit = async () => {
        const allFields = textInputFields.concat(contentTypeField);
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
            const response = await axios.post(`${baseURL}/resources/new`, {
                resource_name: resourceName,
                author_name: authorName,
                url,
                description,
                content_type: contentType,
                build_phase: buildPhase,
                recommender_id: 1,
                recommender_comment: comment,
                recommender_reason: reason,
            });
            const lowercaseTags = tags.toLowerCase();
            await axios.post(`${baseURL}/tags/${response.data[0].id}`, {
                tags: lowercaseTags,
            });
            onClose();

            toast({
                title: "Resource added.",
                description: "Your resource has been submitted.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            setResourceName("");
            setAuthorName("");
            setUrl("");
            setDescription("");
            setContentType("");
            setBuildPhase("");
            setComment("I recommend this resource after having used it");
            setReason("");
            setTags("");

            getResources(setResources);
        } catch (error) {
            console.error(error);
        }
    };

    interface IInputField {
        label: string;
        placeholder?: string;
        value: string | string[];
        callback: (event: React.ChangeEvent<HTMLInputElement>) => void;
        isRequired: boolean;
    }

    const contentTypeField: IInputField = {
        label: "Content type",
        value: contentType,
        callback: (event) => setContentType(event.target.value),
        isRequired: true,
    };

    const textInputFields: IInputField[] = [
        {
            label: "Resource name",
            placeholder: "Provide a name",
            value: resourceName,
            callback: (event) => setResourceName(event.target.value),
            isRequired: true,
        },
        {
            label: "Author name",
            placeholder: "Who created it?",
            value: authorName,
            callback: (event) => setAuthorName(event.target.value),
            isRequired: true,
        },
        {
            label: "URL",
            placeholder: "https://google.com",
            value: url,
            callback: (event) => setUrl(event.target.value),
            isRequired: true,
        },
        {
            label: "Description",
            placeholder: "Describe this resource...",
            value: description,
            callback: (event) => setDescription(event.target.value),
            isRequired: true,
        },
        {
            label: "Build phase",
            placeholder: "0",
            value: buildPhase,
            callback: (event) => setBuildPhase(event.target.value),
            isRequired: true,
        },
        {
            label: "Reason",
            placeholder: "What do you think about this resource?",
            value: reason,
            callback: (event) => setReason(event.target.value),
            isRequired: false,
        },
        {
            label: "Tags (separated by commas)",
            placeholder: "React,TypeScript,JavaScript",
            value: tags,
            callback: (event) => setTags(event.target.value),
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
                            <FormControl key={field.label}>
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
                                    onChange={field.callback}
                                />
                            </FormControl>
                        ))}

                        <FormControl mb="5">
                            <FormLabel>* Content type</FormLabel>
                            <Select
                                borderColor={
                                    contentType === "" ? "red" : "inherit"
                                }
                                value={contentType}
                                onChange={(event) =>
                                    setContentType(event.target.value)
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

                        <FormControl mb="5">
                            <FormLabel>* Verdict</FormLabel>
                            <RadioGroup
                                mb="5"
                                onChange={setComment}
                                value={comment}
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
