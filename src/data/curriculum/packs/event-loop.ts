import { TopicPack } from "@/types/curriculum";

export const EventLoopPack: TopicPack = {
  topic: {
    id: "event-loop",
    moduleId: "js-async",
    trackId: "javascript",
    title: "The Event Loop",
    order: 1,
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 60, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Microtasks (Promises) always take absolute priority over Macrotasks (setTimeout), starving the event loop if chained indefinitely.",
        "Code immediately following 'await' is pushed to the microtask queue, not executed synchronously.",
        "requestAnimationFrame timing relative to microtasks and macrotasks before rendering."
      ]
    },
    objectives: ["Explain the macro/micro task queues", "Predict console.log execution order", "Understand Web APIs vs V8"]
  },
  activities: [
    // --- 1. LEARNING (10%) ---
    {
      id: "el-timeline-flow",
      topicId: "event-loop",
      objectiveId: "Explain the macro/micro task queues",
      category: "learn",
      type: "timeline",
      difficulty: "foundation",
      payload: {
        mode: "explore",
        steps: [
          {
            title: "1. Call Stack",
            description: "Synchronous code is pushed onto the Call Stack and executed immediately. If it's a Web API (like setTimeout), it is offloaded to the browser environment."
          },
          {
            title: "2. Microtask Queue",
            description: "Once the Call Stack is empty, the Event Loop checks the Microtask Queue FIRST. This queue contains Promise callbacks (.then, .catch) and code after 'await'. It drains this entire queue before moving on."
          },
          {
            title: "3. Macrotask Queue",
            description: "If the Call Stack and Microtask Queues are completely empty, the Event Loop takes the FIRST task from the Macrotask Queue (e.g., setTimeout, setInterval) and pushes it to the Call Stack."
          },
          {
            title: "4. Render Queue",
            description: "Between draining the microtask queue and the next macrotask, the browser may decide to run requestAnimationFrame callbacks and repaint the screen."
          }
        ]
      }
    },

    // --- 2. PREDICT OUTPUT (40%) ---
    {
      id: "el-predict-basic-queues",
      topicId: "event-loop",
      objectiveId: "Predict console.log execution order",
      category: "practice",
      type: "code-prediction",
      difficulty: "intermediate",
      payload: {
        question: "What is the output order?",
        code: "console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
        options: [
          { id: "1", text: "1, 2, 3, 4", isCorrect: false, explanation: "setTimeout and Promises are asynchronous." },
          { id: "2", text: "1, 4, 3, 2", isCorrect: true, explanation: "Correct! Synchronous code runs first (1, 4). Then the Microtask Queue is drained entirely, executing the Promise callback (3). Finally, the Macrotask Queue is checked, executing setTimeout (2)." },
          { id: "3", text: "1, 4, 2, 3", isCorrect: false, explanation: "Microtasks (Promises) run BEFORE Macrotasks (setTimeout)." },
          { id: "4", text: "4, 1, 3, 2", isCorrect: false, explanation: "Synchronous code runs in order." }
        ]
      }
    },
    {
      id: "el-predict-await",
      topicId: "event-loop",
      objectiveId: "Predict console.log execution order",
      category: "practice",
      type: "code-prediction",
      difficulty: "advanced",
      payload: {
        question: "What does this code log to the console?",
        code: "async function foo() {\n  console.log('A');\n  await Promise.resolve();\n  console.log('B');\n}\n\nconsole.log('C');\nfoo();\nconsole.log('D');",
        options: [
          { id: "1", text: "C, A, B, D", isCorrect: false, explanation: "What does 'await' actually do to the code below it?" },
          { id: "2", text: "C, A, D, B", isCorrect: true, explanation: "Correct! The synchronous code outside the function runs first ('C'). Then foo() is called, synchronously logging 'A'. The 'await' keyword pauses the function, pushing the rest of foo() ('B') into the Microtask Queue. Execution resumes globally, logging 'D'. Finally, the call stack empties and the Microtask Queue logs 'B'." },
          { id: "3", text: "A, C, D, B", isCorrect: false, explanation: "'foo()' is called after 'C'." },
          { id: "4", text: "C, D, A, B", isCorrect: false, explanation: "The start of an async function (before the first await) executes synchronously." }
        ]
      }
    },
    {
      id: "el-predict-starvation",
      topicId: "event-loop",
      objectiveId: "Explain the macro/micro task queues",
      category: "practice",
      type: "code-prediction",
      difficulty: "advanced",
      payload: {
        question: "What happens if we run this recursive Promise loop?",
        code: "function loop() {\n  Promise.resolve().then(loop);\n}\nloop();\nsetTimeout(() => console.log('Timeout'), 0);",
        options: [
          { id: "1", text: "Logs 'Timeout' immediately", isCorrect: false, explanation: "The microtask queue must be completely empty before macrotasks run." },
          { id: "2", text: "Maximum Call Stack Size Exceeded", isCorrect: false, explanation: "Promises are asynchronous, so the stack pops before the next microtask runs. It won't overflow the stack." },
          { id: "3", text: "The browser freezes and 'Timeout' never logs", isCorrect: true, explanation: "Correct! This is Microtask Starvation. The Event Loop will not move to the Macrotask queue (or render the UI) until the Microtask queue is empty. Since the Promise continuously queues another Promise, it creates an infinite loop that freezes the thread." },
          { id: "4", text: "Logs 'Timeout' eventually", isCorrect: false, explanation: "The microtask queue will never empty." }
        ]
      }
    },

    // --- 3. DEBUGGING (25%) ---
    {
      id: "el-debug-ui-freeze",
      topicId: "event-loop",
      objectiveId: "Understand Web APIs vs V8",
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
        scenario: "The user clicks a button to process 1,000,000 items. The browser completely freezes and the 'Loading...' spinner stops spinning until the process finishes.",
        code: "function handleClick() {\n  setLoading(true);\n  for(let i=0; i<1000000; i++) {\n    heavyMath(i);\n  }\n  setLoading(false);\n}",
        bugLine: 3,
        explanation: "JavaScript is single-threaded. The massive synchronous `for` loop monopolizes the Call Stack. Because the Call Stack is not empty, the Event Loop cannot reach the Render Queue, meaning the browser cannot paint the `setLoading(true)` state. The UI remains frozen. Fix it by breaking the work into chunks using `setTimeout` or offloading to a Web Worker."
      }
    },
    {
      id: "el-debug-async-map",
      topicId: "event-loop",
      objectiveId: "Predict console.log execution order",
      category: "practice",
      type: "debug",
      difficulty: "intermediate",
      payload: {
        scenario: "The developer expects this array method to pause and wait for each item, logging 'Done' at the very end.",
        code: "const urls = ['a', 'b', 'c'];\nurls.forEach(async (url) => {\n  const res = await fetch(url);\n  console.log(res);\n});\nconsole.log('Done');",
        bugLine: 2,
        explanation: "Array.prototype.forEach does not wait for Promises to resolve. It simply fires off the async callbacks synchronously and immediately continues to the next line. 'Done' will log FIRST, before any of the fetches complete. Fix it by using a `for...of` loop with `await` inside, or using `Promise.all(urls.map(...))`."
      }
    },

    // --- 4. EXPLAIN (15%) ---
    {
      id: "el-interview-queues",
      topicId: "event-loop",
      objectiveId: "Explain the macro/micro task queues",
      category: "evaluate",
      type: "interview",
      difficulty: "advanced",
      payload: {
        question: "Explain the difference between the Macrotask Queue and the Microtask Queue. Give examples of each.",
        modelAnswer: "The Microtask Queue has higher priority than the Macrotask Queue. \n\nAfter a synchronous operation finishes, the Event Loop will drain the ENTIRE Microtask Queue before it looks at the Macrotask Queue. If a microtask adds another microtask, it will execute before any macrotasks.\n\nMicrotasks include: Promise callbacks (.then/.catch), MutationObserver, and queueMicrotask().\nMacrotasks include: setTimeout, setInterval, setImmediate (Node), and I/O callbacks.",
        interviewContext: "Crucial question. If you don't know the priority order, you cannot confidently predict the execution flow of any complex JavaScript application."
      }
    },

    // --- 5. IMPLEMENTATION (10%) ---
    {
      id: "el-implement-defer",
      topicId: "event-loop",
      objectiveId: "Explain the macro/micro task queues",
      category: "practice",
      type: "code-completion",
      difficulty: "intermediate",
      payload: {
        prompt: "Complete the code to defer the heavy function execution to the NEXT tick of the event loop, allowing the browser to render any pending UI changes first.",
        template: "console.log('Updating UI');\n\n{{blank1}}(() => {\n  heavyTask();\n}, {{blank2}});\n\nconsole.log('UI Updated synchronously');",
        answers: [{"blank1": "setTimeout", "blank2": "0"}],
        explanation: "By wrapping `heavyTask` in a `setTimeout` with a 0ms delay, we push it to the Macrotask Queue. This gives the Call Stack a chance to empty, allowing the Event Loop to hit the Render Queue and paint the UI before tackling the heavy task."
      }
    }
  ]
};
