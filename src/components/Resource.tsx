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

export interface ResourceComponentProps {
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
}

export function ResourceComponent(props: ResourceComponentProps): JSX.Element {
    const handleAddToStudyList = () => {};

    return (
        <Accordion>
            <Card className="resource">
                <Heading>{props.resource_name}</Heading>
                <Link href={props.url} isExternal>
                    link <ExternalLinkIcon mx="1vw" />
                </Link>
                <Heading>{`added by: ${props.recommender_id}`}</Heading>
                {/* ^^this needs to be changed to get the user's name */}
                <Heading>{`by ${props.author_name}`}</Heading>
                <Text>{props.description}</Text>
                <Box>
                    <Button>👍</Button>
                    <Text>{`Likes ${props.likes_count}`}</Text>
                </Box>
                <Box>
                    <Button>👎</Button>
                    <Text>{`Dislikes ${props.dislikes_count}`}</Text>
                </Box>
                <Button
                    colorScheme="teal"
                    onClick={() => {
                        handleAddToStudyList();
                    }}
                >
                    Add to my study list
                </Button>
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
                    {`date added: ${props.date_added}`}
                    {`recommender comment: ${props.recommender_comment}`}
                    {`recommender reason: ${props.recommender_reason}`}
                    {`content type: ${props.content_type}`}
                    {`recommended for week: ${props.build_phase}`}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
