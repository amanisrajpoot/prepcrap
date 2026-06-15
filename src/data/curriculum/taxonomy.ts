import { CurriculumTrack, CurriculumModule, CurriculumTopic, Goal } from "@/types/curriculum";

export const GOALS: Goal[] = [
  {
    id: "frontend-mastery",
    title: "Frontend Mastery",
    description: "Master React, Next.js, and core web fundamentals to build scalable UIs.",
    includedTrackIds: ["javascript", "react", "html-css", "browser-internals", "frontend-interview"]
  },
  {
    id: "fullstack-mern",
    title: "Fullstack Developer (MERN)",
    description: "End-to-end engineering using MongoDB, Express, React, and Node.js.",
    includedTrackIds: ["javascript", "react", "html-css", "nodejs", "express", "mongodb", "system-design", "dsa", "fullstack-interview"]
  },
  {
    id: "backend-mastery",
    title: "Backend & Systems",
    description: "Deep dive into APIs, databases, caching, and scalable architecture.",
    includedTrackIds: ["nodejs", "postgresql", "system-design", "networking", "backend-interview"]
  },
  {
    id: "dsa-fullstack",
    title: "DSA for Full Stack",
    description: "Essential data structures, algorithms, and core patterns actually asked in MERN interviews.",
    includedTrackIds: ["dsa"]
  }
];

