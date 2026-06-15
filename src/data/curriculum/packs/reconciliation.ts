import { TopicPack } from "@/types/curriculum";

export const reconciliationPack: TopicPack = {
  topic: {
    id: "reconciliation",
    moduleId: "generated", // Update manually
    trackId: "javascript", // Update manually
    title: "React Reconciliation",
    order: 1,
    metadata: {
      difficulty: "advanced",
      estimatedMinutes: 30,
      interviewFrequency: 10,
      importance: 9,
      prerequisites: ["react-components","virtual-dom"]
    },
    objectives: [
    "Explain the role of the Virtual DOM and diffing",
    "Understand why the 'key' prop is necessary in lists",
    "Predict how state updates trigger re-renders",
    "Debug performance issues caused by unnecessary re-renders"
]
  },
  activities: [
    {
      id: "reconciliation-act-0",
      topicId: "reconciliation",
      objectiveId: "Explain the role of the Virtual DOM and diffing",
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
      "topic": "Reconciliation",
      "explanation": "Directly manipulating the browser's DOM is extremely slow. React Reconciliation is the algorithm React uses to diff the Virtual DOM tree against the previous tree, calculating the absolute minimum number of DOM mutations needed to update the UI.",
      "interviewContext": "Interviewers will ask you to explain Reconciliation to see if you understand React under the hood, not just how to write components."
}
    },
    {
      id: "reconciliation-act-1",
      topicId: "reconciliation",
      objectiveId: "Explain the role of the Virtual DOM and diffing",
      category: "practice",
      type: "tap-order",
      difficulty: "intermediate",
      payload: {
      "prompt": "Order the steps of React's Render Phase",
      "items": [
            {
                  "id": "state",
                  "text": "State or props update occurs"
            },
            {
                  "id": "vdom",
                  "text": "React calls render() to create a new Virtual DOM tree"
            },
            {
                  "id": "diff",
                  "text": "React diffs the new tree against the old tree (Reconciliation)"
            },
            {
                  "id": "commit",
                  "text": "React commits the necessary changes to the real DOM"
            }
      ],
      "correctOrder": [
            "state",
            "vdom",
            "diff",
            "commit"
      ]
}
    },
    {
      id: "reconciliation-act-2",
      topicId: "reconciliation",
      objectiveId: "Understand why the 'key' prop is necessary in lists",
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
      "scenario": "You are rendering a list of interactive <TodoItem /> components. The array can be re-ordered by the user. You use the array index as the 'key' prop.",
      "question": "What is the consequence of using the array index as the key here?",
      "options": [
            {
                  "id": "opt1",
                  "text": "It causes a massive memory leak.",
                  "isCorrect": false,
                  "explanation": "It causes bugs, but not memory leaks."
            },
            {
                  "id": "opt2",
                  "text": "When re-ordered, React will recycle the wrong components, causing internal component state (like inputs) to become mixed up.",
                  "isCorrect": true,
                  "explanation": "React uses the 'key' to identify elements across renders. If the index changes because of re-ordering, React assumes the DOM element is the same but its content changed, incorrectly preserving state."
            }
      ]
}
    },
    {
      id: "reconciliation-act-3",
      topicId: "reconciliation",
      objectiveId: "Understand why the 'key' prop is necessary in lists",
      category: "practice",
      type: "code-completion",
      difficulty: "intermediate",
      payload: {
      "prompt": "Provide a stable key for this mapped array.",
      "template": "const list = todos.map((todo, index) => (\\n  <TodoItem {{blank1}}={{{blank2}}} text={todo.text} />\\n));",
      "answers": [
            {
                  "blank1": "key",
                  "blank2": "todo.id"
            }
      ],
      "explanation": "Always use a stable, unique identifier from your data model (like a database ID) as the key, rather than the array index."
}
    },
    {
      id: "reconciliation-act-4",
      topicId: "reconciliation",
      objectiveId: "Predict how state updates trigger re-renders",
      category: "practice",
      type: "predict-next-line",
      difficulty: "advanced",
      payload: {
      "template": "function Parent() {\\n  const [count, setCount] = useState(0);\\n  return (\\n    <div>\\n      <button onClick={() => setCount(1)}>Set 1</button>\\n      <Child />\\n    </div>\\n  );\\n}\\n\\n// What happens to <Child /> when button is clicked the first time?",
      "options": [
            {
                  "id": "o1",
                  "code": "Child re-renders",
                  "isCorrect": true,
                  "explanation": "When a parent component's state changes, React will recursively re-render all children by default unless memoized."
            },
            {
                  "id": "o2",
                  "code": "Child does NOT re-render because its props didn't change",
                  "isCorrect": false,
                  "explanation": "Props changing is not the only thing that triggers re-renders. A parent re-rendering automatically forces children to re-render."
            }
      ]
}
    },
    {
      id: "reconciliation-assess-0",
      topicId: "reconciliation",
      objectiveId: "none",
      category: "evaluate",
      type: "explain",
      difficulty: "interview",
      payload: {
      "prompt": "What happens in React when you change the root element type of a component from a <div> to a <section>?",
      "modelAnswer": "React uses a heuristic in its diffing algorithm: Whenever the root elements have different types, React will completely tear down the old tree (unmounting components and destroying state) and build the new tree from scratch."
}
    }
  ],
  objectiveCoverage: {
    "Explain the role of the Virtual DOM and diffing": [
        "reconciliation-act-0",
        "reconciliation-act-1"
    ],
    "Understand why the 'key' prop is necessary in lists": [
        "reconciliation-act-2",
        "reconciliation-act-3"
    ],
    "Predict how state updates trigger re-renders": [
        "reconciliation-act-4"
    ],
    "Debug performance issues caused by unnecessary re-renders": []
},
  objectiveDifficulty: {
    "Explain the role of the Virtual DOM and diffing": "intermediate",
    "Understand why the 'key' prop is necessary in lists": "advanced",
    "Predict how state updates trigger re-renders": "advanced",
    "Debug performance issues caused by unnecessary re-renders": "foundation"
} as any
};
