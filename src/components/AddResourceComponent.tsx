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

export function AddResourceComponent(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                            <Input placeholder="Resource name" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Author name</FormLabel>
                            <Input placeholder="Author name" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>URL</FormLabel>
                            <Input placeholder="URL" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder="Description" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Content type</FormLabel>
                            <Input placeholder="Content type" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Build phase</FormLabel>
                            <Input placeholder="Build phase" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Comment</FormLabel>
                            <Input placeholder="Comment" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Reason for recommending</FormLabel>
                            <Input placeholder="Reason" />
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
