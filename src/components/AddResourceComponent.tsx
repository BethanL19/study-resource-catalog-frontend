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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { baseURL } from "../config";

export function AddResourceComponent(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [resourceName, setResourceName] = useState<string>("");
    const [authorName, setAuthorName] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [contentType, setContentType] = useState<string>("");
    const [buildPhase, setBuildPhase] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [reason, setReason] = useState<string>("");
    console.log(resourceName, authorName);

    const toast = useToast();

    const handleSubmit = async () => {
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
            console.log(response.data);
            onClose();

            toast({
                title: "Resource added.",
                description: "Your resource has been submitted.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="green">
                + Add resource
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Please fill all the fields</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Resource name</FormLabel>
                            <Input
                                placeholder="Resource name"
                                value={resourceName}
                                onChange={(event) =>
                                    setResourceName(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Author name</FormLabel>
                            <Input
                                placeholder="Author name"
                                value={authorName}
                                onChange={(event) =>
                                    setAuthorName(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>URL</FormLabel>
                            <Input
                                placeholder="URL"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input
                                placeholder="Description"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Content type</FormLabel>
                            <Input
                                placeholder="Content type"
                                value={contentType}
                                onChange={(event) =>
                                    setContentType(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Build phase</FormLabel>
                            <Input
                                placeholder="Build phase"
                                value={buildPhase}
                                onChange={(event) =>
                                    setBuildPhase(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Comment</FormLabel>
                            <Input
                                placeholder="Comment"
                                value={comment}
                                onChange={(event) =>
                                    setComment(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Reason for recommending</FormLabel>
                            <Input
                                placeholder="Reason"
                                value={reason}
                                onChange={(event) =>
                                    setReason(event.target.value)
                                }
                            />
                        </FormControl>
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
