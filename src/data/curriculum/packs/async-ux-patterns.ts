import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "async-ux-patterns")!;

export const asyncUxPatternsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "au-intro",
      topicId: "async-ux-patterns",
      objectiveId: topicData.objectives[0],
      category: "learn",
      difficulty: "intermediate",
      type: "why-it-matters",
      payload: {
        topic: "Async UX Patterns",
        explanation: "Handling async behavior gracefully is the hardest part of building complex UIs. Debouncing, Throttling, Suspense, and Transitions are all mechanisms to keep the UI responsive while expensive or asynchronous work happens in the background.",
        interviewContext: "Interviewers frequently test if you know how to build a search bar (Debouncing) and if you actually understand how modern React 18+ features like Suspense and useTransition work under the hood."
      }
    },
    {
      id: "au-scenario-suspense",
      topicId: "async-ux-patterns",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "scenario",
      payload: {
        question: "How Suspense Works",
        scenario: "You wrap a <UserProfile /> component in a <Suspense fallback={<Spinner />}> boundary. How does React actually know when to show the spinner versus the profile?",
        options: [
          {
            id: "opt1",
            text: "The component returns a boolean 'isLoading' prop to Suspense.",
            explanation: "Suspense does not rely on props returned by the component.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "The component 'throws' a Promise while fetching.",
            explanation: "Correct! Suspense is effectively an Error Boundary for Promises. When a component (or its data fetching library) throws a Promise, Suspense catches it, renders the fallback, and waits for the Promise to resolve before re-rendering the component.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "React checks if the component's useEffect is running.",
            explanation: "React does not track the internal state of useEffects to trigger Suspense.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "au-debug-debounce-render",
      topicId: "async-ux-patterns",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "The user types very fast, but the API is still called for EVERY single keystroke. Why isn't the debounce working?",
        code: [
          "function SearchInput() {",
          "  const [query, setQuery] = useState('');",
          "",
          "  const debouncedSearch = debounce((text) => {",
          "    api.search(text);",
          "  }, 500);",
          "",
          "  const handleChange = (e) => {",
          "    setQuery(e.target.value);",
          "    debouncedSearch(e.target.value);",
          "  };",
          "",
          "  return <input onChange={handleChange} />;",
          "}"
        ],
        bugLineIndex: 3,
        explanation: "Because `debouncedSearch` is declared directly inside the component body, a BRAND NEW debounced function (with a completely new internal timer) is created on EVERY render. Since `setQuery` triggers a rerender on every keystroke, you are creating and firing multiple independent debounced functions rather than sharing one timer. It must be wrapped in `useCallback` or moved outside the component."
      }
    },
    {
      id: "au-debug-unmounted",
      topicId: "async-ux-patterns",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "This throws a React warning: 'Can't perform a React state update on an unmounted component'. Find the bug.",
        code: [
          "function UserProfile({ userId }) {",
          "  const [user, setUser] = useState(null);",
          "",
          "  useEffect(() => {",
          "    let active = true;",
          "    fetchUser(userId).then(data => {",
          "      setUser(data);",
          "    });",
          "    return () => { active = false; };",
          "  }, [userId]);",
          "",
          "  return <div>{user?.name}</div>;",
          "}"
        ],
        bugLineIndex: 6,
        explanation: "You set up an `active` boolean for cleanup, but you forgot to actually check it before calling `setUser(data)`. If the component unmounts before the fetch completes, the Promise will still resolve and try to update state on a destroyed component. It should be `if (active) setUser(data);`."
      }
    },
    {
      id: "au-predict-transition",
      topicId: "async-ux-patterns",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "predict-next-line",
      payload: {
        question: "useTransition Priorities",
        template: `function App() {
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    const val = e.target.value;
    setText(val);           // Sync update
    
    startTransition(() => {
      setResults(heavyFilter(val)); // Low priority update
    });
  }
}

// User types 'A'. Which state update paints to the screen first?
{{blank}}`,
        options: [
          {
            id: "opt1",
            code: `They both paint to the screen at the exact same time.`,
            isCorrect: false,
            explanation: "Incorrect. The entire point of useTransition is to split the updates into different priorities."
          },
          {
            id: "opt2",
            code: `The 'text' update paints first.`,
            isCorrect: true,
            explanation: "Correct! The `setText` call is a high-priority synchronous update. React will render and paint the input box immediately. The `setResults` update inside `startTransition` is marked as low-priority, so React calculates it in the background and paints it later, preventing input lag."
          },
          {
            id: "opt3",
            code: `The 'results' update paints first.`,
            isCorrect: false,
            explanation: "Incorrect. startTransition explicitly LOWERS the priority of the enclosed updates."
          }
        ]
      }
    },
    {
      id: "au-explain-usetransition",
      topicId: "async-ux-patterns",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "explain",
      payload: {
        prompt: "Does wrapping a heavy calculation in `useTransition` make the calculation itself run faster?",
        modelAnswer: "No, useTransition does not optimize the code or make it run faster. The heavy calculation takes the exact same amount of total CPU time. What useTransition does is make the rendering work *interruptible*. React will slice the heavy rendering work into chunks, periodically yielding back to the main thread so the browser can handle high-priority events like user typing or animations."
      }
    },
    {
      id: "au-implementation-debounce",
      topicId: "async-ux-patterns",
      objectiveId: topicData.objectives[0],
      category: "implementation",
      difficulty: "intermediate",
      type: "code-completion",
      payload: {
        prompt: "Implement the cleanup function for a basic useDebounce hook.",
        template: `function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    {{blank}}

  }, [value, delay]);

  return debouncedValue;
}`,
        answers: [
          { "blank": "return () => clearTimeout(handler);" },
          { "blank": "return () => { clearTimeout(handler); };" }
        ],
        explanation: "By returning a cleanup function that clears the timeout, React will cancel the previous timer every time `value` changes. This ensures `setDebouncedValue` is only called after the user has stopped typing for the specified `delay`."
      }
    },
    {
      id: "au-complete",
      topicId: "async-ux-patterns",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "checkpoint",
      payload: {
        topicTitle: "Async UX Patterns",
        topicId: "async-ux-patterns"
      }
    }
  ]
};
