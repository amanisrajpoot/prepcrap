import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "node-runtime")!;

export const nodeRuntimePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "nr-intro",
      topicId: "node-runtime",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "foundation",
      payload: {
        topic: "Node Runtime & Event Loop",
        explanation: "Backend interviews are fundamentally different from frontend interviews. Instead of asking 'Why did this component re-render?', they ask 'Why did the entire server freeze for 10,000 users?'. The answer almost always traces back to a misunderstanding of the single-threaded Event Loop and execution order.",
        interviewContext: "You will be shown code snippets with mixed synchronous code, Promises, nextTicks, and timeouts, and asked to predict the exact console output order."
      }
    },
    {
      id: "nr-predict-microtasks",
      topicId: "node-runtime",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "predict-next-line",
      difficulty: "intermediate",
      payload: {
        question: "Microtask Priority",
        template: `console.log('1. Sync');

setTimeout(() => console.log('2. Timeout'), 0);

Promise.resolve().then(() => console.log('3. Promise'));

process.nextTick(() => console.log('4. nextTick'));

console.log('5. Sync');

// What is the EXACT order of the logs?
{{blank}}`,
        options: [
          {
            id: "opt1",
            code: `1, 5, 3, 4, 2`,
            isCorrect: false,
            explanation: "Incorrect. nextTick has a higher priority than Promises."
          },
          {
            id: "opt2",
            code: `1, 5, 4, 3, 2`,
            isCorrect: true,
            explanation: "Correct! \n1. Synchronous code executes first (1, 5).\n2. Microtasks run next. Node.js evaluates the nextTick queue BEFORE the Promise microtask queue, so 4 runs, then 3.\n3. Finally, the event loop moves to the Timers phase and executes 2."
          },
          {
            id: "opt3",
            code: `1, 5, 2, 4, 3`,
            isCorrect: false,
            explanation: "Incorrect. Timers (macrotasks) run AFTER all microtasks (Promises and nextTicks) have cleared."
          }
        ]
      }
    },
    {
      id: "nr-predict-immediate",
      topicId: "node-runtime",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "predict-next-line",
      difficulty: "advanced",
      payload: {
        question: "Timers vs Immediate",
        template: `const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);

  setImmediate(() => {
    console.log('immediate');
  });
});

// Assuming the file read is successful, what is the output?
{{blank}}`,
        options: [
          {
            id: "opt1",
            code: `It is random/non-deterministic.`,
            isCorrect: false,
            explanation: "While setTimeout(0) and setImmediate() are non-deterministic when called in the top-level main module, they are 100% deterministic when called inside an I/O callback."
          },
          {
            id: "opt2",
            code: `"timeout" then "immediate"`,
            isCorrect: false,
            explanation: "Incorrect. Review the Event Loop phases."
          },
          {
            id: "opt3",
            code: `"immediate" then "timeout"`,
            isCorrect: true,
            explanation: "Correct! When running inside an I/O callback (like fs.readFile), the event loop is currently in the 'Poll' phase. When the Poll phase finishes, the loop immediately transitions to the 'Check' phase, where setImmediate callbacks are executed. The loop must cycle all the way back to the 'Timers' phase to execute the setTimeout."
          }
        ]
      }
    },
    {
      id: "nr-debug-blocking",
      topicId: "node-runtime",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "debug",
      difficulty: "advanced",
      payload: {
        question: "A developer added a 'healthcheck' endpoint, but while the server is calculating a crypto hash for a user, the healthcheck times out and the load balancer kills the pod. Why?",
        code: [
          "app.get('/health', (req, res) => res.send('OK'));",
          "",
          "app.post('/hash', (req, res) => {",
          "  const data = req.body.data;",
          "  // CPU intensive hashing loop",
          "  let hash = '';",
          "  for(let i = 0; i < 100000000; i++) {",
          "    hash = crypto.createHash('sha256').update(data + i).digest('hex');",
          "  }",
          "  res.send(hash);",
          "});"
        ],
        bugLineIndex: 6,
        explanation: "Node.js is single-threaded. By running a massive, synchronous CPU-bound 'for' loop on the main thread, the Event Loop is completely blocked. Node cannot process the incoming '/health' HTTP requests because it is stuck inside the loop. CPU-bound tasks must be offloaded to worker_threads or handled via asynchronous/chunked methods."
      }
    },
    {
      id: "nr-explain-starvation",
      topicId: "node-runtime",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Why can recursive calls to `process.nextTick` crash a Node.js server, but recursive calls to `setTimeout(..., 0)` do not?",
        modelAnswer: "The nextTick queue is evaluated immediately after the current operation, before the event loop is allowed to continue to any other phase. If you recursively call nextTick, you trap the runtime in the microtask phase forever (Event Loop Starvation). I/O and timers will never execute. `setTimeout` places callbacks in the Timers phase queue, allowing the event loop to tick forward and process I/O in between timer executions."
      }
    },
    {
      id: "nr-incident-cpu",
      topicId: "node-runtime",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "incident",
      difficulty: "interview",
      payload: {
        question: "CPU Spikes & Latency",
        incident: "PagerDuty Alert!\n\nCPU suddenly spikes to 100%.\nAPI latency for ALL endpoints jumps from 100ms to 15s.\nMemory usage is stable at 40%.\n\nWhat is the most likely culprit you investigate first?",
        options: [
          {
            id: "opt1",
            text: "A memory leak in a global cache object.",
            explanation: "Memory is stable at 40%, so a memory leak is highly unlikely to be the primary cause of this specific incident.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "A synchronous, CPU-bound operation blocking the Event Loop.",
            explanation: "Correct! 100% CPU with soaring latency across ALL endpoints (even simple ones) is the classic signature of a blocked event loop. Something synchronous (like a massive JSON.parse, an infinite loop, or a catastrophic Regex DOS) is hogging the single thread.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "The database is dropping connections.",
            explanation: "A slow database increases latency, but it causes the Node.js process to sit idle waiting for I/O (low CPU). High CPU indicates Node itself is working too hard.",
            isCorrect: false
          },
          {
            id: "opt4",
            text: "The load balancer is misconfigured.",
            explanation: "While possible, this would not cause the Node.js process CPU to spike to 100%.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "nr-complete",
      topicId: "node-runtime",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Node Runtime & Event Loop",
        topicId: "node-runtime"
      }
    }
  ]
};
