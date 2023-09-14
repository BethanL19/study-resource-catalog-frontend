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
    useDisclosure,
    useToast,
    Text,
    Radio,
    RadioGroup,
    Stack,
    Select,
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
    const [tags, setTags] = useState<string[]>([]);

    const toast = useToast();

    const handleSubmit = async () => {
        const allFields = inputFields.concat(contentTypeField);
        const emptyFields = allFields.filter(
            (field) => field.isRequired && field.value === ""
        );
        console.log("Empty fields are:");
        console.log(emptyFields);
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
            await axios.post(`${baseURL}/resources/new`, {
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

            getResources(setResources);
        } catch (error) {
            console.error(error);
        }
    };

    interface IInputField {
        title: string;
        value: string | string[];
        callback: (event: React.ChangeEvent<HTMLInputElement>) => void;
        isRequired: boolean;
    }

    const contentTypeField: IInputField = {
        title: "Content type",
        value: contentType,
        callback: (event) => setContentType(event.target.value),
        isRequired: true,
    };

    // const tagsField: IInputField = {
    //     title: "Tags",
    //     value: tags,
    //     callback: (event) => setTags(event.target.value.split(",")),
    //     isRequired: false,
    // };

    const inputFields: IInputField[] = [
        {
            title: "Resource name",
            value: resourceName,
            callback: (event) => setResourceName(event.target.value),
            isRequired: true,
        },
        {
            title: "Author name",
            value: authorName,
            callback: (event) => setAuthorName(event.target.value),
            isRequired: true,
        },
        {
            title: "URL",
            value: url,
            callback: (event) => setUrl(event.target.value),
            isRequired: true,
        },
        {
            title: "Description",
            value: description,
            callback: (event) => setDescription(event.target.value),
            isRequired: true,
        },
        {
            title: "Build phase",
            value: buildPhase,
            callback: (event) => setBuildPhase(event.target.value),
            isRequired: true,
        },
        {
            title: "Reason",
            value: reason,
            callback: (event) => setReason(event.target.value),
            isRequired: false,
        },
        {
            title: "Tags (separated by commas)",
            value: tags,
            callback: (event) => setTags(event.target.value.split(",")),
            isRequired: false,
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
                        {inputFields.map((field) => (
                            <FormControl key={field.title}>
                                <FormLabel>
                                    {field.isRequired && "* "}
                                    {field.title}
                                </FormLabel>
                                <Input
                                    mb="5"
                                    borderColor={
                                        field.isRequired && field.value === ""
                                            ? "red"
                                            : "gray"
                                    }
                                    placeholder={field.title}
                                    value={field.value}
                                    onChange={field.callback}
                                />
                            </FormControl>
                        ))}

                        <FormControl>
                            <FormLabel>* Content type</FormLabel>
                            <Select
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

                        <RadioGroup onChange={setComment} value={comment}>
                            <Stack direction="column">
                                <Radio value="I recommend this resource after having used it">
                                    I recommend this resource after having used
                                    it
                                </Radio>
                                <Radio value="I do not recommend this resource, having used it">
                                    I do not recommend this resource, having
                                    used it
                                </Radio>
                                <Radio value="I haven't used this resource but it looks promising">
                                    I haven't used this resource but it looks
                                    promising
                                </Radio>
                            </Stack>
                        </RadioGroup>

                        <Text>* Required</Text>
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
