import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "react-performance")!;

export const reactPerformancePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "rp-intro",
      topicId: "react-performance",
      objectiveId: topicData.objectives[0],
      category: "learn",
      difficulty: "intermediate",
      type: "why-it-matters",
      payload: {
        topic: "React Performance",
        explanation: "In React, performance isn't just about writing fast code—it's about avoiding unnecessary work. Misunderstanding how memoization and Context work can actually make your app significantly slower than if you had done nothing at all.",
        interviewContext: "Senior interviews heavily focus on identifying rendering bottlenecks. If you say 'just wrap it in useMemo', you will likely fail. You must demonstrate that you know WHEN and HOW to break the rerender cascade."
      }
    },
    {
      id: "rp-scenario-context",
      topicId: "react-performance",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "scenario",
      payload: {
        question: "The Context Trap",
        scenario: "Your app has a <UserContext.Provider> wrapping the entire application. It stores the user's profile and their current typing draft in a search bar. Every time the user types a letter, the entire app lags terribly. Why?",
        options: [
          {
            id: "opt1",
            text: "React cannot handle fast typing events natively.",
            explanation: "React handles typing perfectly fine if localized. The issue is architecture, not React's raw speed.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Context updates force a rerender of EVERY consuming component.",
            explanation: "Correct! When a Context provider's value changes, EVERY component that calls `useContext(UserContext)` is forced to rerender, bypassing React.memo entirely. Fast-changing state (like typing) should never be stored in a global context shared by heavy components.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "The search bar is missing a useMemo hook.",
            explanation: "useMemo doesn't stop context consumers from rerendering when the context value changes.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "rp-debug-broken-memo",
      topicId: "react-performance",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "debug",
      payload: {
        question: "Why does the <HeavyList /> rerender every time the user types in the input?",
        code: [
          "const HeavyList = React.memo(function HeavyList({ config }) {",
          "  console.log('HeavyList rendering');",
          "  return <div>...</div>;",
          "});",
          "",
          "function Dashboard() {",
          "  const [text, setText] = useState('');",
          "",
          "  return (",
          "    <div>",
          "      <input onChange={e => setText(e.target.value)} />",
          "      <HeavyList config={{ theme: 'dark' }} />",
          "    </div>",
          "  );",
          "}"
        ],
        bugLineIndex: 11,
        explanation: "Broken Memoization! `React.memo` does a shallow comparison of props. On every keystroke, Dashboard rerenders and creates a BRAND NEW object in memory `{ theme: 'dark' }`. Because `newObject !== oldObject`, React.memo thinks the prop changed and forces HeavyList to rerender. To fix, move the object outside the component or wrap it in useMemo."
      }
    },
    {
      id: "rp-predict-render",
      topicId: "react-performance",
      objectiveId: topicData.objectives[0],
      category: "practice",
      difficulty: "intermediate",
      type: "predict-next-line",
      payload: {
        question: "Will the child render?",
        template: `const Child = React.memo(({ onAction }) => {
  console.log("Child Render");
  return <button onClick={onAction}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const handleAction = useCallback(() => console.log('Action'), []);

  console.log("Parent Render");

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Update Parent</button>
      <Child onAction={handleAction} />
    </>
  );
}

// User clicks "Update Parent" once.
// What logs to the console?
{{blank}}`,
        options: [
          {
            id: "opt1",
            code: `"Parent Render"\n"Child Render"`,
            isCorrect: false,
            explanation: "Incorrect. The Child is wrapped in React.memo AND its prop is stabilized by useCallback."
          },
          {
            id: "opt2",
            code: `"Parent Render"`,
            isCorrect: true,
            explanation: "Correct! The Parent rerenders, but because 'handleAction' is memoized with an empty dependency array, its reference stays identical. React.memo sees the props are exactly the same, so the Child's render is skipped entirely."
          },
          {
            id: "opt3",
            code: `"Child Render"`,
            isCorrect: false,
            explanation: "Incorrect. The child is successfully memoized."
          }
        ]
      }
    },
    {
      id: "rp-explain-premature",
      topicId: "react-performance",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "explain",
      payload: {
        prompt: "Why is wrapping every function in `useCallback` a bad idea? Shouldn't it theoretically make the app faster?",
        modelAnswer: "No. `useCallback` is not free. It requires React to allocate memory for the dependencies array and perform a shallow equality check on those dependencies during EVERY render. If the function is passed to a standard DOM element (like a <button>) or an un-memoized component, the child will rerender anyway, making the `useCallback` completely useless and actually SLOWER due to the comparison overhead."
      }
    },
    {
      id: "rp-implementation-memo",
      topicId: "react-performance",
      objectiveId: topicData.objectives[0],
      category: "implementation",
      difficulty: "intermediate",
      type: "code-completion",
      payload: {
        prompt: "Stabilize the user object so that the ProfileCard does not rerender when the parent rerenders.",
        template: `function App({ userId }) {
  const [count, setCount] = useState(0);

  // Wrap the object creation in useMemo!
  const userObj = {{blank}}

  return (
    <ProfileCard user={userObj} />
  );
}`,
        answers: [
          { "blank": "useMemo(() => ({ id: userId }), [userId]);" },
          { "blank": "useMemo(() => { return { id: userId }; }, [userId]);" }
        ],
        explanation: "By wrapping the object creation in `useMemo` with `[userId]` as a dependency, the object reference will remain exactly the same across renders as long as `userId` doesn't change."
      }
    },
    {
      id: "rp-complete",
      topicId: "react-performance",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      difficulty: "intermediate",
      type: "checkpoint",
      payload: {
        topicTitle: "React Performance",
        topicId: "react-performance"
      }
    }
  ]
};
