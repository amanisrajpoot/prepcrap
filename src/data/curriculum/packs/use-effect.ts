import { TopicPack } from "@/types/curriculum";

export const UseEffectPack: TopicPack = {
  topic: {
    id: "use-effect",
    moduleId: "react-rendering",
    trackId: "react",
    title: "useEffect Deep Dive",
    order: 2,
    metadata: { difficulty: "intermediate", estimatedMinutes: 60, interviewFrequency: 10, importance: 10 },
    objectives: [
      "Understand synchronization vs lifecycles",
      "Manage dependency arrays correctly",
      "Handle cleanup functions"
    ]
  },
  activities: [
    {
      id: "ue-why",
      topicId: "use-effect",
      objectiveId: "Understand synchronization vs lifecycles",
      category: "learn",
      type: "why-it-matters",
      difficulty: "foundation",
      payload: {
        topic: "useEffect",
        explanation: "Most developers think of useEffect as `componentDidMount`. This is a fundamentally flawed mental model. `useEffect` is about synchronizing your React state with external systems (like APIs, DOM, or subscriptions).",
        interviewContext: "Interviewers will ask you to identify infinite loops and memory leaks caused by incorrect dependency arrays or missing cleanup functions."
      }
    },
    {
      id: "ue-scenario",
      topicId: "use-effect",
      objectiveId: "Understand synchronization vs lifecycles",
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        scenario: "You need to fetch user data when the component mounts, but the `userId` is passed as a prop.",
        question: "How should you approach the dependency array?",
        options: [
          { id: "a", text: "Pass an empty array `[]` so it only fetches once.", isCorrect: false, explanation: "If the `userId` prop changes, your component won't fetch the new user's data. You have introduced a bug." },
          { id: "b", text: "Pass `[userId]`.", isCorrect: true, explanation: "Correct! The effect synchronizes the fetch with the `userId`. If the ID changes, it re-synchronizes." },
          { id: "c", text: "Omit the dependency array.", isCorrect: false, explanation: "This will fetch on every single render, likely causing an infinite loop and DDOSing your API." }
        ]
      }
    },
    {
      id: "ue-debug",
      topicId: "use-effect",
      objectiveId: "Handle cleanup functions",
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
        question: "This chat component subscribes to a channel. But users report getting duplicate messages when they switch channels. Find the bug.",
        code: `useEffect(() => {
  const connection = chatAPI.subscribe(channelId);
  connection.onMessage(msg => setMessages(prev => [...prev, msg]));
  // ...
}, [channelId]);`,
        bugLineIndex: 3,
        explanation: "There is no cleanup function! When `channelId` changes, the effect runs again and creates a *second* subscription. The first one is still active. You must return a cleanup function: `return () => connection.unsubscribe();`"
      }
    }
  ]
};
