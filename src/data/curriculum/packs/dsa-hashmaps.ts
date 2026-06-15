import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "dsa-hashmaps")!;

export const dsaHashmapsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "dh-intro",
      topicId: "dsa-hashmaps",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "Hash Maps & Time Complexity",
        explanation: "Hash Maps (Objects/Maps in JS) are the ultimate cheat code in software engineering. They allow you to trade Space (memory) for Time (CPU speed). By storing data in a Map where the key is the ID, you get O(1) instant lookups instead of O(N) array scans. Almost every nested loop performance bug in production can be fixed by replacing the inner loop with a Hash Map lookup.",
        interviewContext: "When you hear 'lookup', 'dictionary', or 'caching' in an interview, say 'Hash Map'."
      }
    },
    {
      id: "dh-scenario-lookup",
      topicId: "dsa-hashmaps",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "The N+1 Lookup Problem",
        scenario: "You have an array of 1,000 `posts` and an array of 10,000 `users`. You need to attach the correct user object to each post based on `post.userId`. A junior dev uses `users.find(u => u.id === post.userId)` inside a `.map()` loop over the posts.",
        options: [
          {
            id: "opt1",
            text: "This is fine, .find() is highly optimized by the V8 engine.",
            isCorrect: false,
            explanation: "No! `find()` is still an O(N) operation. Calling it inside a loop of size M creates an O(N * M) algorithm. 1,000 * 10,000 = 10 million operations."
          },
          {
            id: "opt2",
            text: "First, convert the users array into a Map: `const userMap = new Map(users.map(u => [u.id, u]))`. Then use `userMap.get(post.userId)` inside the loop.",
            isCorrect: true,
            explanation: "Correct! Creating the map takes O(N) time once. Then the lookup inside the loop takes O(1) instant time. The total time becomes O(N + M) instead of O(N * M)."
          },
          {
            id: "opt3",
            text: "Use a SQL JOIN instead.",
            isCorrect: false,
            explanation: "While doing it in the database is often better, in Frontend or Node.js memory manipulation, you must know how to do this efficiently using a Map."
          }
        ]
      }
    },
    {
      id: "dh-explain-map-vs-object",
      topicId: "dsa-hashmaps",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "In JavaScript, what is the advantage of using the `Map` object over a standard plain `{}` Object as a dictionary?",
        modelAnswer: "1. Key types: Objects only allow Strings and Symbols as keys. Maps allow ANY data type (even other objects or functions) as keys.\n2. Iteration: Maps are iterable natively (maintaining insertion order) and have a built-in `.size` property.\n3. Prototype pollution: Objects inherit properties from `Object.prototype` (like `toString`), which can cause bugs if a user inputs a key named 'toString'. Maps are completely clean dictionaries.",
        interviewContext: "Mentioning Prototype Pollution or key-type flexibility shows deep JS knowledge."
      }
    },
    {
      id: "dh-complete",
      topicId: "dsa-hashmaps",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Hash Maps",
        topicId: "dsa-hashmaps"
      }
    }
  ]
};
