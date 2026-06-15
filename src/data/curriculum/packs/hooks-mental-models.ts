import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "hooks-mental-models")!;

export const hooksMentalModelsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "hmm-intro",
      topicId: "hooks-mental-models",
      objectiveId: topicData.objectives[0],
      category: "learn",
      difficulty: "intermediate",
      type: "why-it-matters",
      payload: {
        topic: "Hooks Mental Models",
        explanation: "Hooks are not just functions—they are a way to hook into React's rendering lifecycle. Understanding closure scoping, batching, and side-effect cleanup separates junior developers (who guess why things break) from senior developers (who know exactly why the state is stale).",
        interviewContext: "Interviewers will almost always test you on Stale Closures, the asynchronous nature of setState, and dependency arrays. These are the most common sources of production bugs in modern React."
      }
    },
    {
      id: "hmm-predict-setstate",
      topicId: "hooks-mental-models",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "predict-next-line",
      payload: {
        question: "Is setState synchronous?",
        template: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  }

  // User clicks the button once.
  // What does console.log output, and what is the final state?
  {{blank}}
}`,
        options: [
          {
            id: "opt1",
            code: `Log: 2, Final State: 2`,
            isCorrect: false,
            explanation: "Incorrect. setState does not update the variable synchronously, and subsequent calls in the same render still read the old 'count' value."
          },
          {
            id: "opt2",
            code: `Log: 0, Final State: 1`,
            isCorrect: true,
            explanation: "Correct! State variables are constants within a specific render (Closures). Calling setCount schedules an update but doesn't change the 'count' variable in the current execution. Both setCounts evaluate to setCount(0 + 1), so the final state is 1."
          },
          {
            id: "opt3",
            code: `Log: 1, Final State: 2`,
            isCorrect: false,
            explanation: "Incorrect. 'count' is a constant in this render scope. It will not update to 1 mid-execution."
          }
        ]
      }
    },
    {
      id: "hmm-debug-stale-closure",
      topicId: "hooks-mental-models",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "The user types 'Hello', but after 3 seconds, the alert says ''. Why?",
        code: [
          "function Search() {",
          "  const [query, setQuery] = useState('');",
          "",
          "  useEffect(() => {",
          "    setTimeout(() => {",
          "      alert(query);",
          "    }, 3000);",
          "  }, []);",
          "",
          "  return <input onChange={e => setQuery(e.target.value)} />;",
          "}"
        ],
        bugLineIndex: 7,
        explanation: "This is a Stale Closure. The useEffect has an empty dependency array `[]`, so it only runs on the first render. At that time, `query` was `''`. The setTimeout callback is trapped in that initial closure. To fix this, `query` must be added to the dependency array (which would reset the timer on every keystroke, requiring a cleanup function!)."
      }
    },
    {
      id: "hmm-debug-cleanup",
      topicId: "hooks-mental-models",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "This component crashes the browser with memory leaks if it mounts/unmounts frequently. Find the bug.",
        code: [
          "function WindowTracker() {",
          "  const [width, setWidth] = useState(window.innerWidth);",
          "",
          "  useEffect(() => {",
          "    const handleResize = () => setWidth(window.innerWidth);",
          "    window.addEventListener('resize', handleResize);",
          "  }, []);",
          "",
          "  return <div>{width}</div>;",
          "}"
        ],
        bugLineIndex: 6,
        explanation: "Missing Cleanup Function! Every time the component mounts, it adds a NEW event listener to the global window object. When it unmounts, the listener remains active, trying to call setWidth on an unmounted component (memory leak). You must return `() => window.removeEventListener('resize', handleResize)`."
      }
    },
    {
      id: "hmm-scenario-useref",
      topicId: "hooks-mental-models",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "scenario",
      payload: {
        question: "Tracking Analytics",
        scenario: "You need to track how many seconds a user spends hovering over a specific card. You start a timer on mouse enter, and stop it on mouse leave. The timer value needs to be tracked, but updating it every second should NOT cause the UI to re-render.",
        options: [
          {
            id: "opt1",
            text: "Use a global variable 'let hoverTime = 0'",
            explanation: "Global variables are shared across all instances of the component. If two cards exist on the screen, they would interfere with each other's timers.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Use useState and update it every second",
            explanation: "useState will trigger a re-render every single second, which violates the requirement of the scenario.",
            isCorrect: false
          },
          {
            id: "opt3",
            text: "Use useRef to store the timer value",
            explanation: "Correct! useRef acts like an instance variable. It persists data across renders without triggering a re-render when the `.current` property is mutated. Perfect for tracking background metrics.",
            isCorrect: true
          }
        ]
      }
    },
    {
      id: "hmm-implementation-functional",
      topicId: "hooks-mental-models",
      objectiveId: topicData.objectives[0],
      category: "implementation",
      difficulty: "intermediate",
      type: "code-completion",
      payload: {
        prompt: "Fix the stale state bug by using a 'Functional Update' so that clicking the button increases the count by 2, not 1.",
        template: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // Instead of setCount(count + 1)
    setCount({{blank}});
    setCount({{blank2}});
  }
}`,
        answers: [
          { "blank": "c => c + 1", "blank2": "c => c + 1" },
          { "blank": "prev => prev + 1", "blank2": "prev => prev + 1" }
        ],
        explanation: "By passing a function to setState (e.g., `prev => prev + 1`), React guarantees that the function will receive the most up-to-date state at the exact moment the update is applied, bypassing closure staleness!"
      }
    },
    {
      id: "hmm-complete",
      topicId: "hooks-mental-models",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "checkpoint",
      payload: {
        topicTitle: "Hooks Mental Models",
        topicId: "hooks-mental-models"
      }
    }
  ]
};
