import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";

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
                                onChange={(event) =>
                                    setResourceName(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Author name</FormLabel>
                            <Input
                                placeholder="Author name"
                                onChange={(event) =>
                                    setAuthorName(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>URL</FormLabel>
                            <Input
                                placeholder="URL"
                                onChange={(event) => setUrl(event.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input
                                placeholder="Description"
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Content type</FormLabel>
                            <Input
                                placeholder="Content type"
                                onChange={(event) =>
                                    setContentType(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Build phase</FormLabel>
                            <Input
                                placeholder="Build phase"
                                onChange={(event) =>
                                    setBuildPhase(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Comment</FormLabel>
                            <Input
                                placeholder="Comment"
                                onChange={(event) =>
                                    setComment(event.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Reason for recommending</FormLabel>
                            <Input
                                placeholder="Reason"
                                onChange={(event) =>
                                    setReason(event.target.value)
                                }
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
