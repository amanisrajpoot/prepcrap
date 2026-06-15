import { TopicPack } from "@/types/curriculum";

export const executioncontextPack: TopicPack = {
  topic: {
    id: "execution-context",
    moduleId: "js-foundations",
    trackId: "javascript",
    title: "Execution Context & Call Stack",
    order: 1,
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 30, 
      interviewFrequency: 9, 
      importance: 10,
      topGotchas: [
        "Variables declared with 'var' are hoisted but initialized to undefined, while 'let' and 'const' are hoisted but remain in the Temporal Dead Zone.",
        "Function declarations are fully hoisted (body included), while function expressions (even with var) are treated like variables.",
        "The value of 'this' is determined at the creation phase of the execution context, not lexically (for regular functions)."
      ]
    },
    objectives: ["Understand the execution context creation phase", "Explain hoisting", "Trace the call stack"]
  },
  activities: [
    // --- 1. LEARNING (10%) ---
    {
      id: "ec-timeline",
      topicId: "execution-context",
      objectiveId: "Understand the execution context creation phase",
      category: "learn",
      type: "timeline",
      difficulty: "foundation",
      payload: {
        mode: "explore",
        steps: [
          {
            title: "1. Global Execution Context Created",
            description: "The JS Engine creates the Global Object (window/global) and sets 'this' to point to it."
          },
          {
            title: "2. Memory Creation Phase (Hoisting)",
            description: "The engine scans for variables and functions. Function declarations are stored entirely in memory. 'var' variables are set to undefined. 'let' and 'const' are allocated but uninitialized (TDZ)."
          },
          {
            title: "3. Execution Phase",
            description: "Code runs line by line. Variables are assigned their actual values. Function calls push new Execution Contexts onto the Call Stack."
          },
          {
            title: "4. Call Stack Pop",
            description: "Once a function finishes executing, its Execution Context is popped off the Call Stack and memory is garbage collected."
          }
        ]
      }
    },

    // --- 2. PREDICT OUTPUT (40%) ---
    {
      id: "ec-predict-var-let",
      topicId: "execution-context",
      objectiveId: "Explain hoisting",
      category: "practice",
      type: "code-prediction",
      difficulty: "intermediate",
      payload: {
        question: "What is the output of the following code?",
        code: "console.log(a);\nconsole.log(b);\nvar a = 1;\nlet b = 2;",
        options: [
          { id: "1", text: "1, 2", isCorrect: false, explanation: "Variables are not initialized at the top." },
          { id: "2", text: "undefined, ReferenceError", isCorrect: true, explanation: "Correct! 'var' is hoisted and initialized to undefined. 'let' is hoisted but remains in the Temporal Dead Zone (TDZ), throwing a ReferenceError." },
          { id: "3", text: "ReferenceError, ReferenceError", isCorrect: false, explanation: "'var' declarations do not throw ReferenceErrors when hoisted." },
          { id: "4", text: "undefined, undefined", isCorrect: false, explanation: "'let' and 'const' do not initialize to undefined." }
        ]
      }
    },
    {
      id: "ec-predict-functions",
      topicId: "execution-context",
      objectiveId: "Explain hoisting",
      category: "practice",
      type: "code-prediction",
      difficulty: "intermediate",
      payload: {
        question: "What happens when this code executes?",
        code: "foo();\nbar();\n\nfunction foo() {\n  console.log('A');\n}\n\nvar bar = function() {\n  console.log('B');\n};",
        options: [
          { id: "1", text: "Logs A, then Logs B", isCorrect: false, explanation: "Remember how function expressions are hoisted compared to declarations." },
          { id: "2", text: "Logs A, then throws TypeError: bar is not a function", isCorrect: true, explanation: "Correct! 'foo' is a function declaration and is fully hoisted. 'bar' is a var declaration, so it is hoisted and initialized to 'undefined'. Attempting to call undefined() throws a TypeError." },
          { id: "3", text: "Throws ReferenceError", isCorrect: false, explanation: "Neither are in the TDZ." },
          { id: "4", text: "Logs B, then Logs A", isCorrect: false, explanation: "Execution is top-to-bottom." }
        ]
      }
    },
    {
      id: "ec-predict-this",
      topicId: "execution-context",
      objectiveId: "Understand the execution context creation phase",
      category: "practice",
      type: "code-prediction",
      difficulty: "advanced",
      payload: {
        question: "What does this code log to the console?",
        code: "const obj = {\n  name: 'Alice',\n  sayName: function() {\n    console.log(this.name);\n  }\n};\n\nconst greet = obj.sayName;\ngreet();",
        options: [
          { id: "1", text: "Alice", isCorrect: false, explanation: "'this' is determined at call time, not definition time." },
          { id: "2", text: "undefined (or throws in strict mode)", isCorrect: true, explanation: "Correct! When 'greet()' is called, it is invoked as a plain function, not a method of 'obj'. Therefore, its execution context binds 'this' to the global object (which has no 'name') or undefined in strict mode." },
          { id: "3", text: "null", isCorrect: false, explanation: "It does not default to null." },
          { id: "4", text: "ReferenceError", isCorrect: false, explanation: "The function exists and executes, it just has the wrong 'this' context." }
        ]
      }
    },

    // --- 3. DEBUGGING (25%) ---
    {
      id: "ec-debug-tdz",
      topicId: "execution-context",
      objectiveId: "Explain hoisting",
      category: "practice",
      type: "debug",
      difficulty: "intermediate",
      payload: {
        scenario: "This developer thought that because 'name' was defined globally, the console.log would print 'Global'. Instead it crashes.",
        code: "let name = 'Global';\n\nfunction printName() {\n  console.log(name);\n  let name = 'Local';\n}\n\nprintName();",
        bugLine: 4,
        explanation: "The 'let name = \"Local\"' declaration inside the function creates a new block scope. It is hoisted to the top of the function but stays in the Temporal Dead Zone (TDZ) until line 5. Because it is hoisted, it shadows the global 'name' variable, causing the console.log on line 4 to hit the TDZ and throw a ReferenceError."
      }
    },
    {
      id: "ec-debug-callback",
      topicId: "execution-context",
      objectiveId: "Understand the execution context creation phase",
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
        scenario: "The user profile is supposed to log 'Welcome, Bob' after 1 second. Instead, it logs 'Welcome, undefined'.",
        code: "class Profile {\n  constructor(name) {\n    this.name = name;\n  }\n\n  greet() {\n    console.log('Welcome, ' + this.name);\n  }\n}\n\nconst user = new Profile('Bob');\nsetTimeout(user.greet, 1000);",
        bugLine: 12,
        explanation: "Passing 'user.greet' as a callback strips it of its execution context. When setTimeout executes the function, it calls it as a plain function, binding 'this' to the global object (or undefined). Fix it by wrapping it in an arrow function `() => user.greet()` or using `.bind()`."
      }
    },

    // --- 4. EXPLAIN (15%) ---
    {
      id: "ec-interview-hoisting",
      topicId: "execution-context",
      objectiveId: "Explain hoisting",
      category: "evaluate",
      type: "interview",
      difficulty: "intermediate",
      payload: {
        question: "Can you explain the difference in hoisting behavior between 'var', 'let', and 'const'?",
        modelAnswer: "All three are hoisted to the top of their scope during the Memory Creation phase. \n\nHowever, 'var' is initialized to 'undefined', meaning you can access it before its declaration without a crash.\n\n'let' and 'const' are hoisted but remain uninitialized in a state called the Temporal Dead Zone (TDZ). Attempting to access them before the actual declaration line executes will throw a ReferenceError.",
        interviewContext: "Interviewers ask this to see if you understand the Temporal Dead Zone, not just that 'var is bad'."
      }
    },
    {
      id: "ec-interview-context",
      topicId: "execution-context",
      objectiveId: "Understand the execution context creation phase",
      category: "evaluate",
      type: "interview",
      difficulty: "advanced",
      payload: {
        question: "Explain what an Execution Context is and the two phases involved in its lifecycle.",
        modelAnswer: "An Execution Context is the environment where JavaScript code is evaluated and executed. \n\n1. Memory Creation Phase: The JS engine scans the code, allocating memory for variables and functions (hoisting). It also establishes the 'this' keyword and the outer environment reference.\n\n2. Execution Phase: The JS engine executes the code line by line, assigning actual values to variables and pushing new function execution contexts onto the Call Stack as they are invoked.",
        interviewContext: "This is a senior-level question. Candidates who only know React struggle to explain how the underlying JS engine actually parses and runs their code."
      }
    },

    // --- 5. IMPLEMENTATION (10%) ---
    {
      id: "ec-implement-bind",
      topicId: "execution-context",
      objectiveId: "Understand the execution context creation phase",
      category: "practice",
      type: "code-completion",
      difficulty: "advanced",
      payload: {
        prompt: "Fix the callback so that 'this.name' properly resolves to 'Alice' without using an arrow function.",
        template: "const obj = {\n  name: 'Alice',\n  sayHello: function() {\n    console.log(this.name);\n  }\n};\n\nsetTimeout({{blank1}}, 1000);",
        answers: ["obj.sayHello.bind(obj)"],
        explanation: "By calling .bind(obj), you create a new function with its Execution Context explicitly hard-bound to the 'obj' object, ensuring 'this' does not default to the global object."
      }
    }
  ]
};
