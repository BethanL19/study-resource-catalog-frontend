import { searchResources } from "../../src/utils/searchResources";

const allResources = [
    {
        id: 98,
        resource_name: "MDN docs",
        author_name: "Mozilla",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        description: "everyone should know mdn",
        content_type: "reference",
        build_phase: 1,
        date_added: "2023-09-18T08:32:46.806Z",
        recommender_id: 2,
        recommender_comment: "I recommend this resource after having used it",
        recommender_reason: "",
        likes_count: 0,
        dislikes_count: 0,
        tags: ["javascript", "html"],
        recommender_name: "Tomasz",
    },
    {
        id: 97,
        resource_name: "React native",
        author_name: "Programming with Mosh",
        url: "https://www.youtube.com/watch?v=0-S5a0eXPoc&list=PLTjRvDozrdlxzQet01qZBt-sRG8bbDggv",
        description: "react native yt course",
        content_type: "video",
        build_phase: 99,
        date_added: "2023-09-18T08:18:45.185Z",
        recommender_id: 2,
        recommender_comment:
            "I haven't used this resource but it looks promising",
        recommender_reason: "",
        likes_count: 0,
        dislikes_count: 0,
        tags: ["ReactNatvie"],
        recommender_name: "Tomasz",
    },
    {
        id: 96,
        resource_name: "Typescript ",
        author_name: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=30LWjhZzg50",
        description: "typescript tutorial",
        content_type: "video",
        build_phase: 1,
        date_added: "2023-09-18T08:14:47.800Z",
        recommender_id: 2,
        recommender_comment:
            "I haven't used this resource but it looks promising",
        recommender_reason: "",
        likes_count: 0,
        dislikes_count: 0,
        tags: ["TypeScript"],
        recommender_name: "Tomasz",
    },
    {
        id: 95,
        resource_name: "JavaScript course",
        author_name: "Mosh Hamedani",
        url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        description: "javascript yt course",
        content_type: "video",
        build_phase: 1,
        date_added: "2023-09-18T08:00:06.296Z",
        recommender_id: 2,
        recommender_comment: "I recommend this resource after having used it",
        recommender_reason: "",
        likes_count: 0,
        dislikes_count: 0,
        tags: ["JavaScript"],
        recommender_name: "Tomasz",
    },
    {
        id: 1,
        resource_name: "useReducer video tutorial",
        author_name: "Web Dev Simplified",
        url: "https://www.youtube.com/watch?v=kK_Wqx3RnHk",
        description:
            "In this video I cover everything you need to know about the useReducer hook. I go over all the main use cases for useReducer as well as many common mistakes that developers make. This is part of a series of React videos where I cover all the important hooks in React.",
        content_type: "video",
        build_phase: 12,
        date_added: "2023-09-12T11:44:22.863Z",
        recommender_id: 10,
        recommender_comment: "I recommend this resource after having used it.",
        recommender_reason:
            "This YTer has some nice tutorials on React and I found his useReducer one (with the article in description) helped me get to grips with it.",
        likes_count: 6,
        dislikes_count: 1,
        tags: ["React", "Typescript"],
        recommender_name: "Tom",
    },
];

const filteredResources = [
    {
        id: 98,
        resource_name: "MDN docs",
        author_name: "Mozilla",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        description: "everyone should know mdn",
        content_type: "reference",
        build_phase: 1,
        date_added: "2023-09-18T08:32:46.806Z",
        recommender_id: 2,
        recommender_comment: "I recommend this resource after having used it",
        recommender_reason: "",
        likes_count: 0,
        dislikes_count: 0,
        tags: ["javascript", "html"],
        recommender_name: "Tomasz",
    },
    {
        id: 96,
        resource_name: "Typescript ",
        author_name: "freeCodeCamp",
        url: "https://www.youtube.com/watch?v=30LWjhZzg50",
        description: "typescript tutorial",
        content_type: "video",
        build_phase: 1,
        date_added: "2023-09-18T08:14:47.800Z",
        recommender_id: 2,
        recommender_comment:
            "I haven't used this resource but it looks promising",
        recommender_reason: "",
        likes_count: 0,
        dislikes_count: 0,
        tags: ["TypeScript"],
        recommender_name: "Tomasz",
    },
    {
        id: 95,
        resource_name: "JavaScript course",
        author_name: "Mosh Hamedani",
        url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        description: "javascript yt course",
        content_type: "video",
        build_phase: 1,
        date_added: "2023-09-18T08:00:06.296Z",
        recommender_id: 2,
        recommender_comment: "I recommend this resource after having used it",
        recommender_reason: "",
        likes_count: 0,
        dislikes_count: 0,
        tags: ["JavaScript"],
        recommender_name: "Tomasz",
    },
    {
        id: 1,
        resource_name: "useReducer video tutorial",
        author_name: "Web Dev Simplified",
        url: "https://www.youtube.com/watch?v=kK_Wqx3RnHk",
        description:
            "In this video I cover everything you need to know about the useReducer hook. I go over all the main use cases for useReducer as well as many common mistakes that developers make. This is part of a series of React videos where I cover all the important hooks in React.",
        content_type: "video",
        build_phase: 12,
        date_added: "2023-09-12T11:44:22.863Z",
        recommender_id: 10,
        recommender_comment: "I recommend this resource after having used it.",
        recommender_reason:
            "This YTer has some nice tutorials on React and I found his useReducer one (with the article in description) helped me get to grips with it.",
        likes_count: 6,
        dislikes_count: 1,
        tags: ["React", "Typescript"],
        recommender_name: "Tom",
    },
];

it("Filters by resource name, description, author name, and tags", () => {
    expect(searchResources("SCRIPT", allResources)).deep.equal(
        filteredResources
    );
});