export const TRACKS: CurriculumTrack[] = [
  { id: "javascript", title: "JavaScript Core", type: "technology" },
  { id: "react", title: "React Architecture", type: "technology" },
  { id: "nodejs", title: "Node.js Fundamentals", type: "technology" },
  { id: "postgresql", title: "PostgreSQL Deep Dive", type: "technology" },
  { id: "system-design", title: "System Design", type: "technology" },
  { id: "html-css", title: "HTML & CSS Architecture", type: "technology" },
  { id: "browser-internals", title: "Browser Internals", type: "technology" },
  { id: "networking", title: "Networking", type: "technology" },
  { id: "dsa", title: "DSA for Full Stack", type: "technology" },
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
  // DSA
  { id: "dsa-patterns", trackId: "dsa", title: "Core Data Structures & Patterns", order: 1 },
  { id: "dsa-trees", trackId: "dsa", title: "Trees, Graphs & Recursion", order: 2 },
  // HTML & CSS
  { id: "html-a11y", trackId: "html-css", title: "Semantic HTML & Accessibility", order: 1 },
  { id: "css-architecture", trackId: "html-css", title: "CSS Architecture & Layouts", order: 2 },
  // Browser Internals
  { id: "browser-rendering", trackId: "browser-internals", title: "Browser Rendering & Performance", order: 1 },
  { id: "browser-network", trackId: "browser-internals", title: "Security & Web APIs", order: 2 },
  // Frontend Interview
  { id: "fi-system-design", trackId: "frontend-interview", title: "Frontend System Design", order: 1 },
  { id: "fi-behavioral", trackId: "frontend-interview", title: "Behavioral & Communication", order: 2 },
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

  // Browser Internals Topics
  { 
    id: "browser-rendering", 
    moduleId: "browser-rendering", 
    trackId: "browser-internals", 
    title: "Critical Rendering Path", 
    order: 1, 
    associatedOutcomePaths: ["frontend-interview", "fullstack-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 50, 
      interviewFrequency: 8, 
      importance: 9,
      topGotchas: [
        "Animating layout properties like margin-left forces a full Reflow (Layout) on every frame.",
        "Synchronous script tags block DOM parsing because the script might call document.write().",
        "The GPU can only accelerate properties like transform and opacity (Composite phase)."
      ]
    },
    objectives: ["Explain Reflow vs Repaint", "Optimize the Critical Rendering Path", "Understand GPU Acceleration"]
  },
  { 
    id: "browser-security", 
    moduleId: "browser-network", 
    trackId: "browser-internals", 
    title: "Browser Security (CORS, XSS)", 
    order: 2, 
    associatedOutcomePaths: ["frontend-interview", "fullstack-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 60, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "CORS does not stop requests from being sent; it stops the browser from reading the response.",
        "Storing JWTs in localStorage makes them vulnerable to XSS.",
        "Preflight OPTIONS requests are triggered by custom headers or non-simple content types."
      ]
    },
    objectives: ["Fix CORS errors safely", "Prevent XSS and CSRF", "Configure Content Security Policy (CSP)"]
  },
  { 
    id: "browser-storage", 
    moduleId: "browser-network", 
    trackId: "browser-internals", 
    title: "Storage & Web APIs", 
    order: 3, 
    associatedOutcomePaths: ["frontend-interview"],
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 40, 
      interviewFrequency: 7, 
      importance: 8,
      topGotchas: [
        "localStorage is synchronous and can block the main thread if reading large amounts of data.",
        "HttpOnly cookies cannot be read by JavaScript, protecting them from XSS.",
        "IndexedDB is asynchronous but has an extremely complex API compared to localStorage."
      ]
    },
    objectives: ["Choose the right storage mechanism", "Understand HttpOnly vs Secure cookies", "Explain WebSockets vs Polling"]
  },

  // Frontend Interview Topics
  { 
    id: "fi-system-design", 
    moduleId: "fi-system-design", 
    trackId: "frontend-interview", 
    title: "Frontend System Design", 
    order: 1, 
    associatedOutcomePaths: ["frontend-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 90, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Jumping straight to coding without discussing state architecture, network pagination, or accessibility.",
        "Failing to normalize relational data in the Redux/Context store (e.g. comments array vs comments map).",
        "Ignoring error boundaries and fallback UI."
      ]
    },
    objectives: ["Design a component tree", "Architect client-side state", "Handle network latency and errors"]
  },
  { 
    id: "fi-behavioral", 
    moduleId: "fi-behavioral", 
    trackId: "frontend-interview", 
    title: "The Behavioral Round", 
    order: 2, 
    associatedOutcomePaths: ["frontend-interview"],
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 45, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Complaining about previous teammates or frameworks instead of discussing objective tradeoffs.",
        "Answering 'tell me about a time you failed' with a fake weakness.",
        "Failing to use the STAR method (Situation, Task, Action, Result)."
      ]
    },
    objectives: ["Master the STAR method", "Discuss frontend tradeoffs", "Communicate technical debt"]
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
  
  // DSA
  { 
    id: "dsa-patterns", 
    moduleId: "dsa-patterns", 
    trackId: "dsa", 
    title: "Arrays, Strings & Two Pointers", 
    order: 1, 
    associatedOutcomePaths: ["fullstack-interview"],
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 60, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Using nested loops O(N^2) instead of a hash map or two pointers O(N).",
        "Modifying strings in JavaScript creates new allocations because strings are immutable.",
        "Failing to check edge cases like empty arrays or off-by-one pointer errors."
      ]
    },
    objectives: ["Implement Sliding Window", "Master Two Pointers", "Optimize brute force solutions"]
  },
  { 
    id: "dsa-hashmaps", 
    moduleId: "dsa-patterns", 
    trackId: "dsa", 
    title: "Hash Maps & Time Complexity", 
    order: 2, 
    associatedOutcomePaths: ["fullstack-interview"],
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 60, 
      interviewFrequency: 10, 
      importance: 10,
      topGotchas: [
        "Confusing JS Objects with Map() and when to use which.",
        "Using array.includes() inside a loop, silently creating O(N^2) complexity.",
        "Trading space (memory) for time (CPU) without explaining the tradeoff."
      ]
    },
    objectives: ["Trade space for time", "Implement memoization", "Understand Big O Notation"]
  },
  { 
    id: "dsa-trees", 
    moduleId: "dsa-trees", 
    trackId: "dsa", 
    title: "Trees, Graphs & Recursion", 
    order: 3, 
    associatedOutcomePaths: ["fullstack-interview", "frontend-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 90, 
      interviewFrequency: 8, 
      importance: 9,
      topGotchas: [
        "Forgetting the base case in a recursive function, causing a stack overflow.",
        "Not realizing that the HTML DOM is literally a Tree, and traversing it requires tree traversal algorithms.",
        "Using recursion when an iterative BFS queue would prevent stack limits on deep graphs."
      ]
    },
    objectives: ["Traverse a DOM tree", "Implement BFS vs DFS", "Understand the Call Stack limit"]
  },

  // HTML & CSS
  { 
    id: "html-a11y", 
    moduleId: "html-a11y", 
    trackId: "html-css", 
    title: "Semantic HTML & Accessibility", 
    order: 1, 
    associatedOutcomePaths: ["frontend-interview", "fullstack-interview"],
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 45, 
      interviewFrequency: 9, 
      importance: 10,
      topGotchas: [
        "Using a <div> with an onClick handler instead of a <button> breaks keyboard navigation (tabbing) and screen readers.",
        "Misunderstanding the difference between aria-hidden and display: none.",
        "Failing to associate <label> elements with inputs."
      ]
    },
    objectives: ["Build accessible forms", "Navigate via keyboard", "Understand the Accessibility Tree"]
  },
  { 
    id: "css-layouts", 
    moduleId: "css-architecture", 
    trackId: "html-css", 
    title: "Modern Layouts (Flexbox vs Grid)", 
    order: 2, 
    associatedOutcomePaths: ["frontend-interview", "fullstack-interview"],
    metadata: { 
      difficulty: "intermediate", 
      estimatedMinutes: 60, 
      interviewFrequency: 8, 
      importance: 9,
      topGotchas: [
        "Using Flexbox to build 2D grids (masonry) instead of CSS Grid.",
        "Setting fixed px heights on containers, causing text overflow when users zoom in.",
        "Overusing media queries when Flex-wrap or Grid minmax() handles responsiveness inherently."
      ]
    },
    objectives: ["Choose between 1D and 2D layouts", "Build responsive components natively", "Avoid layout thrashing"]
  },
  { 
    id: "css-architecture", 
    moduleId: "css-architecture", 
    trackId: "html-css", 
    title: "CSS Architecture & Scaling", 
    order: 3, 
    associatedOutcomePaths: ["frontend-interview"],
    metadata: { 
      difficulty: "advanced", 
      estimatedMinutes: 45, 
      interviewFrequency: 7, 
      importance: 8,
      topGotchas: [
        "Specificity wars: using !important or heavily nested selectors (#app .content div p) makes code impossible to override.",
        "Not understanding the runtime performance cost of CSS-in-JS (like styled-components) injecting style tags on mount.",
        "Tailwind HTML bloat vs BEM naming conventions."
      ]
    },
    objectives: ["Organize CSS for scale", "Understand CSS-in-JS tradeoffs", "Manage specificity"]
  }
];
