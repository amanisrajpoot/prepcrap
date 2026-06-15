import { TopicPack } from "@/types/curriculum";

export const promisesPack: TopicPack = {
  topic: {
    id: "promises",
    moduleId: "js-async",
    trackId: "javascript",
    title: "Promises & Async/Await",
    order: 2,
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 40, 
      interviewFrequency: 9, 
      importance: 10,
      topGotchas: [
        "A .then() or .catch() ALWAYS returns a new Promise.",
        "Swallowed errors: if there is no .catch() at the end of a chain, or if an error is caught but not re-thrown, the subsequent .then() executes normally.",
        "Promise.all fails fast: one rejection rejects the entire Promise.all immediately."
      ]
    },
    objectives: ["Create and chain promises", "Handle asynchronous errors", "Convert promises to async/await"]
  },
  activities: [
    // --- 1. LEARNING (10%) ---
    {
      id: "prom-learn-match",
      topicId: "promises",
      objectiveId: "Create and chain promises",
      category: "learn",
      type: "progressive-match",
      difficulty: "foundation",
      payload: {
        prompt: "Match the Promise state to its description",
        terms: [
          { id: "t1", text: "Pending", definitionId: "d1" },
          { id: "t2", text: "Fulfilled", definitionId: "d2" },
          { id: "t3", text: "Rejected", definitionId: "d3" }
        ],
        definitions: [
          { id: "d1", text: "The initial state. Neither fulfilled nor rejected." },
          { id: "d2", text: "The operation completed successfully." },
          { id: "d3", text: "The operation failed." }
        ]
      }
    },

    // --- 2. PREDICT OUTPUT (40%) ---
    {
      id: "prom-predict-chain",
      topicId: "promises",
      objectiveId: "Create and chain promises",
      category: "practice",
      type: "code-prediction",
      difficulty: "intermediate",
      payload: {
        question: "What is the final output of this chain?",
        code: "Promise.resolve(1)\n  .then(val => {\n    console.log(val);\n    return val + 1;\n  })\n  .then(val => {\n    console.log(val);\n  })\n  .then(val => {\n    console.log(val);\n  });",
        options: [
          { id: "1", text: "1, 2, 3", isCorrect: false, explanation: "Does the second .then() return a value?" },
          { id: "2", text: "1, 2, undefined", isCorrect: true, explanation: "Correct! The first .then() returns 2. The second .then() receives 2 and logs it, but it explicitly returns nothing (undefined). Therefore, the third .then() receives undefined." },
          { id: "3", text: "1, undefined, undefined", isCorrect: false, explanation: "The first .then returns 2." },
          { id: "4", text: "1, 2, 2", isCorrect: false, explanation: "Promises do not pass down previous values automatically." }
        ]
      }
    },
    {
      id: "prom-predict-catch",
      topicId: "promises",
      objectiveId: "Handle asynchronous errors",
      category: "practice",
      type: "code-prediction",
      difficulty: "advanced",
      payload: {
        question: "What does this code log to the console?",
        code: "Promise.reject('Error')\n  .catch(err => {\n    console.log('Caught: ' + err);\n  })\n  .then(() => {\n    console.log('Continuing');\n  });",
        options: [
          { id: "1", text: "Caught: Error", isCorrect: false, explanation: "What does a .catch() block return?" },
          { id: "2", text: "Caught: Error, Continuing", isCorrect: true, explanation: "Correct! A .catch() block handles the error and returns a RESOLVED promise (unless you throw an error inside the catch). Because it resolves, the subsequent .then() executes normally." },
          { id: "3", text: "Continuing", isCorrect: false, explanation: "The catch block will execute." },
          { id: "4", text: "Throws UnhandledPromiseRejection", isCorrect: false, explanation: "The error is caught." }
        ]
      }
    },
    {
      id: "prom-predict-all",
      topicId: "promises",
      objectiveId: "Create and chain promises",
      category: "practice",
      type: "code-prediction",
      difficulty: "advanced",
      payload: {
        question: "Assuming API 2 fails, what happens here?",
        code: "const p1 = fetch('/api/1');\nconst p2 = fetch('/api/2'); // Rejects\nconst p3 = fetch('/api/3');\n\nPromise.all([p1, p2, p3])\n  .then(data => console.log('Success'))\n  .catch(err => console.log('Failed'));",
        options: [
          { id: "1", text: "Logs 'Success' if p1 and p3 succeed", isCorrect: false, explanation: "Promise.all requires all promises to succeed." },
          { id: "2", text: "Waits for p1 and p3, then logs 'Failed'", isCorrect: false, explanation: "Does it wait?" },
          { id: "3", text: "Logs 'Failed' immediately when p2 rejects", isCorrect: true, explanation: "Correct! Promise.all is 'fail-fast'. As soon as any single promise in the array rejects, the entire Promise.all immediately rejects, skipping the .then() and hitting the .catch(). It does not wait for the others to finish." },
          { id: "4", text: "Throws an unhandled rejection", isCorrect: false, explanation: "The .catch() handles the error." }
        ]
      }
    },

    // --- 3. DEBUGGING (25%) ---
    {
      id: "prom-debug-swallow",
      topicId: "promises",
      objectiveId: "Handle asynchronous errors",
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
        scenario: "The developer wants to log a generic error message, but they accidentally swallowed the error, hiding the real issue from the rest of the application.",
        code: "function fetchData() {\n  return fetch('/api/data')\n    .catch(err => {\n      console.log('Something went wrong');\n    });\n}",
        bugLine: 3,
        explanation: "By catching the error but not re-throwing it, the `.catch` block returns a successfully resolved promise (with a value of undefined). The caller of `fetchData()` will think the request succeeded. Fix it by adding `throw err;` inside the catch block."
      }
    },
    {
      id: "prom-debug-missing-await",
      topicId: "promises",
      objectiveId: "Convert promises to async/await",
      category: "practice",
      type: "debug",
      difficulty: "intermediate",
      payload: {
        scenario: "The developer expects the user object to be logged, but it logs 'Promise { <pending> }'.",
        code: "async function getUser() {\n  const res = await fetch('/user');\n  const data = res.json();\n  console.log(data);\n}",
        bugLine: 3,
        explanation: "The `res.json()` method is asynchronous and returns a Promise, not the parsed object. The developer forgot the `await` keyword. Fix it by changing line 3 to: `const data = await res.json();`"
      }
    },

    // --- 4. EXPLAIN (15%) ---
    {
      id: "prom-interview-async",
      topicId: "promises",
      objectiveId: "Convert promises to async/await",
      category: "evaluate",
      type: "interview",
      difficulty: "intermediate",
      payload: {
        question: "What is the relationship between Promises and the `async/await` syntax?",
        modelAnswer: "`async/await` is syntactic sugar on top of Promises. \n\nMarking a function as `async` guarantees that it will return a Promise (wrapping the return value if necessary). \n\nThe `await` keyword pauses the execution of the `async` function until the Promise settles, cleanly handling the `.then()` resolution and throwing errors that can be caught with standard `try/catch` blocks.",
        interviewContext: "Interviewers look for the word 'syntactic sugar' and the understanding that an async function implicitly returns a Promise."
      }
    },

    // --- 5. IMPLEMENTATION (10%) ---
    {
      id: "prom-implement-promisify",
      topicId: "promises",
      objectiveId: "Create and chain promises",
      category: "practice",
      type: "code-completion",
      difficulty: "advanced",
      payload: {
        prompt: "Wrap the classic callback-based setTimeout function into a Promise-based function.",
        template: "function delay(ms) {\n  return new {{blank1}}((resolve) => {\n    setTimeout({{blank2}}, ms);\n  });\n}",
        answers: [{"blank1": "Promise", "blank2": "resolve"}],
        explanation: "Creating a new Promise requires passing an executor function with `resolve` and `reject` arguments. You pass the `resolve` function directly into `setTimeout` so that the Promise resolves when the timer finishes."
      }
    }
  ]
};
