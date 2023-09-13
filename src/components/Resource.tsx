import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Card,
    Heading,
    Button,
    Link,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
} from "@chakra-ui/react";
import { baseURL } from "../config";
import axios from "axios";

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
}

export function ResourceComponent(props: ResourceComponentProps): JSX.Element {
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
    };
    const dislikeResource = async () => {
        await axios.put(`${baseURL}/resources/dislike/${props.resource.id}`);
    };
    return (
        <Accordion>
            <Card className="resource">
                <Heading>{props.resource.resource_name}</Heading>
                <Link href={props.resource.url} isExternal>
                    link <ExternalLinkIcon mx="1vw" />
                </Link>
                <Heading>{`added by: ${props.resource.recommender_id}`}</Heading>
                {/* ^^this needs to be changed to get the user's name */}
                <Heading>{`by ${props.resource.author_name}`}</Heading>
                <Text>{props.resource.description}</Text>
                <Box>
                    <Button
                        onClick={() => {
                            likeResource();
                        }}
                    >
                        👍
                    </Button>
                    <Text>{`Likes ${props.resource.likes_count}`}</Text>
                </Box>
                <Box>
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
                <div className="tags">
                    {props.tags.map((tag, index) => (
                        <Button key={index}>{tag}</Button>
                    ))}
                </div>
            </Card>
            <AccordionItem>
                <AccordionButton>
                    <Box>Expand</Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    {`date added: ${props.resource.date_added}`}
                    {`recommender comment: ${props.resource.recommender_comment}`}
                    {`recommender reason: ${props.resource.recommender_reason}`}
                    {`content type: ${props.resource.content_type}`}
                    {`recommended for week: ${props.resource.build_phase}`}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
