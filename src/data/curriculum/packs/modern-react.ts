import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "modern-react")!;

export const modernReactPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "mr-intro",
      topicId: "modern-react",
      objectiveId: topicData.objectives[0],
      category: "learn",
      difficulty: "intermediate",
      type: "why-it-matters",
      payload: {
        topic: "Modern React (18 & 19+)",
        explanation: "React has evolved from a simple client-side rendering library to a full-stack architecture. With React 18's concurrent features and automatic batching, and React 19's Server Components and Compiler, the mental model for building React apps has drastically shifted.",
        interviewContext: "Senior interviews now test if you are up-to-date. If you describe React 17 rendering behavior or fail to understand the boundary between Server and Client components, you will quickly reveal that your knowledge is outdated."
      }
    },
    {
      id: "mr-predict-batching",
      topicId: "modern-react",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "predict-next-line",
      payload: {
        question: "Automatic Batching (React 18+)",
        template: `function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  console.log("Rendered!");

  function handleClick() {
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
    }, 1000);
  }

  return <button onClick={handleClick}>Click</button>;
}

// User clicks the button once.
// In React 18+, how many times will "Rendered!" log to the console?
{{blank}}`,
        options: [
          {
            id: "opt1",
            code: `Three times (Initial, then once for setCount, once for setFlag)`,
            isCorrect: false,
            explanation: "Incorrect. This was the behavior in React 17! Before React 18, state updates inside promises, timeouts, or native event handlers were NOT batched."
          },
          {
            id: "opt2",
            code: `Two times (Initial, then one batched update)`,
            isCorrect: true,
            explanation: "Correct! React 18 introduced Automatic Batching. State updates inside timeouts, promises, and native event handlers are now automatically batched into a single re-render, just like standard React event handlers."
          },
          {
            id: "opt3",
            code: `One time (Initial only)`,
            isCorrect: false,
            explanation: "Incorrect. The state does update, triggering a re-render."
          }
        ]
      }
    },
    {
      id: "mr-debug-rsc-hook",
      topicId: "modern-react",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "This Next.js App Router component throws a server error. Find the bug.",
        code: [
          "import { useState } from 'react';",
          "",
          "export default async function UserDashboard({ userId }) {",
          "  const [isOpen, setIsOpen] = useState(false);",
          "  const user = await db.query.users.findFirst({ id: userId });",
          "",
          "  return (",
          "    <div>",
          "      <h1>{user.name}</h1>",
          "      <button onClick={() => setIsOpen(true)}>Open</button>",
          "    </div>",
          "  );",
          "}"
        ],
        bugLineIndex: 3,
        explanation: "React Server Components (the default in App Router) run exclusively on the server. They cannot hold state, use lifecycle hooks (useState, useEffect), or attach event listeners (onClick). You must move the interactive button into a separate Client Component, or add 'use client' at the top of the file (though doing so would break the database call!)."
      }
    },
    {
      id: "mr-debug-rsc-props",
      topicId: "modern-react",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "This throws: 'Error: Functions cannot be passed directly to Client Components'. Why?",
        code: [
          "// Server Component",
          "import { ClientForm } from './ClientForm';",
          "",
          "export default function Page() {",
          "  const handleSave = () => console.log('Saved');",
          "  ",
          "  return <ClientForm onSave={handleSave} />;",
          "}"
        ],
        bugLineIndex: 6,
        explanation: "There is a strict serialization boundary between Server Components and Client Components. You cannot pass complex, non-serializable JavaScript objects (like functions) from the server to the client. You can only pass serializable data (strings, numbers, simple objects) or use Server Actions to pass executable backend code to the client."
      }
    },
    {
      id: "mr-scenario-useclient",
      topicId: "modern-react",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "scenario",
      payload: {
        question: "Architecting the Boundary",
        scenario: "You are building a blog post page. The post content is huge markdown data fetched from a database. At the very bottom of the post, there is a small 'Like' button that needs to track clicks. How do you architect this?",
        options: [
          {
            id: "opt1",
            text: "Make the entire Page a Client Component using 'use client'.",
            explanation: "Bad practice. This would force the entire massive markdown payload to be hydrated on the client, hurting performance and TTI (Time to Interactive).",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Keep the Page as a Server Component, and extract the Like button into a separate Client Component.",
            explanation: "Correct! Keep the heavy data fetching and rendering on the server (Server Component). Only extract the tiny interactive element (the Like button) into its own Client Component with 'use client'. This pushes the boundary as far down the tree as possible.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Use 'use server' on the Like button.",
            explanation: "'use server' is for defining Server Actions (backend mutations), not for adding interactivity to UI elements.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "mr-implementation-useclient",
      topicId: "modern-react",
      objectiveId: topicData.objectives[0],
      category: "implementation",
      difficulty: "intermediate",
      type: "code-completion",
      payload: {
        prompt: "Fix this component so that it can utilize React hooks and browser APIs in modern React frameworks (like Next.js App Router).",
        template: `{{blank}}

import { useState } from 'react';

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
        answers: [
          { "blank": "\"use client\";" },
          { "blank": "'use client';" }
        ],
        explanation: "The 'use client' directive marks the boundary between the server and the client. Any file with this directive at the top tells the bundler to include it (and its imports) in the client-side JavaScript bundle, allowing interactivity."
      }
    },
    {
      id: "mr-explain-compiler",
      topicId: "modern-react",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "explain",
      payload: {
        prompt: "Why does the React Compiler (React 19) reduce the need for manual useMemo and useCallback hooks?",
        modelAnswer: "The React Compiler acts as an optimizing build step. It automatically analyzes your component graph during build time and infers which values and functions are stable. It then injects memoization automatically under the hood, meaning you no longer have to clutter your code with useMemo and useCallback to prevent unnecessary re-renders."
      }
    },
    {
      id: "mr-complete",
      topicId: "modern-react",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "checkpoint",
      payload: {
        topicTitle: "Modern React",
        topicId: "modern-react"
      }
    }
  ]
};
