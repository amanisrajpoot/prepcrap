import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "react-rendering-engine")!;

export const reactRenderingEnginePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "rre-intro",
      topicId: "react-rendering-engine",
      objectiveId: topicData.objectives[0],
      category: "learn",
      difficulty: "intermediate",
      type: "why-it-matters",
      payload: {
        topic: "React Rendering & Fiber",
        explanation: "In React, a 'render' simply means calling your component function to see what it returns. It does NOT mean the DOM is updated. Understanding the difference between the Render Phase (building the Virtual DOM) and the Commit Phase (mutating the real DOM) is essential for fixing performance bugs and state glitches.",
        interviewContext: "Interviewers frequently test if you know WHY a component re-renders and HOW React decides to keep or destroy component state during reconciliation."
      }
    },
    {
      id: "rre-predict-render",
      topicId: "react-rendering-engine",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "predict-next-line",
      payload: {
        question: "Rendering vs Committing",
        template: `function App() {
  console.log("1. App rendered");
  return <Child />;
}

function Child() {
  console.log("2. Child rendered");
  useEffect(() => {
    console.log("3. Child mounted");
  }, []);
  return <div>Hello</div>;
}

// What order will these log on initial load?
// {{blank}}`,
        options: [
          {
            id: "opt1",
            code: `"1. App rendered"\n"2. Child rendered"\n"3. Child mounted"`,
            isCorrect: true,
            explanation: "Correct! React calls the component functions recursively (Render Phase) from top to bottom. Then it updates the DOM (Commit Phase), and finally, effects run bottom-up."
          },
          {
            id: "opt2",
            code: `"1. App rendered"\n"3. Child mounted"\n"2. Child rendered"`,
            isCorrect: false,
            explanation: "Incorrect. Effects run AFTER the render phase is completely finished and the DOM has been painted."
          },
          {
            id: "opt3",
            code: `"3. Child mounted"\n"1. App rendered"\n"2. Child rendered"`,
            isCorrect: false,
            explanation: "Incorrect. The render phase must complete before any mounts or effects can occur."
          }
        ]
      }
    },
    {
      id: "rre-debug-state-preservation",
      topicId: "react-rendering-engine",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "Why doesn't the form clear when switching modes?",
        code: [
          "function FormSwitcher({ isEditMode }) {",
          "  if (isEditMode) {",
          "    return <ProfileForm mode=\"edit\" />;",
          "  } else {",
          "    return <ProfileForm mode=\"create\" />;",
          "  }",
          "}"
        ],
        bugLineIndex: 4,
        explanation: "React preserves state based on the component's position in the UI tree. Since `<ProfileForm>` is at the exact same position (the first child returned by FormSwitcher), React assumes it's the SAME component and simply updates the props. The internal state (like typed text) will NOT reset."
      }
    },
    {
      id: "rre-implementation-key-reset",
      topicId: "react-rendering-engine",
      objectiveId: topicData.objectives[0],
      category: "implementation",
      difficulty: "intermediate",
      type: "code-completion",
      payload: {
        prompt: "Force React to completely unmount and remount the <ProfileForm> when switching modes, clearing all its state.",
        template: `function FormSwitcher({ isEditMode }) {
  return (
    <ProfileForm 
      mode={isEditMode ? 'edit' : 'create'}
      {{blank}}
    />
  );
}`,
        answers: [
          { blank: "key={isEditMode ? 'edit' : 'create'}" },
          { blank: "key={isEditMode}" },
          { blank: "key={isEditMode ? 1 : 0}" }
        ],
        explanation: "By providing a different `key` when the mode changes, you tell React that these are conceptually two completely different components. React will destroy the old instance (clearing its state) and create a fresh one."
      }
    },
    {
      id: "rre-debug-index-keys",
      topicId: "react-rendering-engine",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "A user deletes the FIRST item in the list, but the LAST item disappears from the screen visually. Why?",
        code: [
          "function TodoList({ todos, deleteTodo }) {",
          "  return (",
          "    <ul>",
          "      {todos.map((todo, index) => (",
          "        <TodoItem ",
          "          key={index} ",
          "          todo={todo}",
          "          onDelete={() => deleteTodo(todo.id)} ",
          "        />",
          "      ))}",
          "    </ul>",
          "  );",
          "}"
        ],
        bugLineIndex: 5,
        explanation: "When you use array indices as keys, React maps component state to the index. If you delete index 0, the item at index 1 shifts to index 0. React sees index 0 still exists, so it reuses the component instance (and its local state!), only destroying the very last index in the array. This causes catastrophic UI bugs when lists reorder."
      }
    },
    {
      id: "rre-scenario-fiber",
      topicId: "react-rendering-engine",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "scenario",
      payload: {
        question: "Optimizing a Heavy UI",
        scenario: "You have an expensive DataChart component that takes 200ms to render. You also have a fast SearchInput. When the user types in the input, the state updates, causing the DataChart to re-render. The user experiences severe input lag (typing freezes).",
        options: [
          {
            id: "opt1",
            text: "Wrap DataChart in React.memo()",
            explanation: "React.memo only helps if the props haven't changed. If the chart relies on the search query, its props are changing, so it will still re-render and block the main thread.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Use startTransition (or useTransition) for the chart state update",
            explanation: "Correct! By wrapping the state update for the chart in startTransition, you tell React's Fiber engine that rendering the chart is 'low priority'. React will yield to the browser to handle user typing (high priority), keeping the input snappy.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Move the DataChart to a Web Worker",
            explanation: "Web Workers cannot render React components or access the DOM. You can move heavy data processing to a worker, but not the React render phase.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "rre-explain-rerender",
      topicId: "react-rendering-engine",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "explain",
      payload: {
        prompt: "In React, a component will unconditionally re-render if its parent re-renders, even if none of its props have changed. True or False? Explain why.",
        modelAnswer: "True. By default, React recursively renders all child components when a parent renders, regardless of whether props changed. This is a deliberate design choice because checking for prop equality takes time. To prevent this default behavior and skip rendering when props are identical, you must explicitly opt-in by wrapping the child in `React.memo`."
      }
    },
    {
      id: "rre-complete",
      topicId: "react-rendering-engine",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "checkpoint",
      payload: {
        topicTitle: "React Rendering Engine",
        topicId: "react-rendering-engine"
      }
    }
  ]
};
