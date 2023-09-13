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
import { useState } from "react";
import { getResources } from "../utils/getResources";

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
}

export interface ResourceComponentProps {
    resource: Resource;
    tags: string[];
    user_id: number;
    showResourcesPage: boolean;
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export function ResourceComponent(props: ResourceComponentProps): JSX.Element {
    const [recName, setRecName] = useState("");
    const addToStudyList = async () => {
        await axios.post(
            `${baseURL}/study_list/${props.user_id}/${props.resource.id}`
        );
    };
    const deleteFromStudyList = async () => {
        await axios.delete(
            `${baseURL}/study_list/${props.user_id}/${props.resource.id}`
        );
    };
    const likeResource = async () => {
        await axios.put(`${baseURL}/resources/like/${props.resource.id}`);
        getResources(props.setResources);
    };
    const dislikeResource = async () => {
        await axios.put(`${baseURL}/resources/dislike/${props.resource.id}`);
        getResources(props.setResources);
    };
    const getName = async () => {
        const response = await axios.get(
            `${baseURL}/user/${props.resource.id}`
        );
        setRecName(response.data[0].name);
    };
    getName();
    return (
        <Accordion allowMultiple border={"0.15vw"} borderColor={"teal"}>
            <div className="resource">
                <div className="resource-info">
                    <div className="r-header">
                        <Heading size={"lg"}>
                            {props.resource.resource_name}
                        </Heading>
                        <Link href={props.resource.url} isExternal>
                            link <ExternalLinkIcon mx="1vw" />
                        </Link>
                        <Heading size={"md"}>{`added by: ${recName}`}</Heading>
                    </div>
                    <Heading
                        size={"md"}
                    >{`by ${props.resource.author_name}`}</Heading>
                    <Text>{props.resource.description}</Text>
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
                        <Text>{`Likes ${props.resource.likes_count}`}</Text>
                    </Box>
                    <Box className="dislikes">
                        <Button
                            onClick={() => {
                                dislikeResource();
                            }}
                        >
                            👎
                        </Button>
                        <Text>{`Dislikes ${props.resource.dislikes_count}`}</Text>
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
                    {props.tags.map((tag, index) => (
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
