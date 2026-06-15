import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "fi-system-design")!;

export const frontendSystemDesignPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "fsd-intro",
      topicId: "fi-system-design",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Frontend System Design",
        explanation: "Frontend System Design interviews are fundamentally different from Backend ones. You are not designing load balancers or database shards. You are designing component hierarchies, client-side state architecture, data fetching strategies (pagination vs infinite scroll), and handling network unreliability. The worst thing you can do is jump straight into coding without defining the data shape.",
        interviewContext: "Always start by drawing the Component Tree and defining the State Shape (JSON) before discussing any specific framework."
      }
    },
    {
      id: "fsd-scenario-state",
      topicId: "fi-system-design",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Designing the News Feed",
        scenario: "You are asked to design a Twitter-like News Feed. How should you structure the state to store the tweets in Redux or Context?",
        options: [
          {
            id: "opt1",
            text: "An array of tweet objects: [{id: 1, text: 'Hello'}, ...]",
            isCorrect: false,
            explanation: "Arrays are bad for updating specific items. If someone likes Tweet #5432, you have to iterate through the entire array to find it and update it."
          },
          {
            id: "opt2",
            text: "Normalized data: A Map of ids to tweet objects, and a separate Array of ids for ordering.",
            isCorrect: true,
            explanation: "Correct! Normalizing state is crucial. `tweetsById: { '1': {...} }` allows instant O(1) updates when a user likes a tweet. `tweetIds: ['1', '2']` handles the ordering for rendering the list."
          },
          {
            id: "opt3",
            text: "Don't store it in global state, just keep it in the local state of the Feed component.",
            isCorrect: false,
            explanation: "For a complex app, other components (like a Notification badge or a Profile modal) might need to access or update that tweet data. It needs to be hoisted or put in a shared cache."
          }
        ]
      }
    },
    {
      id: "fsd-explain-pagination",
      topicId: "fi-system-design",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "In a Frontend System Design interview, how do you handle data fetching for a massive list (e.g., millions of items)?",
        modelAnswer: "I would implement virtualization (windowing) for rendering, so the DOM only holds the ~20 items currently visible on screen. For network fetching, I would use cursor-based pagination (Infinite Scroll) rather than offset-based pagination to avoid duplicate items if new items are inserted at the top of the feed.",
        interviewContext: "Virtualization + Cursor Pagination is the golden answer for rendering massive lists."
      }
    },
    {
      id: "fsd-complete",
      topicId: "fi-system-design",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Frontend System Design",
        topicId: "fi-system-design"
      }
    }
  ]
};
