import { CurriculumTrack, CurriculumModule, CurriculumTopic, Goal } from "@/types/curriculum";

export const GOALS: Goal[] = [
  {
    id: "frontend-mastery",
    title: "Frontend Mastery",
    description: "Master React, Next.js, and core web fundamentals to build scalable UIs.",
    includedTrackIds: ["javascript", "react", "browser-internals", "networking", "cs-fundamentals", "frontend-interview"]
  },
  {
    id: "fullstack-mern",
    title: "Fullstack Developer (MERN)",
    description: "End-to-end engineering using MongoDB, Express, React, and Node.js.",
    includedTrackIds: ["javascript", "react", "nodejs", "express", "mongodb", "system-design", "cs-fundamentals", "fullstack-interview"]
  },
  {
    id: "backend-mastery",
    title: "Backend & Systems",
    description: "Deep dive into APIs, databases, caching, and scalable architecture.",
    includedTrackIds: ["nodejs", "postgresql", "system-design", "networking", "cs-fundamentals", "backend-interview"]
  }
];

export const TRACKS: CurriculumTrack[] = [
  { id: "javascript", title: "JavaScript Core", type: "technology" },
  { id: "react", title: "React Architecture", type: "technology" },
  { id: "nodejs", title: "Node.js Fundamentals", type: "technology" },
  { id: "postgresql", title: "PostgreSQL Deep Dive", type: "technology" },
  { id: "system-design", title: "System Design", type: "technology" },
  { id: "browser-internals", title: "Browser Internals", type: "technology" },
  { id: "networking", title: "Networking", type: "technology" },
  { id: "cs-fundamentals", title: "CS Fundamentals", type: "technology" },
  // Outcome paths
  { id: "frontend-interview", title: "Frontend Interview Guide", type: "outcome" },
  { id: "backend-interview", title: "Backend Interview Guide", type: "outcome" },
  { id: "fullstack-interview", title: "Fullstack Interview Guide", type: "outcome" },
];

export const MODULES: CurriculumModule[] = [
  // JS
  { id: "js-foundations", trackId: "javascript", title: "Foundations", order: 1 },
  { id: "js-async", trackId: "javascript", title: "Asynchronous Programming", order: 2 },
  // React
  { id: "react-core", trackId: "react", title: "Core Architecture & Hooks", order: 1 },
  { id: "react-advanced", trackId: "react", title: "Performance & Modern UX", order: 2 },
  // Node
  { id: "node-runtime-perf", trackId: "nodejs", title: "Runtime & Performance", order: 1 },
  { id: "node-async-streams", trackId: "nodejs", title: "Async & Streams", order: 2 },
  { id: "node-architecture", trackId: "nodejs", title: "Architecture & Scaling", order: 3 },
  // System Design
  { id: "sd-requirements", trackId: "system-design", title: "Requirements & Estimation", order: 1 },
  { id: "sd-storage", trackId: "system-design", title: "Storage & Data Modeling", order: 2 },
  { id: "sd-communication", trackId: "system-design", title: "Communication & Distributed Systems", order: 3 },
  { id: "sd-reliability", trackId: "system-design", title: "Reliability & Failure Engineering", order: 4 },
  { id: "sd-case-studies", trackId: "system-design", title: "Interviews & Case Studies", order: 5 },
  // CS Fundamentals
  { id: "cs-dsa", trackId: "cs-fundamentals", title: "Data Structures & Algorithms", order: 1 },
  { id: "cs-systems", trackId: "cs-fundamentals", title: "Systems & Concurrency", order: 2 },
];

