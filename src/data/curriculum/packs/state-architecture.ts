import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "state-architecture")!;

export const stateArchitecturePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "sa-intro",
      topicId: "state-architecture",
      objectiveId: topicData.objectives[0],
      category: "learn",
      difficulty: "intermediate",
      type: "why-it-matters",
      payload: {
        topic: "State Architecture",
        explanation: "Choosing where state lives (global vs local, server vs client) is the most critical architectural decision in React. Poor state architecture leads to prop drilling, redundant re-renders, out-of-sync UI, and untestable components.",
        interviewContext: "Senior interviewers will ask you to compare Context API with Redux/Zustand, or ask how you handle caching server state (React Query vs Redux)."
      }
    },
    {
      id: "sa-mcq-context",
      topicId: "state-architecture",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "mcq",
      payload: {
        question: "When should you prefer React Context over a global state manager like Zustand or Redux?",
        options: [
          {
            id: "opt1",
            text: "When you have rapidly changing state (e.g. tracking mouse position).",
            explanation: "Incorrect. Context triggers a re-render of ALL consumers when the value changes, making it terrible for rapidly changing state.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "When you need to pass down slowly changing configuration (e.g. theme, language, auth user).",
            explanation: "Correct! Context is ideal for dependency injection and low-frequency updates. It is NOT a global state management tool for high-frequency updates.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "When you want to avoid prop drilling complex business logic.",
            explanation: "Context can avoid prop drilling, but if the business logic changes frequently, Zustand/Redux is better because they allow targeted selector subscriptions.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "sa-scenario-server",
      topicId: "state-architecture",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "advanced",
      type: "scenario",
      payload: {
        question: "Client vs Server State",
        scenario: "You are fetching a list of users from an API and storing it in a global Redux store. You need to keep it updated every 5 seconds. What is the architectural flaw?",
        options: [
          {
            id: "opt1",
            text: "Redux cannot handle setInterval correctly.",
            explanation: "Redux can handle periodic updates just fine, though it requires middleware.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "The data is Server State, not Client State. It should be managed by a caching tool like React Query or SWR.",
            explanation: "Correct! Server state is asynchronous, shared, and out of your control. Storing it in Redux forces you to manually handle loading states, caching, deduplication, and polling. Tools like React Query are specifically designed for server state.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Global stores should only hold string or boolean values, not large arrays.",
            explanation: "Global stores can hold large arrays and objects perfectly fine.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "sa-explain-zustand",
      topicId: "state-architecture",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "advanced",
      type: "explain",
      payload: {
        prompt: "How does Zustand prevent unnecessary re-renders compared to React Context?",
        modelAnswer: "Zustand uses a selector-based subscription model. When a component calls `useStore(state => state.user)`, Zustand subscribes that specific component ONLY to changes in the `user` property. If another property in the global store changes, the component does NOT re-render. React Context, on the other hand, forces every single consumer to re-render whenever the Context Provider's value object changes, regardless of which property the consumer actually needs."
      }
    },
    {
      id: "sa-complete",
      topicId: "state-architecture",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "checkpoint",
      payload: {
        topicTitle: "State Architecture",
        topicId: "state-architecture"
      }
    }
  ]
};
