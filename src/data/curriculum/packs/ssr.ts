import { TopicPack } from "@/types/curriculum";

export const ssrPack: TopicPack = {
  topic: {
    id: "ssr",
    moduleId: "generated", // Update manually
    trackId: "javascript", // Update manually
    title: "Next.js Server-Side Rendering (SSR)",
    order: 1,
    metadata: {
      difficulty: "advanced",
      estimatedMinutes: 30,
      interviewFrequency: 9,
      importance: 10,
      prerequisites: ["react","node"]
    },
    objectives: [
    "Differentiate between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)",
    "Explain the concept of Hydration",
    "Identify when to use SSR vs Static Site Generation (SSG)",
    "Debug hydration mismatch errors"
]
  },
  activities: [
    {
      id: "ssr-act-0",
      topicId: "ssr",
      objectiveId: "Differentiate between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)",
      category: "practice",
      type: "progressive-match",
      difficulty: "intermediate",
      payload: {
      "prompt": "Match the rendering strategy to its description",
      "terms": [
            {
                  "id": "t1",
                  "text": "CSR (Client-Side Rendering)",
                  "definitionId": "d1"
            },
            {
                  "id": "t2",
                  "text": "SSR (Server-Side Rendering)",
                  "definitionId": "d2"
            },
            {
                  "id": "t3",
                  "text": "SSG (Static Site Generation)",
                  "definitionId": "d3"
            }
      ],
      "definitions": [
            {
                  "id": "d1",
                  "text": "Browser receives a blank HTML file and renders UI via JavaScript execution."
            },
            {
                  "id": "d2",
                  "text": "HTML is generated dynamically on the server for each incoming request."
            },
            {
                  "id": "d3",
                  "text": "HTML is generated once at build time and served via CDN."
            }
      ]
}
    },
    {
      id: "ssr-act-1",
      topicId: "ssr",
      objectiveId: "Explain the concept of Hydration",
      category: "practice",
      type: "tap-order",
      difficulty: "advanced",
      payload: {
      "prompt": "Order the steps of a Next.js SSR request",
      "items": [
            {
                  "id": "req",
                  "text": "Client requests a page"
            },
            {
                  "id": "server",
                  "text": "Server fetches data and renders React components to HTML string"
            },
            {
                  "id": "html",
                  "text": "Browser displays the non-interactive HTML immediately"
            },
            {
                  "id": "hydrate",
                  "text": "React downloads JS bundle, attaches event listeners (Hydration)"
            }
      ],
      "correctOrder": [
            "req",
            "server",
            "html",
            "hydrate"
      ]
}
    },
    {
      id: "ssr-act-2",
      topicId: "ssr",
      objectiveId: "Identify when to use SSR vs Static Site Generation (SSG)",
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
      "scenario": "You are building a blog platform. The articles update maybe once a day, but read performance and SEO are critical.",
      "question": "Which rendering strategy should you choose?",
      "options": [
            {
                  "id": "opt1",
                  "text": "Server-Side Rendering (SSR)",
                  "isCorrect": false,
                  "explanation": "SSR would generate the HTML on every single request, unnecessarily burdening the server since the data rarely changes."
            },
            {
                  "id": "opt2",
                  "text": "Static Site Generation (SSG) with ISR",
                  "isCorrect": true,
                  "explanation": "SSG generates the pages at build time for instant CDN delivery. Incremental Static Regeneration (ISR) can rebuild the page in the background if the article updates."
            }
      ]
}
    },
    {
      id: "ssr-act-3",
      topicId: "ssr",
      objectiveId: "Debug hydration mismatch errors",
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
      "question": "Find the code causing the React Hydration Mismatch Error.",
      "code": "export default function Clock() {\\n  const time = new Date().toLocaleTimeString();\\n  \\n  return (\\n    <div>Current time is: {time}</div>\\n  );\\n}",
      "bugLineIndex": 1,
      "explanation": "new Date() executes on the server (generating one timestamp) and then executes again on the client during hydration (generating a slightly later timestamp). React panics because the server HTML doesn't match the client HTML."
}
    },
    {
      id: "ssr-act-4",
      topicId: "ssr",
      objectiveId: "Debug hydration mismatch errors",
      category: "practice",
      type: "code-completion",
      difficulty: "advanced",
      payload: {
      "prompt": "Fix the hydration mismatch by waiting for the client to mount before showing dynamic data.",
      "template": "export default function Clock() {\\n  const [mounted, setMounted] = useState(false);\\n  \\n  {{blank1}}(() => {\\n    setMounted(true);\\n  }, []);\\n\\n  if (!mounted) return null;\\n  return <div>{new Date().toLocaleTimeString()}</div>;\\n}",
      "answers": [
            {
                  "blank1": "useEffect"
            }
      ],
      "explanation": "useEffect only runs on the client. By delaying rendering until after mount, we guarantee the server and the initial client hydration render the exact same thing (null)."
}
    },
    {
      id: "ssr-assess-0",
      topicId: "ssr",
      objectiveId: "none",
      category: "evaluate",
      type: "explain",
      difficulty: "interview",
      payload: {
      "prompt": "What does it mean when a React application 'Hydrates'?",
      "modelAnswer": "Hydration is the process where React takes a static HTML tree generated by the server and boots up Javascript on the client to attach event listeners and state, transforming it into a fully interactive React application."
}
    }
  ],
  objectiveCoverage: {
    "Differentiate between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)": [
        "ssr-act-0"
    ],
    "Explain the concept of Hydration": [
        "ssr-act-1"
    ],
    "Identify when to use SSR vs Static Site Generation (SSG)": [
        "ssr-act-2"
    ],
    "Debug hydration mismatch errors": [
        "ssr-act-3",
        "ssr-act-4"
    ]
},
  objectiveDifficulty: {
    "Differentiate between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)": "intermediate",
    "Explain the concept of Hydration": "advanced",
    "Identify when to use SSR vs Static Site Generation (SSG)": "intermediate",
    "Debug hydration mismatch errors": "advanced"
} as any
};
