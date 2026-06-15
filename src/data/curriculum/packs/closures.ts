import { TopicPack } from "@/types/curriculum";

export const ClosuresPack: TopicPack = {
  topic: {
    id: "closures",
    moduleId: "js-foundations",
    trackId: "javascript",
    title: "Closures & Scope",
    order: 2,
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 45, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Stale closures in React hooks (referencing old state because the closure captured the variable at render time).",
        "The classic var in a for-loop setTimeout problem (all callbacks print the final loop value).",
        "Memory leaks from closures unintentionally keeping large objects alive."
      ]
    },
    objectives: ["Define a closure", "Identify closures in code", "Debug closure-related bugs", "Explain closures in interviews"]
  },
  activities: [
    // --- 1. LEARNING (10%) ---
    {
      id: "clos-learn-match",
      topicId: "closures",
      objectiveId: "Define a closure",
      category: "learn",
      type: "progressive-match",
      difficulty: "foundation",
      payload: {
        prompt: "Match the concept to its execution reality",
        terms: [
          { id: "t1", text: "Lexical Scope", definitionId: "d1" },
          { id: "t2", text: "Closure", definitionId: "d2" },
          { id: "t3", text: "Garbage Collection", definitionId: "d3" }
        ],
        definitions: [
          { id: "d1", text: "Determined at write-time; a function knows where it was defined." },
          { id: "d2", text: "A function bundled with references to its surrounding lexical environment." },
          { id: "d3", text: "Normally cleans up local variables after a function returns, unless a closure keeps them alive." }
        ]
      }
    },

    // --- 2. PREDICT OUTPUT (40%) ---
    {
      id: "clos-predict-var-loop",
      topicId: "closures",
      objectiveId: "Identify closures in code",
      category: "practice",
      type: "code-prediction",
      difficulty: "intermediate",
      payload: {
        question: "What does this code log to the console?",
        code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
        options: [
          { id: "1", text: "0, 1, 2", isCorrect: false, explanation: "This would happen if 'let' was used to create block scope." },
          { id: "2", text: "3, 3, 3", isCorrect: true, explanation: "Correct! 'var' is function-scoped. The loop finishes synchronously, setting 'i' to 3. Then, the 3 setTimeout closures execute. They all hold a reference to the exact same 'i' variable, which is now 3." },
          { id: "3", text: "undefined, undefined, undefined", isCorrect: false, explanation: "'i' is declared and initialized." },
          { id: "4", text: "Throws ReferenceError", isCorrect: false, explanation: "The variable exists." }
        ]
      }
    },
    {
      id: "clos-predict-encapsulation",
      topicId: "closures",
      objectiveId: "Identify closures in code",
      category: "practice",
      type: "code-prediction",
      difficulty: "intermediate",
      payload: {
        question: "What is the result of executing this code?",
        code: "function createCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\n\nconst counter1 = createCounter();\nconst counter2 = createCounter();\n\ncounter1();\ncounter1();\nconsole.log(counter2());",
        options: [
          { id: "1", text: "3", isCorrect: false, explanation: "Do counter1 and counter2 share the same state?" },
          { id: "2", text: "1", isCorrect: true, explanation: "Correct! Every time `createCounter()` is called, a brand new execution context is created with its own 'count' variable. `counter1` and `counter2` form closures over entirely separate instances of 'count'." },
          { id: "3", text: "2", isCorrect: false, explanation: "counter2 was only called once." },
          { id: "4", text: "undefined", isCorrect: false, explanation: "The closure maintains access to the count variable." }
        ]
      }
    },
    {
      id: "clos-predict-stale",
      topicId: "closures",
      objectiveId: "Identify closures in code",
      category: "practice",
      type: "code-prediction",
      difficulty: "advanced",
      payload: {
        question: "Assume 'count' is initially 0. What happens when the button is clicked?",
        code: "function Counter() {\n  const [count, setCount] = useState(0);\n\n  function handleClick() {\n    setTimeout(() => {\n      setCount(count + 1);\n    }, 3000);\n  }\n\n  return <button onClick={handleClick}>Click</button>;\n}\n// User clicks the button 3 times rapidly.",
        options: [
          { id: "1", text: "Count becomes 3", isCorrect: false, explanation: "Think about what value of 'count' the closure captures." },
          { id: "2", text: "Count becomes 1", isCorrect: true, explanation: "Correct! This is a classic Stale Closure. The `handleClick` function closes over the `count` variable from the specific render it was created in (where count is 0). All 3 clicks schedule an update of `0 + 1`. React sets the state to 1 three times." },
          { id: "3", text: "Count becomes 0", isCorrect: false, explanation: "The update does execute." },
          { id: "4", text: "Throws Error", isCorrect: false, explanation: "This is valid code, just logically flawed." }
        ]
      }
    },

    // --- 3. DEBUGGING (25%) ---
    {
      id: "clos-debug-stale-fix",
      topicId: "closures",
      objectiveId: "Debug closure-related bugs",
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
        scenario: "Fix the Stale Closure bug from the previous question so that clicking 3 times rapidly correctly results in a final count of 3.",
        code: "function handleClick() {\n  setTimeout(() => {\n    setCount(count + 1);\n  }, 3000);\n}",
        bugLine: 3,
        explanation: "Because the timeout closure captures the 'count' variable from the current render, it is stale. To fix this, use the functional updater pattern: `setCount(prevCount => prevCount + 1)`. This guarantees React will pass the most recent state into the function, bypassing the stale closure completely."
      }
    },
    {
      id: "clos-debug-loop-fix",
      topicId: "closures",
      objectiveId: "Debug closure-related bugs",
      category: "practice",
      type: "debug",
      difficulty: "intermediate",
      payload: {
        scenario: "The developer wants to print 0, 1, 2 sequentially with a delay. Instead it prints 3, 3, 3. Find the bug.",
        code: "function printNumbers() {\n  for (var i = 0; i < 3; i++) {\n    setTimeout(function() {\n      console.log(i);\n    }, i * 1000);\n  }\n}",
        bugLine: 2,
        explanation: "The issue is `var i`. `var` creates a function-scoped variable. All three timeouts share the same closure environment containing a single `i`. By the time the timeouts run, the loop has finished and `i` is 3. Fix it by changing `var i = 0` to `let i = 0`, which creates a new block-scoped `i` for every iteration of the loop."
      }
    },

    // --- 4. EXPLAIN (15%) ---
    {
      id: "clos-interview-memory",
      topicId: "closures",
      objectiveId: "Explain closures in interviews",
      category: "evaluate",
      type: "interview",
      difficulty: "advanced",
      payload: {
        question: "How do closures affect garbage collection, and how might they cause memory leaks?",
        modelAnswer: "Normally, when a function finishes executing, its local variables are garbage collected to free memory. \n\nHowever, if a function returns an inner function (creating a closure), that inner function retains references to the outer function's scope. The garbage collector cannot clean up those outer variables as long as the inner function is still accessible.\n\nMemory leaks occur if a closure unintentionally captures and holds onto large objects (like heavy DOM nodes or massive arrays) that are no longer needed, preventing the GC from reclaiming that memory.",
        interviewContext: "This differentiates juniors (who just know the definition) from seniors (who understand the system-level implications)."
      }
    },

    // --- 5. IMPLEMENTATION (10%) ---
    {
      id: "clos-implement-encapsulation",
      topicId: "closures",
      objectiveId: "Define a closure",
      category: "practice",
      type: "code-completion",
      difficulty: "intermediate",
      payload: {
        prompt: "Use a closure to create a private variable. Implement 'withdraw' so it subtracts the amount and returns the new balance. Do not expose 'balance'.",
        template: "function createBank(initial) {\n  let balance = initial;\n  return {\n    withdraw: function(amount) {\n      {{blank1}} -= amount;\n      return {{blank2}};\n    }\n  };\n}",
        answers: [{"blank1": "balance", "blank2": "balance"}],
        explanation: "By keeping 'balance' within the scope of 'createBank' and returning an object with methods that reference it, 'balance' becomes truly private. It can only be modified via the closure methods provided."
      }
    }
  ]
};
