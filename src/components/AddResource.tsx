import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { baseURL } from "../config";
import { getResources } from "../utils/getResources";
import { Resource } from "./Resource";
import showToast from "../utils/showToast";
import { sendDiscordNotification } from "../utils/sendDiscordNotification";
import { Tag } from "./Searchables";
import isRequiredEmpty from "../utils/isRequiredEmpty";
import FormFields from "./FormFields";

interface AddResourceProps {
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    userId: number;
}

export type IResource = {
    resource_name: string;
    author_name: string;
    url: string;
    description: string;
    content_type: string;
    build_phase: string;
    recommender_id: string;
    recommender_comment: string;
    recommender_reason: string;
    tags: string[];
};

export type Action =
    | {
          type: "update";
          payload: {
              key: string;
              value: string | string[];
          };
      }
    | { type: "reset" };

export interface TagOption {
    value: string;
    label: string;
}

export function AddResource({
    setResources,
    userId,
}: AddResourceProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tagsOptions, setTagsOptions] = useState<TagOption[]>([]);

    const getTagOptions = async () => {
        const response = await axios.get(`${baseURL}/tags`);
        const tagOptions = response.data.map((t: Tag) => ({
            value: t.tag,
            label: t.tag,
        }));
        setTagsOptions(tagOptions);
    };

    useEffect(() => {
        getTagOptions();
    }, []);

    const initialState = {
        resource_name: "",
        author_name: "",
        url: "",
        description: "",
        content_type: "",
        build_phase: "",
        recommender_id: "",
        recommender_comment: "I recommend this resource after having used it",
        recommender_reason: "",
        tags: [],
    };

    const reducer = (state: IResource, action: Action) => {
        switch (action.type) {
            case "update":
                return {
                    ...state,
                    [action.payload.key]: action.payload.value,
                };
            case "reset":
                return initialState;
            default:
                throw new Error(`Unknown action type`);
        }
    };

    const [resource, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: "update",
            payload: {
                key: "recommender_id",
                value: userId.toString(),
            },
        });
    }, [userId]);

    const handleAddResourceClick = () => {
        if (userId === 0) {
            showToast("Not logged in!", "Log in to add resources", "error");
            return;
        }
        onOpen();
    };

    const handleSubmit = async () => {
        if (isRequiredEmpty(resource)) {
            showToast(
                "Empty fields",
                "Please make sure you populate all the required fields",
                "warning"
            );
            return;
        }
        try {
            await axios.post(`${baseURL}/resources/new`, resource);

            onClose();
            showToast(
                "Resource added.",
                "Your resource has been submitted.",
                "success"
            );
            await sendDiscordNotification(resource.resource_name, resource.url);

            dispatch({ type: "reset" });

            getResources(setResources);
        } catch (error) {
            console.error(error);
            interface ServerError {
                response: {
                    data: {
                        code: string;
                    };
                };
            }
            const serverError: ServerError = error as ServerError;
            const errorCode = serverError.response.data.code;
            if (errorCode === "23505") {
                // This code means a violation of the unique key constraint on the url column,
                // which means this resource has already been added.
                showToast(
                    "Duplicate resource",
                    "The URL you have provided already exists.",
                    "error"
                );
            }
        }
    };

    return (
        <>
            <Button onClick={handleAddResourceClick} colorScheme="green">
                + Add resource
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new resource</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormFields
                            dispatch={dispatch}
                            resource={resource}
                            tagsOptions={tagsOptions}
                        />

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
