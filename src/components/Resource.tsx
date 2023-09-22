import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Heading,
    Link,
    ListItem,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../config";
import { getNumOfPages } from "../utils/getNumOfPages";
import { getResources } from "../utils/getResources";
import showToast from "../utils/showToast";

export interface Resource {
    id: number;
    resource_name: string;
    author_name: string;
    url: string;
    description: string;
    content_type: string;
    build_phase: number;
    date_added: string;
    recommender_id: number;
    recommender_comment: string;
    recommender_reason: string;
    likes_count: number;
    dislikes_count: number;
    tags: string[];
    recommender_name: string;
}

export interface ResourceComponentProps {
    resource: Resource;
    userId: number;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    currentPage: number;
    setNumOfPages: React.Dispatch<React.SetStateAction<number>>;
    typedSearch: string;
    clickedTags: string[];
    listType: "browse" | "studyList";
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ResourceComponent({
    resource,
    userId,
    setResources,
    currentPage,
    setNumOfPages,
    typedSearch,
    clickedTags,
    listType,
    setLoading,
}: ResourceComponentProps): JSX.Element {
    const addToStudyList = async () => {
        if (userId === 0) {
            showToast(
                "Not logged in!",
                "Log in to access your study list",
                "error"
            );
            return;
        }
        try {
            const response = await axios.post(
                `${baseURL}/study_list/${userId}/${resource.id}`
            );
            if (response.data.success) {
                showToast("Done!", response.data.message, "success");
            } else {
                showToast("Duplicate!", response.data.message, "error");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteFromStudyList = async () => {
        await axios.delete(`${baseURL}/study_list/${userId}/${resource.id}`);
        showToast("Done!", "Removed from your study list", "success");
        getNumOfPages(
            setNumOfPages,
            typedSearch,
            clickedTags,
            listType === "browse" ? 0 : userId
        );
        getResources(
            setResources,
            currentPage,
            typedSearch,
            clickedTags,
            listType === "browse" ? 0 : userId,
            setLoading
        );
    };

    const likeResource = async () => {
        if (userId === 0) {
            showToast("Not logged in!", "Log in to vote on resources", "error");
            return;
        }

        await axios.put(`${baseURL}/resources/like/${resource.id}`);

        getResources(
            setResources,
            currentPage,
            typedSearch,
            clickedTags,
            listType === "browse" ? 0 : userId,
            setLoading
        );
    };
    const dislikeResource = async () => {
        if (userId === 0) {
            showToast("Not logged in!", "Log in to vote on resources", "error");
            return;
        }

        await axios.put(`${baseURL}/resources/dislike/${resource.id}`);
        getResources(
            setResources,
            currentPage,
            typedSearch,
            clickedTags,
            listType === "browse" ? 0 : userId,
            setLoading
        );
    };

    return (
        <Accordion allowMultiple className="resource-card">
            <div className="resource">
                <Heading size={"lg"} className="resource-title">
                    {resource.resource_name}
                </Heading>
                <div className="resource-info">
                    <div className="r-header">
                        <Link href={resource.url} isExternal>
                            link <ExternalLinkIcon mx="1vw" />
                        </Link>
                        <Heading
                            size={"md"}
                        >{`added by: ${resource.recommender_name}`}</Heading>
                    </div>
                    <Heading
                        size={"md"}
                    >{`by ${resource.author_name}`}</Heading>
                    <Text className="description">{resource.description}</Text>
                </div>
                <Box className="buttons-box">
                    <Box className="likes">
                        <Button
                            onClick={() => {
                                likeResource();
                            }}
                        >
                            👍
                        </Button>
                        <Text
                            marginLeft={"0.5vw"}
                        >{`Likes ${resource.likes_count}`}</Text>
                    </Box>
                    <Box className="dislikes">
                        <Button
                            onClick={() => {
                                dislikeResource();
                            }}
                        >
                            👎
                        </Button>
                        <Text
                            marginLeft={"0.5vw"}
                        >{`Dislikes ${resource.dislikes_count}`}</Text>
                    </Box>
                    {listType === "browse" ? (
                        <Button
                            colorScheme="teal"
                            onClick={() => {
                                addToStudyList();
                            }}
                        >
                            Add to my study list
                        </Button>
                    ) : (
                        <Button
                            colorScheme="pink"
                            onClick={() => {
                                deleteFromStudyList();
                            }}
                        >
                            Remove from my study list
                        </Button>
                    )}
                </Box>
                <div className="tags">
                    {resource.tags.map((tag, index) => (
                        <Button key={index}>{tag}</Button>
                    ))}
                </div>
            </div>
            <AccordionItem className="expand">
                <AccordionButton>
                    <Box background={"white"}>Expand</Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <UnorderedList>
                        <ListItem>{`date added: ${resource.date_added.slice(
                            0,
                            10
                        )}`}</ListItem>
                        <ListItem>{`recommender comment: ${resource.recommender_comment}`}</ListItem>
                        <ListItem>{`recommender reason: ${resource.recommender_reason}`}</ListItem>
                        <ListItem>{`content listType: ${resource.content_type}`}</ListItem>
                        {resource.build_phase && (
                            <ListItem>{`recommended for week ${resource.build_phase}`}</ListItem>
                        )}
                    </UnorderedList>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
