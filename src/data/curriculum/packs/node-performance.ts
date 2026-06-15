import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "node-performance")!;

export const nodePerformancePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "np-intro",
      topicId: "node-performance",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Performance & Reliability",
        explanation: "In Node.js, your code shares a single thread with every other user currently connected to your server. A mistake by one user can crash or freeze the server for everyone else. Senior engineers must intimately understand blocking operations, memory management, and how to define fault boundaries.",
        interviewContext: "Interviewers will present code that 'works locally' but falls over in production, asking you to identify the bottleneck or leak."
      }
    },
    {
      id: "np-debug-json",
      topicId: "node-performance",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "debug",
      difficulty: "intermediate",
      payload: {
        question: "A webhook endpoint processes massive JSON payloads. During peak traffic, the server freezes for 2-3 seconds at a time.",
        code: [
          "app.post('/webhook', (req, res) => {",
          "  // req.body is a raw string of 50MB",
          "  try {",
          "    const data = JSON.parse(req.body);",
          "    processData(data);",
          "    res.status(200).send('OK');",
          "  } catch (err) {",
          "    res.status(400).send('Invalid JSON');",
          "  }",
          "});"
        ],
        bugLineIndex: 3,
        explanation: "JSON.parse() is a synchronous, blocking operation. Parsing a 50MB string can take seconds. Because Node is single-threaded, the Event Loop is entirely blocked during this time, freezing the server for all other users. For massive payloads, you must use a streaming JSON parser (like JSONStream) or offload the parsing to a Worker Thread."
      }
    },
    {
      id: "np-incident-regex",
      topicId: "node-performance",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Regular Expression DOS",
        incident: "PagerDuty Alert!\n\nCPU is pegged at 100%.\nAn attacker is sending an 80,000 character string to your validation endpoint: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!'\n\nThe endpoint validates usernames using this Regex:\n`/^[a-zA-Z]+([a-zA-Z0-9]+)*$/`",
        options: [
          {
            id: "opt1",
            text: "The regex string length is too long for V8 to store in memory.",
            explanation: "Incorrect. 80,000 characters is tiny for V8 memory. This is a CPU issue, not a memory issue.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Catastrophic Backtracking caused by nested quantifiers.",
            explanation: "Correct! The regex `([a-zA-Z0-9]+)*` contains nested quantifiers (`+` inside `*`). When the engine attempts to match the attacker's string (which ends with a '!' causing a guaranteed failure), it has to evaluate every possible permutation of how the `+` and `*` could divide the 'a's. This is an exponential O(2^n) operation, locking the CPU.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "The regex engine is waiting for a database lock.",
            explanation: "Regex engines are entirely in-memory and synchronous; they do not interact with the database.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "np-debug-memory",
      topicId: "node-performance",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
        question: "The server works fine after deployment, but over 24 hours, memory usage slowly creeps up to 100% until the container OOM crashes.",
        code: [
          "const sessionCache = {};",
          "",
          "app.use((req, res, next) => {",
          "  const sessionId = req.cookies.session_id;",
          "  if (sessionId) {",
          "    // Store user data in memory for fast access",
          "    sessionCache[sessionId] = {",
          "      path: req.path,",
          "      timestamp: Date.now()",
          "    };",
          "  }",
          "  next();",
          "});"
        ],
        bugLineIndex: 6,
        explanation: "This is a classic memory leak. Data is continuously added to the global `sessionCache` object on every request, but it is NEVER deleted or evicted. The object will grow infinitely until the V8 heap runs out of memory. Caching must always have a TTL (Time To Live) or an eviction policy (like LRU), or better yet, be offloaded to a dedicated store like Redis."
      }
    },
    {
      id: "np-explain-errors",
      topicId: "node-performance",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "In Node.js backend engineering, what is the difference between an 'Operational Error' and a 'Programmer Error'?",
        modelAnswer: "Operational Errors are expected runtime problems (e.g., database connection timeout, 404 not found, invalid user input). You handle these gracefully and keep the server running.\n\nProgrammer Errors are actual bugs in the code (e.g., TypeError: cannot read property of undefined). When a Programmer Error occurs, the state of the application is unknown. The only safe way to recover is to crash the process immediately and let a process manager (like PM2 or Kubernetes) restart it."
      }
    },
    {
      id: "np-scenario-errors",
      topicId: "node-performance",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Handling Uncaught Exceptions",
        scenario: "Your team is debating how to handle `process.on('uncaughtException')`. A junior developer suggests wrapping the entire app in a massive try/catch and logging the error so the server never crashes.",
        options: [
          {
            id: "opt1",
            text: "Agree. High availability means the server should never crash.",
            isCorrect: false,
            explanation: "Incorrect. If an uncaught exception occurs, the application is in an undefined state. Memory might be leaking, or connections might be dangling."
          },
          {
            id: "opt2",
            text: "Disagree. You should log the error, then synchronously call process.exit(1).",
            isCorrect: true,
            explanation: "Correct! The rule of thumb for `uncaughtException` is: Log the error to your monitoring service, perform any synchronous cleanup if absolutely necessary, and immediately crash `process.exit(1)`. Let your infrastructure (Docker/K8s) restart a fresh, clean instance."
          },
          {
            id: "opt3",
            text: "Agree. Just clear the event loop queue and continue.",
            isCorrect: false,
            explanation: "You cannot arbitrarily 'clear' the event loop in Node.js."
          }
        ]
      }
    },
    {
      id: "np-complete",
      topicId: "node-performance",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Performance & Reliability",
        topicId: "node-performance"
      }
    }
  ]
};
