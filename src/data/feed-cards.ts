export type FeedCardType = 'content' | 'mcq' | 'code-prediction' | 'interview' | 'hot-take' | 'meme';

export interface BaseCard {
  id: string;
  type: FeedCardType;
  topic: string;
  chapterId: string;
  masteryPoints: number;
}

export interface ContentCard extends BaseCard {
  type: 'content';
  title: string;
  content: string;
}

export interface MCQCard extends BaseCard {
  type: 'mcq';
  question: string;
  options: { id: string; text: string; isCorrect: boolean; explanation?: string }[];
}

export interface CodePredictionCard extends BaseCard {
  type: 'code-prediction';
  question: string;
  code: string;
  options: { id: string; text: string; isCorrect: boolean; explanation?: string }[];
}

export interface InterviewCard extends BaseCard {
  type: 'interview';
  question: string;
  answer: string;
}

export interface HotTakeCard extends BaseCard {
  type: 'hot-take';
  statement: string;
  explanation: string;
}

export interface MemeCard extends BaseCard {
  type: 'meme';
  emoji: string;
  setup: string;
  punchline: string;
}

export type FeedCard = ContentCard | MCQCard | CodePredictionCard | InterviewCard | HotTakeCard | MemeCard;

export const FEED_CARDS: FeedCard[] = [
  // ==========================================
  // CHAPTER 1: React Fundamentals
  // ==========================================
  {
    id: "c1-content-1", type: "content", chapterId: "react-fundamentals", topic: "Rendering", masteryPoints: 1,
    title: "The Virtual DOM",
    content: "React uses a Virtual DOM (VDOM) to optimize rendering. Instead of directly manipulating the actual browser DOM (which is slow), React creates an in-memory representation. When state changes, React compares the new VDOM with the old one (Reconciliation) and only updates what actually changed in the real DOM."
  },
  {
    id: "c1-mcq-1", type: "mcq", chapterId: "react-fundamentals", topic: "Reconciliation", masteryPoints: 2,
    question: "Which of the following best describes React's Reconciliation process?",
    options: [
      { id: "a", text: "Completely destroying and rebuilding the DOM on every state change.", isCorrect: false },
      { id: "b", text: "Comparing the new Virtual DOM with the previous one to find the minimum necessary DOM updates.", isCorrect: true, explanation: "Reconciliation is the diffing algorithm React uses to update the UI efficiently." },
      { id: "c", text: "Using Web Workers to run UI updates on a separate thread.", isCorrect: false }
    ]
  },
  {
    id: "c1-interview-1", type: "interview", chapterId: "react-fundamentals", topic: "Hooks", masteryPoints: 2,
    question: "What is the difference between useMemo and useCallback?",
    answer: "`useMemo` caches the calculated *result* of a function, preventing expensive recalculations. `useCallback` caches the *function definition itself*, preventing the function identity from changing on every render (useful for passing stable callbacks to child components)."
  },
  {
    id: "c1-meme-1", type: "meme", chapterId: "react-fundamentals", topic: "Hooks", masteryPoints: 0,
    emoji: "🎣",
    setup: "When you put an object in the dependency array...",
    punchline: "Infinite loop activated."
  },
  {
    id: "c1-hot-take-1", type: "hot-take", chapterId: "react-fundamentals", topic: "State Management", masteryPoints: 1,
    statement: "You don't need Redux for 90% of React applications.",
    explanation: "Many senior engineers agree. With React Context, Zustand, and tools like React Query or SWR handling server state, the heavy boilerplate of Redux is often unnecessary overkill for standard apps."
  },
  {
    id: "c1-code-1", type: "code-prediction", chapterId: "react-fundamentals", topic: "State Batching", masteryPoints: 3,
    question: "What will the count be after the user clicks the button?",
    code: `const [count, setCount] = useState(0);\n\nconst handleClick = () => {\n  setCount(count + 1);\n  setCount(count + 1);\n  setCount(count + 1);\n}`,
    options: [
      { id: "a", text: "3", isCorrect: false },
      { id: "b", text: "1", isCorrect: true, explanation: "React batches state updates. Since we are using the current state value (0), all three calls essentially do `setCount(0 + 1)`. To get 3, you would use an updater function: `setCount(prev => prev + 1)`." },
      { id: "c", text: "0", isCorrect: false }
    ]
  },
  {
    id: "c1-content-2", type: "content", chapterId: "react-fundamentals", topic: "useEffect", masteryPoints: 1,
    title: "Side Effects",
    content: "The `useEffect` hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM are examples of side effects. It runs after the render is committed to the screen."
  },
  {
    id: "c1-mcq-2", type: "mcq", chapterId: "react-fundamentals", topic: "useEffect", masteryPoints: 2,
    question: "What happens if you omit the dependency array in useEffect?",
    options: [
      { id: "a", text: "It runs only once on mount.", isCorrect: false },
      { id: "b", text: "It runs after EVERY render.", isCorrect: true, explanation: "No array = run every time. Empty array [] = run once. Array with values [x] = run when x changes." },
      { id: "c", text: "It throws an error.", isCorrect: false }
    ]
  },
  {
    id: "c1-code-2", type: "code-prediction", chapterId: "react-fundamentals", topic: "Refs", masteryPoints: 3,
    question: "Will the component re-render when the button is clicked?",
    code: `const count = useRef(0);\n\nconst handleClick = () => {\n  count.current = count.current + 1;\n}`,
    options: [
      { id: "a", text: "Yes", isCorrect: false },
      { id: "b", text: "No", isCorrect: true, explanation: "Mutating a ref does not trigger a re-render. Refs are for storing mutable values that don't affect the visual output." }
    ]
  },
  {
    id: "c1-interview-2", type: "interview", chapterId: "react-fundamentals", topic: "Performance", masteryPoints: 2,
    question: "What does React.memo do?",
    answer: "It is a Higher Order Component that memoizes the rendered output of the wrapped component. It prevents re-renders if the props haven't changed."
  },

  // ==========================================
  // CHAPTER 2: JavaScript Core
  // ==========================================
  {
    id: "c2-content-1", type: "content", chapterId: "javascript-core", topic: "Execution Context", masteryPoints: 1,
    title: "Hoisting",
    content: "Hoisting is JS's default behavior of moving declarations to the top of the current scope. Only declarations are hoisted, not initializations. `var` is initialized to undefined, but `let` and `const` remain uninitialized in the Temporal Dead Zone (TDZ)."
  },
  {
    id: "c2-code-1", type: "code-prediction", chapterId: "javascript-core", topic: "Hoisting", masteryPoints: 3,
    question: "What is the output?",
    code: `console.log(a);\nvar a = 5;\n\nconsole.log(b);\nlet b = 10;`,
    options: [
      { id: "a", text: "5, 10", isCorrect: false },
      { id: "b", text: "undefined, ReferenceError", isCorrect: true, explanation: "`var` is hoisted and initialized as undefined. `let` is hoisted but remains in the Temporal Dead Zone until execution reaches its line, throwing a ReferenceError." },
      { id: "c", text: "ReferenceError, ReferenceError", isCorrect: false }
    ]
  },
  {
    id: "c2-mcq-1", type: "mcq", chapterId: "javascript-core", topic: "Types", masteryPoints: 2,
    question: "Which of these is NOT a primitive type in JavaScript?",
    options: [
      { id: "a", text: "Symbol", isCorrect: false },
      { id: "b", text: "BigInt", isCorrect: false },
      { id: "c", text: "Array", isCorrect: true, explanation: "Arrays are actually Objects in JavaScript. Primitives are string, number, bigint, boolean, undefined, symbol, and null." }
    ]
  },
  {
    id: "c2-interview-1", type: "interview", chapterId: "javascript-core", topic: "Closures", masteryPoints: 2,
    question: "What is a Closure in JavaScript?",
    answer: "A closure is a function that remembers and has access to variables in its lexical scope, even when that function is executing outside its original scope. It 'closes over' the variables it needs."
  },
  {
    id: "c2-hot-take-1", type: "hot-take", chapterId: "javascript-core", topic: "Types", masteryPoints: 1,
    statement: "TypeScript is just a linter masquerading as a language.",
    explanation: "Hot take! While technically it compiles to JS and leaves no runtime overhead, its type system is Turing complete and provides structural typing that catches 80% of common JS bugs before they hit production."
  },
  {
    id: "c2-content-2", type: "content", chapterId: "javascript-core", topic: "Functions", masteryPoints: 1,
    title: "Arrow Functions vs Regular Functions",
    content: "Arrow functions don't have their own `this` binding; they inherit `this` from the parent scope (lexical scoping). They also cannot be used as constructors and don't have an `arguments` object."
  },
  {
    id: "c2-code-2", type: "code-prediction", chapterId: "javascript-core", topic: "Scope", masteryPoints: 3,
    question: "What will this output?",
    code: `const obj = {\n  name: 'Aman',\n  greet: function() {\n    setTimeout(() => console.log(this.name), 1000);\n  }\n};\nobj.greet();`,
    options: [
      { id: "a", text: "undefined", isCorrect: false },
      { id: "b", text: "'Aman'", isCorrect: true, explanation: "Because the timeout uses an arrow function, it inherits the `this` context from the `greet` function, which points to `obj`." },
      { id: "c", text: "Throws an error", isCorrect: false }
    ]
  },
  {
    id: "c2-mcq-2", type: "mcq", chapterId: "javascript-core", topic: "Equality", masteryPoints: 2,
    question: "What does [] == ![] evaluate to?",
    options: [
      { id: "a", text: "true", isCorrect: true, explanation: "![] evaluates to false. So it becomes [] == false. [] converts to '' and false converts to 0. '' == 0 is true. JavaScript type coercion at its finest." },
      { id: "b", text: "false", isCorrect: false },
      { id: "c", text: "undefined", isCorrect: false }
    ]
  },
  {
    id: "c2-meme-1", type: "meme", chapterId: "javascript-core", topic: "Coercion", masteryPoints: 0,
    emoji: "🤡",
    setup: "'2' + 2 = '22'",
    punchline: "'2' - 2 = 0"
  },
  {
    id: "c2-interview-2", type: "interview", chapterId: "javascript-core", topic: "Event Loop", masteryPoints: 2,
    question: "Can you explain Event Delegation?",
    answer: "Attaching a single event listener to a parent element to manage events for its children, leveraging event bubbling. It's more memory efficient than attaching listeners to every single child."
  },

  // ==========================================
  // CHAPTER 3: Async JavaScript
  // ==========================================
  {
    id: "c3-content-1", type: "content", chapterId: "async-javascript", topic: "Event Loop", masteryPoints: 1,
    title: "Microtasks vs Macrotasks",
    content: "Promises resolve into the **Microtask queue**, while `setTimeout` goes into the **Macrotask queue**. The Event Loop always empties the *entire* Microtask queue before moving on to the next Macrotask."
  },
  {
    id: "c3-code-1", type: "code-prediction", chapterId: "async-javascript", topic: "Event Loop", masteryPoints: 3,
    question: "What is the order of logs?",
    code: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);`,
    options: [
      { id: "a", text: "1, 2, 3, 4", isCorrect: false },
      { id: "b", text: "1, 4, 3, 2", isCorrect: true, explanation: "Synchronous code runs first (1, 4). Then the microtask queue is emptied (Promise logs 3). Finally, the macrotask queue runs (setTimeout logs 2)." },
      { id: "c", text: "1, 4, 2, 3", isCorrect: false }
    ]
  },
  {
    id: "c3-meme-1", type: "meme", chapterId: "async-javascript", topic: "Promises", masteryPoints: 0,
    emoji: "⏱️",
    setup: "Me: I'll finish this task in an hour.",
    punchline: "Narrator: The Promise was rejected."
  },
  {
    id: "c3-mcq-1", type: "mcq", chapterId: "async-javascript", topic: "Async/Await", masteryPoints: 2,
    question: "What does an async function always return?",
    options: [
      { id: "a", text: "The exact value returned inside it.", isCorrect: false },
      { id: "b", text: "A Promise.", isCorrect: true, explanation: "Every async function implicitly wraps its return value in a Promise." },
      { id: "c", text: "undefined", isCorrect: false }
    ]
  },
  {
    id: "c3-hot-take-1", type: "hot-take", chapterId: "async-javascript", topic: "Promises", masteryPoints: 1,
    statement: "Promise.all() is usually a bad idea for network requests.",
    explanation: "If one request fails, Promise.all() rejects immediately, dropping the successful responses. Promise.allSettled() is generally safer for independent network requests."
  },
  {
    id: "c3-content-2", type: "content", chapterId: "async-javascript", topic: "Promises", masteryPoints: 1,
    title: "Promise States",
    content: "A Promise is in one of three states: pending (initial state), fulfilled (operation completed successfully), or rejected (operation failed). Once settled (fulfilled or rejected), a promise cannot change its state."
  },
  {
    id: "c3-code-2", type: "code-prediction", chapterId: "async-javascript", topic: "Async Errors", masteryPoints: 3,
    question: "What gets logged?",
    code: `async function test() {\n  try {\n    return Promise.reject('Error');\n  } catch (e) {\n    return 'Caught';\n  }\n}\ntest().catch(e => console.log(e));`,
    options: [
      { id: "a", text: "Caught", isCorrect: false },
      { id: "b", text: "Error", isCorrect: true, explanation: "Because the Promise is returned without being `await`ed, the try/catch block does not catch the rejection. It rejects out of the function." }
    ]
  },
  {
    id: "c3-interview-1", type: "interview", chapterId: "async-javascript", topic: "Concurrency", masteryPoints: 2,
    question: "How do you run 10 async tasks, but only 2 at a time?",
    answer: "By creating a concurrency limit or a Promise pool. You instantiate 2 worker functions that pop tasks off an array and execute them, only taking the next task when a previous one resolves."
  },
  {
    id: "c3-mcq-2", type: "mcq", chapterId: "async-javascript", topic: "Timers", masteryPoints: 2,
    question: "Is setTimeout(fn, 0) guaranteed to execute immediately?",
    options: [
      { id: "a", text: "Yes", isCorrect: false },
      { id: "b", text: "No", isCorrect: true, explanation: "It simply puts the callback at the end of the macrotask queue. It will only execute after all synchronous code and microtasks are completely finished." }
    ]
  },
  {
    id: "c3-interview-2", type: "interview", chapterId: "async-javascript", topic: "Patterns", masteryPoints: 2,
    question: "What is the difference between Promise.all and Promise.race?",
    answer: "Promise.all waits for ALL promises to fulfill (or rejects if ANY reject). Promise.race fulfills or rejects as soon as the FIRST promise settles."
  },

  // ==========================================
  // CHAPTER 4: System Design
  // ==========================================
  {
    id: "c4-content-1", type: "content", chapterId: "system-design", topic: "Scaling", masteryPoints: 1,
    title: "Vertical vs Horizontal Scaling",
    content: "Vertical scaling (scaling up) means adding more power (CPU, RAM) to an existing machine. Horizontal scaling (scaling out) means adding more machines into your pool of resources."
  },
  {
    id: "c4-mcq-1", type: "mcq", chapterId: "system-design", topic: "Load Balancing", masteryPoints: 2,
    question: "Which algorithm routes requests sequentially to each server in a list?",
    options: [
      { id: "a", text: "Least Connections", isCorrect: false },
      { id: "b", text: "Round Robin", isCorrect: true, explanation: "Round Robin loops through the servers one by one. It's simple but doesn't account for server load." },
      { id: "c", text: "IP Hashing", isCorrect: false }
    ]
  },
  {
    id: "c4-interview-1", type: "interview", chapterId: "system-design", topic: "Databases", masteryPoints: 2,
    question: "When would you choose a NoSQL database over a SQL database?",
    answer: "When you have massive volumes of unstructured or semi-structured data, require rapid horizontal scaling, or have a flexible schema that changes frequently. SQL is better for complex queries and ACID transactions."
  },
  {
    id: "c4-meme-1", type: "meme", chapterId: "system-design", topic: "Microservices", masteryPoints: 0,
    emoji: "🕸️",
    setup: "We broke our monolith into microservices.",
    punchline: "Now we have a distributed monolith."
  },
  {
    id: "c4-hot-take-1", type: "hot-take", chapterId: "system-design", topic: "Microservices", masteryPoints: 1,
    statement: "Most startups should start with a monolith, not microservices.",
    explanation: "Martin Fowler's 'MonolithFirst' strategy. Microservices introduce immense operational complexity (networking, deployments, tracing). It's much easier to scale a monolith until team boundaries force a split."
  },
  {
    id: "c4-content-2", type: "content", chapterId: "system-design", topic: "Caching", masteryPoints: 1,
    title: "Cache Aside Pattern",
    content: "The application code checks the cache first. If it's a miss, it reads from the database, saves the result to the cache, and then returns the data. It's the most common caching pattern (e.g., using Redis)."
  },
  {
    id: "c4-code-1", type: "code-prediction", chapterId: "system-design", topic: "Caching", masteryPoints: 3,
    question: "What happens in a 'Cache Stampede'?",
    code: `// Pseudocode\nlet data = cache.get(key);\nif (!data) {\n  data = expensiveDbQuery();\n  cache.set(key, data);\n}`,
    options: [
      { id: "a", text: "The cache runs out of memory and crashes.", isCorrect: false },
      { id: "b", text: "When a popular key expires, 10,000 requests simultaneously miss the cache and hit the database.", isCorrect: true, explanation: "This takes down the database. Fixed by using locking, debouncing, or background cache refreshing." }
    ]
  },
  {
    id: "c4-mcq-2", type: "mcq", chapterId: "system-design", topic: "CAP Theorem", masteryPoints: 2,
    question: "According to the CAP theorem, a distributed system can only guarantee two out of three characteristics. Which are they?",
    options: [
      { id: "a", text: "Consistency, Availability, Partition Tolerance", isCorrect: true, explanation: "Network partitions (P) will inevitably happen, so you usually have to choose between Consistency (CP) and Availability (AP)." },
      { id: "b", text: "Concurrency, Availability, Performance", isCorrect: false }
    ]
  },
  {
    id: "c4-code-2", type: "code-prediction", chapterId: "system-design", topic: "Rate Limiting", masteryPoints: 3,
    question: "Which algorithm allows sudden bursts of traffic up to a limit?",
    code: `if (bucket.tokens > 0) {\n  bucket.tokens--;\n  processRequest();\n}`,
    options: [
      { id: "a", text: "Token Bucket", isCorrect: true, explanation: "The Token Bucket algorithm adds tokens at a fixed rate. If tokens accumulate, it allows bursts of traffic until the bucket is empty." },
      { id: "b", text: "Fixed Window Counter", isCorrect: false },
      { id: "c", text: "Leaky Bucket", isCorrect: false }
    ]
  },
  {
    id: "c4-interview-2", type: "interview", chapterId: "system-design", topic: "API Design", masteryPoints: 2,
    question: "What is Idempotency in API design?",
    answer: "An operation is idempotent if making multiple identical requests has the same effect as making a single request. (e.g., PUT is idempotent, POST is not)."
  },

  // ==========================================
  // CHAPTER 5: DSA Patterns
  // ==========================================
  {
    id: "c5-content-1", type: "content", chapterId: "dsa-patterns", topic: "Arrays", masteryPoints: 1,
    title: "Sliding Window Pattern",
    content: "Used for finding subarrays or substrings. Instead of nested loops O(n²), you maintain a 'window' defined by two pointers (start and end). You slide the end pointer to expand, and the start pointer to shrink."
  },
  {
    id: "c5-code-1", type: "code-prediction", chapterId: "dsa-patterns", topic: "Arrays", masteryPoints: 3,
    question: "What does this Kadane's algorithm snippet calculate?",
    code: `let maxSoFar = nums[0];\nlet currentMax = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n  currentMax = Math.max(nums[i], currentMax + nums[i]);\n  maxSoFar = Math.max(maxSoFar, currentMax);\n}`,
    options: [
      { id: "a", text: "Maximum Subarray Sum", isCorrect: true, explanation: "Kadane's algorithm finds the contiguous subarray with the largest sum in O(n) time." },
      { id: "b", text: "Longest Increasing Subsequence", isCorrect: false },
      { id: "c", text: "Maximum Product Subarray", isCorrect: false }
    ]
  },
  {
    id: "c5-mcq-1", type: "mcq", chapterId: "dsa-patterns", topic: "Hash Maps", masteryPoints: 2,
    question: "What is the time complexity of searching in a Hash Map?",
    options: [
      { id: "a", text: "O(log n)", isCorrect: false },
      { id: "b", text: "O(n)", isCorrect: false },
      { id: "c", text: "O(1) average case", isCorrect: true, explanation: "Hash maps provide average O(1) time complexity for insertions and lookups, though worst-case (collisions) can be O(n)." }
    ]
  },
  {
    id: "c5-interview-1", type: "interview", chapterId: "dsa-patterns", topic: "Trees", masteryPoints: 2,
    question: "What is the difference between BFS and DFS?",
    answer: "Breadth-First Search explores level-by-level (using a Queue). Depth-First Search explores as deep as possible before backtracking (using a Stack or recursion). BFS is great for shortest path, DFS is great for searching entire graphs."
  },
  {
    id: "c5-meme-1", type: "meme", chapterId: "dsa-patterns", topic: "Trees", masteryPoints: 0,
    emoji: "🌳",
    setup: "Inverting a binary tree...",
    punchline: "Because apparently that's what software engineering is."
  },
  {
    id: "c5-hot-take-1", type: "hot-take", chapterId: "dsa-patterns", topic: "Interviews", masteryPoints: 1,
    statement: "LeetCode medium questions shouldn't be asked in frontend interviews.",
    explanation: "Frontend engineering revolves around architecture, state, performance, and DOM quirks. Asking to traverse a graph rarely correlates to the candidate's actual day-to-day job performance."
  },
  {
    id: "c5-content-2", type: "content", chapterId: "dsa-patterns", topic: "Two Pointers", masteryPoints: 1,
    title: "Fast & Slow Pointers (Tortoise & Hare)",
    content: "Used to detect cycles in linked lists. The slow pointer moves 1 step, the fast pointer moves 2 steps. If there is a cycle, the fast pointer will eventually 'lap' and meet the slow pointer."
  },
  {
    id: "c5-code-2", type: "code-prediction", chapterId: "dsa-patterns", topic: "Binary Search", masteryPoints: 3,
    question: "What is the missing condition to check the right half?",
    code: `let l = 0, r = arr.length - 1;\nwhile (l <= r) {\n  let mid = Math.floor((l + r) / 2);\n  if (arr[mid] === target) return mid;\n  if (arr[mid] < target) {\n    // ???\n  } else {\n    r = mid - 1;\n  }\n}`,
    options: [
      { id: "a", text: "l = mid + 1;", isCorrect: true, explanation: "If the target is greater than the middle element, it must be in the right half, so we move the left boundary past mid." },
      { id: "b", text: "l = mid;", isCorrect: false },
      { id: "c", text: "r = mid + 1;", isCorrect: false }
    ]
  },
  {
    id: "c5-mcq-2", type: "mcq", chapterId: "dsa-patterns", topic: "Big O", masteryPoints: 2,
    question: "What is the time complexity of Array.prototype.sort() in JavaScript?",
    options: [
      { id: "a", text: "O(n)", isCorrect: false },
      { id: "b", text: "O(n log n)", isCorrect: true, explanation: "Most JS engines use highly optimized sorting algorithms (like Timsort or QuickSort) which operate in O(n log n) time." },
      { id: "c", text: "O(n²)", isCorrect: false }
    ]
  },
  {
    id: "c5-interview-2", type: "interview", chapterId: "dsa-patterns", topic: "Stacks", masteryPoints: 2,
    question: "How would you check for valid balanced parentheses in a string?",
    answer: "Iterate through the string. Push opening brackets `( { [` to a Stack. For closing brackets `) } ]`, pop from the stack and check if it matches the correct opening bracket. At the end, the stack must be empty."
  }
];

export const CHAPTERS = [
  { id: "react-fundamentals", title: "React Fundamentals", targetPoints: 17 },
  { id: "javascript-core", title: "JavaScript Core", targetPoints: 17 },
  { id: "async-javascript", title: "Async JavaScript", targetPoints: 17 },
  { id: "system-design", title: "System Design", targetPoints: 17 },
  { id: "dsa-patterns", title: "DSA Patterns", targetPoints: 17 }
];
