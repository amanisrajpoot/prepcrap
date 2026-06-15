import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "browser-storage")!;

export const browserStoragePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "bst-intro",
      topicId: "browser-storage",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "Storage & Web APIs",
        explanation: "Where you store data in the browser dictates the security and performance of your entire app. localStorage is easy but synchronous (blocking). Cookies are small but sent on every request. IndexedDB is powerful but has a notoriously complex async API. Knowing when to use which is critical for frontend architecture.",
        interviewContext: "Expect questions comparing localStorage vs Cookies for authentication."
      }
    },
    {
      id: "bst-scenario-auth",
      topicId: "browser-storage",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Where to Store the JWT",
        scenario: "You are building a React application. The backend returns a JWT upon login. Where is the most secure place to store it?",
        options: [
          {
            id: "opt1",
            text: "localStorage",
            isCorrect: false,
            explanation: "localStorage is vulnerable to XSS. Any malicious script on the page can read it."
          },
          {
            id: "opt2",
            text: "sessionStorage",
            isCorrect: false,
            explanation: "sessionStorage is cleared when the tab closes, and is still vulnerable to XSS."
          },
          {
            id: "opt3",
            text: "An HttpOnly, Secure Cookie",
            isCorrect: true,
            explanation: "Correct! By setting the cookie as HttpOnly, JavaScript cannot read it (preventing XSS). By setting it as Secure, it is only sent over HTTPS. The browser automatically handles attaching it to subsequent requests."
          }
        ]
      }
    },
    {
      id: "bst-explain-indexeddb",
      topicId: "browser-storage",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Why would you choose IndexedDB over localStorage?",
        modelAnswer: "1. Capacity: localStorage is limited to ~5MB, while IndexedDB can store gigabytes of data.\n2. Performance: localStorage is strictly synchronous and blocks the main UI thread. IndexedDB is asynchronous.\n3. Data Types: localStorage only stores strings, requiring JSON.parse/stringify. IndexedDB can store complex objects, Files, and Blobs natively.",
        interviewContext: "IndexedDB is the correct answer for 'Offline-First' apps or caching large datasets."
      }
    },
    {
      id: "bst-complete",
      topicId: "browser-storage",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Storage & Web APIs",
        topicId: "browser-storage"
      }
    }
  ]
};
