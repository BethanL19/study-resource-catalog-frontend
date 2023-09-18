import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Heading,
    Button,
    Link,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";
import { baseURL } from "../config";
import axios from "axios";
import { getResources } from "../utils/getResources";
import { getStudyList } from "../utils/getStudyList";
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
    user_id: number;
    showResourcesPage: boolean;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function ResourceComponent(props: ResourceComponentProps): JSX.Element {
    const addToStudyList = async () => {
        if (props.user_id === 0) {
            showToast(
                "Not logged in!",
                "Log in to access your study list",
                "error"
            );
            return;
        }

        await axios.post(
            `${baseURL}/study_list/${props.user_id}/${props.resource.id}`
        );
        showToast("Done!", "Added to your study list", "success");
    };
    const deleteFromStudyList = async () => {
        await axios.delete(
            `${baseURL}/study_list/${props.user_id}/${props.resource.id}`
        );
        showToast("Done!", "Removed from your study list", "success");
        getStudyList(props.setResources, props.user_id);
    };

    const likeResource = async () => {
        if (props.user_id === 0) {
            showToast("Not logged in!", "Log in to vote on resources", "error");
            return;
        }

        await axios.put(`${baseURL}/resources/like/${props.resource.id}`);
        if (props.showResourcesPage) {
            getResources(props.setResources);
        } else {
            getStudyList(props.setResources, props.user_id);
        }
    };
    const dislikeResource = async () => {
        if (props.user_id === 0) {
            showToast("Not logged in!", "Log in to vote on resources", "error");
            return;
        }

        await axios.put(`${baseURL}/resources/dislike/${props.resource.id}`);
        if (props.showResourcesPage) {
            getResources(props.setResources);
        } else {
            getStudyList(props.setResources, props.user_id);
        }
    };

    return (
        <Accordion allowMultiple className="resource-card">
            <div className="resource">
                <Heading size={"lg"} className="resource-title">
                    {props.resource.resource_name}
                </Heading>
                <div className="resource-info">
                    <div className="r-header">
                        <Link href={props.resource.url} isExternal>
                            link <ExternalLinkIcon mx="1vw" />
                        </Link>
                        <Heading
                            size={"md"}
                        >{`added by: ${props.resource.recommender_name}`}</Heading>
                    </div>
                    <Heading
                        size={"md"}
                    >{`by ${props.resource.author_name}`}</Heading>
                    <Text className="description">
                        {props.resource.description}
                    </Text>
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
                        >{`Likes ${props.resource.likes_count}`}</Text>
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
                        >{`Dislikes ${props.resource.dislikes_count}`}</Text>
                    </Box>
                    {props.showResourcesPage ? (
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
                    {props.resource.tags.map((tag, index) => (
                        <Button key={index}>{tag}</Button>
                    ))}
                </div>
            </div>
            <AccordionItem className="expand">
                <AccordionButton>
                    <Box>Expand</Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <UnorderedList>
                        <ListItem>{`date added: ${props.resource.date_added.slice(
                            0,
                            10
                        )}`}</ListItem>
                        <ListItem>{`recommender comment: ${props.resource.recommender_comment}`}</ListItem>
                        <ListItem>{`recommender reason: ${props.resource.recommender_reason}`}</ListItem>
                        <ListItem>{`content type: ${props.resource.content_type}`}</ListItem>
                        <ListItem>{`recommended for week ${props.resource.build_phase}`}</ListItem>
                    </UnorderedList>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