export const TOPICS: CurriculumTopic[] = [
  // JS Foundations
  { 
    id: "execution-context", 
    moduleId: "js-foundations", 
    trackId: "javascript", 
    title: "Execution Context & Call Stack", 
    order: 1, 
    associatedOutcomePaths: ["frontend-interview", "fullstack-interview"],
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
  { 
    id: "closures", 
    moduleId: "js-foundations", 
    trackId: "javascript", 
    title: "Closures & Scope", 
    order: 2, 
    associatedOutcomePaths: ["frontend-interview", "fullstack-interview"],
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
  { 
    id: "prototypes", 
    moduleId: "js-foundations", 
    trackId: "javascript", 
    title: "Prototypes & OOP", 
    order: 3, 
    associatedOutcomePaths: ["frontend-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 45, 
      interviewFrequency: 7, 
      importance: 8,
      topGotchas: [
        "Arrow functions do not have a prototype property and cannot be used as constructors.",
        "Modifying Object.prototype directly affects all objects, including for...in loops.",
        "The difference between __proto__ (the actual prototype of the object) and .prototype (the object used to build __proto__ when using 'new')."
      ]
    },
    objectives: ["Understand prototypal inheritance", "Differentiate between __proto__ and prototype", "Implement inheritance without classes"]
  },
  
  // JS Async
  { 
    id: "event-loop", 
    moduleId: "js-async", 
    trackId: "javascript", 
    title: "The Event Loop", 
    order: 1, 
    associatedOutcomePaths: ["frontend-interview", "backend-interview"],
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
  { 
    id: "promises", 
    moduleId: "js-async", 
    trackId: "javascript", 
    title: "Promises & Async/Await", 
    order: 2, 
    associatedOutcomePaths: ["frontend-interview", "backend-interview"],
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

  // React Core
  { 
    id: "react-rendering-engine", 
    moduleId: "react-core", 
    trackId: "react", 
    title: "React Rendering Engine", 
    order: 1, 
    associatedOutcomePaths: ["frontend-interview", "fullstack-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 60, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Rendering !== DOM Update. A component function executing does not mean the DOM will be mutated.",
        "State Preservation: React preserves state based on the component's position in the UI tree, not its props.",
        "Fiber enables interruptible rendering, but the commit phase (DOM updates) is always synchronous.",
        "Keys must be tied to the data identity, not the array index, to prevent incorrect state mapping across remounts."
      ]
    },
    objectives: ["Understand Fiber and Reconciliation", "Identify why a component rerendered", "Debug state preservation bugs"]
  },
  { 
    id: "hooks-mental-models", 
    moduleId: "react-core", 
    trackId: "react", 
    title: "Hooks Mental Models", 
    order: 2, 
    associatedOutcomePaths: ["frontend-interview", "fullstack-interview"],
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 60, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Stale Closures: A hook capturing variables from the render scope where it was created, leading to bugs when dependencies are missing.",
        "Missing useEffect cleanup functions (e.g. window.addEventListener) causing memory leaks and duplicate executions.",
        "Thinking setState is synchronous and trying to read the value immediately after setting it."
      ]
    },
    objectives: ["Reason about useState batching", "Avoid stale closures", "Understand the actual purpose of useRef"]
  },
  
  // React Advanced
  { 
    id: "react-performance", 
    moduleId: "react-advanced", 
    trackId: "react", 
    title: "React Performance", 
    order: 1, 
    associatedOutcomePaths: ["frontend-interview", "senior-engineer"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 50, 
      interviewFrequency: 9, 
      importance: 9,
      topGotchas: [
        "Context Overuse: Changing a Context provider value causes the ENTIRE consuming tree to rerender.",
        "Broken Memoization Chains: Passing an unmemoized prop to a React.memo child makes the memoization entirely useless.",
        "Prematurely optimizing everything with useMemo/useCallback—the comparison overhead often exceeds the computation cost."
      ]
    },
    objectives: ["Debug broken memoization", "Optimize Context providers", "Analyze render bottlenecks"]
  },
  { 
    id: "async-ux-patterns", 
    moduleId: "react-advanced", 
    trackId: "react", 
    title: "Async UX Patterns", 
    order: 2, 
    associatedOutcomePaths: ["frontend-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 45, 
      interviewFrequency: 8, 
      importance: 9,
      topGotchas: [
        "useTransition does not make code execute faster; it merely changes the priority of the state update to keep the UI responsive.",
        "What Suspense actually does (catching thrown promises) vs what developers think it does (just a generic loading spinner).",
        "Declaring a debounced function inside the render body without useCallback, creating a new timer instance on every render."
      ]
    },
    objectives: ["Implement Debounce/Throttle correctly", "Understand useTransition priorities", "Reason about Suspense boundaries"]
  },
  { 
    id: "modern-react", 
    moduleId: "react-advanced", 
    trackId: "react", 
    title: "Modern React (React 19+)", 
    order: 3, 
    associatedOutcomePaths: ["frontend-interview", "senior-engineer"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 40, 
      interviewFrequency: 7, 
      importance: 8,
      topGotchas: [
        "React 18 Automatic Batching applies to promises and timeouts, unlike React 17 which only batched React event handlers.",
        "React Server Components execute entirely on the server and do not have access to client-side interactivity (hooks, state, events).",
        "The React Compiler reduces the need for manual useMemo/useCallback by automatically memoizing the component graph during build time."
      ]
    },
    objectives: ["Understand Server Components", "Explain React 18 Batching", "Reason about the React Compiler's impact"]
  },

  // Node.js Topics
  { 
    id: "node-runtime", 
    moduleId: "node-runtime-perf", 
    trackId: "nodejs", 
    title: "Node Runtime & Event Loop", 
    order: 1, 
    associatedOutcomePaths: ["backend-interview", "fullstack-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 60, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Microtasks (Promises, process.nextTick) execute before Macrotasks (setTimeout, setImmediate).",
        "A while(true) loop blocks the main thread completely, preventing any incoming HTTP requests from being processed.",
        "setImmediate runs after the Poll phase, while setTimeout(0) depends on timer evaluation, leading to inconsistent order in the main module but consistent order in an I/O callback."
      ]
    },
    objectives: ["Predict Event Loop execution order", "Understand process.nextTick vs setImmediate", "Explain single-threaded concurrency"]
  },
  { 
    id: "node-performance", 
    moduleId: "node-runtime-perf", 
    trackId: "nodejs", 
    title: "Performance & Reliability", 
    order: 2, 
    associatedOutcomePaths: ["backend-interview", "senior-engineer"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 55, 
      interviewFrequency: 9, 
      importance: 10,
      topGotchas: [
        "JSON.parse(hugePayload) is synchronous and blocks the event loop for all other users.",
        "Regex DOS: Unbounded backtracking in regex like /(a+)+/ can freeze the server.",
        "Treating Programmer Errors (bugs) as Operational Errors (expected) and failing to crash/restart the process.",
        "Global variables caching data forever causing catastrophic memory leaks."
      ]
    },
    objectives: ["Identify Event Loop blockers", "Debug memory leaks", "Implement robust error boundaries"]
  },
  { 
    id: "node-streams", 
    moduleId: "node-async-streams", 
    trackId: "nodejs", 
    title: "Streams, Buffers & Backpressure", 
    order: 1, 
    associatedOutcomePaths: ["backend-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 50, 
      interviewFrequency: 8, 
      importance: 9,
      topGotchas: [
        "Loading massive files entirely into memory (fs.readFile) instead of piping streams, causing OOM crashes.",
        "Ignoring Backpressure: Failing to pause the readable stream when the writable stream's buffer is full.",
        "Misunderstanding that Buffers are raw memory allocations outside the V8 heap."
      ]
    },
    objectives: ["Understand why streams exist vs readFile", "Visualize backpressure", "Pipe streams correctly"]
  },
  { 
    id: "node-concurrency", 
    moduleId: "node-async-streams", 
    trackId: "nodejs", 
    title: "Async Patterns & Concurrency", 
    order: 2, 
    associatedOutcomePaths: ["backend-interview", "fullstack-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 45, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Using Promise.all for 10,000 items and crashing downstream services instead of chunking or limiting concurrency.",
        "Using Promise.all instead of Promise.allSettled when partial failures are acceptable.",
        "Failing to implement retry logic with exponential backoff for flaky 3rd party APIs."
      ]
    },
    objectives: ["Limit async concurrency", "Implement Retry and Circuit Breaker patterns", "Understand Promise.allSettled"]
  },
  { 
    id: "node-scalability", 
    moduleId: "node-architecture", 
    trackId: "nodejs", 
    title: "Scalability & Distributed Systems", 
    order: 1, 
    associatedOutcomePaths: ["backend-interview", "senior-engineer"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 60, 
      interviewFrequency: 9, 
      importance: 10,
      topGotchas: [
        "Designing stateful servers (in-memory sessions) instead of stateless architecture, preventing horizontal scaling.",
        "Confusing 'cluster' (multiple processes) with 'worker_threads' (shared memory tasks).",
        "Using sticky sessions as a crutch instead of moving state to a Redis store."
      ]
    },
    objectives: ["Design stateless backend architectures", "Understand Horizontal Scaling", "Compare Message Queues to direct HTTP"]
  },
  { 
    id: "node-architecture", 
    moduleId: "node-architecture", 
    trackId: "nodejs", 
    title: "Backend Architecture", 
    order: 2, 
    associatedOutcomePaths: ["backend-interview", "senior-engineer"],
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 45, 
      interviewFrequency: 8, 
      importance: 9,
      topGotchas: [
        "Idempotency: Failing to handle network retries safely for POST requests (e.g., charging a user twice).",
        "Hardcoding configuration instead of passing it via environment variables (Twelve-Factor App).",
        "Tight coupling making code untestable instead of using Dependency Injection."
      ]
    },
    objectives: ["Implement Idempotency", "Apply Twelve-Factor App principles", "Understand Dependency Injection"]
  },

  // System Design Topics
  { 
    id: "sd-requirements", 
    moduleId: "sd-requirements", 
    trackId: "system-design", 
    title: "Requirements & Estimation", 
    order: 1, 
    associatedOutcomePaths: ["backend-interview", "fullstack-interview"],
    metadata: { difficulty: "intermediate", estimatedMinutes: 45, interviewFrequency: 10, importance: 10 },
    objectives: ["Define Functional vs Non-Functional Requirements", "Perform Back-of-the-envelope Math", "Ask clarifying scale questions"]
  },
  { 
    id: "sd-storage", 
    moduleId: "sd-storage", 
    trackId: "system-design", 
    title: "Storage & Data Modeling", 
    order: 2, 
    associatedOutcomePaths: ["backend-interview", "fullstack-interview"],
    metadata: { difficulty: "advanced", estimatedMinutes: 60, interviewFrequency: 10, importance: 10 },
    objectives: ["Evaluate SQL vs NoSQL tradeoffs", "Understand Partitioning and Replication", "Identify Consistency constraints"]
  },
  { 
    id: "sd-communication", 
    moduleId: "sd-communication", 
    trackId: "system-design", 
    title: "Communication & Distributed Systems", 
    order: 3, 
    associatedOutcomePaths: ["backend-interview"],
    metadata: { difficulty: "advanced", estimatedMinutes: 60, interviewFrequency: 9, importance: 9 },
    objectives: ["Compare REST, gRPC, and GraphQL", "Decide between Sync vs Async processing", "Design exactly-once delivery semantics"]
  },
  { 
    id: "sd-reliability", 
    moduleId: "sd-reliability", 
    trackId: "system-design", 
    title: "Reliability & Failure Engineering", 
    order: 4, 
    associatedOutcomePaths: ["backend-interview", "senior-engineer"],
    metadata: { difficulty: "advanced", estimatedMinutes: 50, interviewFrequency: 10, importance: 10 },
    objectives: ["Mitigate Cache Stampedes", "Prevent Retry Storms", "Design for Regional Failures"]
  },
  { 
    id: "sd-case-studies", 
    moduleId: "sd-case-studies", 
    trackId: "system-design", 
    title: "System Design Case Studies", 
    order: 5, 
    associatedOutcomePaths: ["backend-interview", "fullstack-interview"],
    metadata: { difficulty: "advanced", estimatedMinutes: 90, interviewFrequency: 10, importance: 10 },
    objectives: ["Evolve an architecture through changing constraints", "Communicate tradeoffs", "Design real-world systems like URL Shorteners"]
  },
  
  // CS Fundamentals
  { 
    id: "dsa-patterns", 
    moduleId: "cs-dsa", 
    trackId: "cs-fundamentals", 
    title: "Core Data Structures", 
    order: 1, 
    metadata: { difficulty: "intermediate", estimatedMinutes: 60, interviewFrequency: 10, importance: 9 },
    objectives: ["Understand arrays and linked lists", "Implement hash maps", "Analyze time/space complexity"]
  },
  { 
    id: "dsa-trees-graphs", 
    moduleId: "cs-dsa", 
    trackId: "cs-fundamentals", 
    title: "Trees, Graphs & Tries", 
    order: 2, 
    associatedOutcomePaths: ["fullstack-interview", "backend-interview"],
    metadata: { difficulty: "advanced", estimatedMinutes: 90, interviewFrequency: 8, importance: 8 },
    objectives: ["Traverse a BST", "Implement BFS and DFS", "Understand when to use a Trie for autocomplete"]
  },
  { 
    id: "caching-os", 
    moduleId: "cs-systems", 
    trackId: "cs-fundamentals", 
    title: "Caching & OS Basics", 
    order: 3, 
    metadata: { difficulty: "advanced", estimatedMinutes: 45, interviewFrequency: 7, importance: 8 },
    objectives: ["Understand cache eviction policies (LRU/LFU)", "Explain process vs thread", "Identify race conditions"]
  }
];
