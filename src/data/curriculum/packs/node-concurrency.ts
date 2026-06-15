import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "node-concurrency")!;

export const nodeConcurrencyPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "nc-intro",
      topicId: "node-concurrency",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Async Patterns & Concurrency",
        explanation: "Node.js makes it incredibly easy to fire off 10,000 asynchronous requests in a millisecond. The problem? The database or third-party API you are calling cannot handle 10,000 concurrent connections. A huge part of backend engineering is learning how to artificially limit and throttle the sheer speed of Node.js to protect downstream services.",
        interviewContext: "Expect system design questions focused on rate limiting, exponential backoff retries, and circuit breakers."
      }
    },
    {
      id: "nc-debug-promise-all",
      topicId: "node-concurrency",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "debug",
      difficulty: "intermediate",
      payload: {
        question: "A background job processes 1,000 user payments every night. However, if even one user's credit card is declined, all 1,000 payments are aborted and fail.",
        code: [
          "async function processNightlyPayments(users) {",
          "  // users is an array of 1,000 objects",
          "  try {",
          "    const promises = users.map(user => chargeCard(user.id));",
          "    await Promise.all(promises);",
          "    console.log('All payments successful!');",
          "  } catch (err) {",
          "    console.error('Nightly batch failed!', err);",
          "  }",
          "}"
        ],
        bugLineIndex: 4,
        explanation: "Promise.all() 'fails fast'. If a single promise in the array rejects, the entire Promise.all immediately rejects, throwing into the catch block. For batch processing where partial success is acceptable (or expected), you must use Promise.allSettled(), which waits for all promises to finish and returns an array indicating the 'fulfilled' or 'rejected' status of each."
      }
    },
    {
      id: "nc-incident-ddos",
      topicId: "node-concurrency",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Accidental DDoS",
        incident: "PagerDuty Alert!\n\nYour internal Mailing Service has crashed with 'ECONNREFUSED'.\n\nYou recently deployed a script that fetches 500,000 subscribed users from the database and sends a 'Happy New Year' email to each via the Mailing Service API.",
        options: [
          {
            id: "opt1",
            text: "Node.js ran out of memory storing 500,000 promises.",
            explanation: "While 500,000 promises use memory, 'ECONNREFUSED' indicates the *downstream* service (the Mailing API) collapsed, not your Node.js server.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "You fired 500,000 concurrent HTTP requests and DDoSed your own service.",
            explanation: "Correct! If you loop through 500,000 users and fire `fetch()` without awaiting or batching, Node.js instantly opens 500,000 concurrent connections. The downstream Mailing Service cannot handle this and crashes. You must process them in chunks or use a concurrency limiter (like the `p-limit` library or a message queue).",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "The database connection pool was exhausted.",
            explanation: "The incident says you already fetched the users, so the DB query was successful. The crash happened during the mailing phase.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "nc-implementation-chunk",
      topicId: "node-concurrency",
      objectiveId: topicData.objectives[0],
      category: "implementation",
      type: "code-completion",
      difficulty: "advanced",
      payload: {
        prompt: "Complete the code to process 10,000 items in chunks of 50 to avoid overloading the API.",
        template: `async function processInChunks(items, chunkSize) {
  for (let i = 0; i < items.length; i += chunkSize) {
    // Slice a chunk of 50 items
    const chunk = items.slice(i, i + chunkSize);
    
    // Create an array of promises
    const promises = chunk.map(item => processItem(item));
    
    // Wait for this chunk to finish BEFORE starting the next!
    await {{blank1}}(promises);
  }
}`,
        answers: ["Promise.all", "Promise.allSettled"],
        explanation: "By awaiting Promise.all() inside the for-loop, you ensure that only 50 concurrent requests are in flight at any given time. The loop pauses until the chunk finishes, then grabs the next 50."
      }
    },
    {
      id: "nc-scenario-circuit-breaker",
      topicId: "node-concurrency",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Flaky Third-Party API",
        scenario: "Your application relies on a third-party billing API. Today, the billing API is experiencing severe degradation, timing out on 80% of requests. Because your server keeps retrying, the billing API is getting worse, and your users are stuck looking at infinite loading spinners.",
        options: [
          {
            id: "opt1",
            text: "Implement a Circuit Breaker pattern.",
            isCorrect: true,
            explanation: "Correct! A Circuit Breaker monitors failure rates. If failures cross a threshold (e.g., 50% fail over 10 seconds), the circuit 'trips' (opens). Future requests immediately fail fast returning a fallback UI to the user, giving the third-party API time to recover without being hammered by your retries."
          },
          {
            id: "opt2",
            text: "Implement Exponential Backoff.",
            isCorrect: false,
            explanation: "Exponential backoff is great for occasional network blips, but if the API is experiencing a massive outage, millions of clients backing off and retrying will eventually create a 'thundering herd' that keeps the API down."
          },
          {
            id: "opt3",
            text: "Switch from Promise.all to Promise.allSettled.",
            isCorrect: false,
            explanation: "This does not solve the root problem of hammering a degraded downstream service."
          }
        ]
      }
    },
    {
      id: "nc-explain-race",
      topicId: "node-concurrency",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Node.js is single-threaded. Is it possible to have Race Conditions in Node.js?",
        modelAnswer: "Yes. While you don't have parallel threads accessing memory simultaneously, you absolutely have asynchronous race conditions. If two concurrent requests await a database read, both get 'Balance = $100'. Both requests then deduct $10, and both await a database write setting 'Balance = $90'. The user spent $20 but only $10 was deducted. You must use database-level locks (e.g. SELECT FOR UPDATE) or atomic operations.",
        interviewContext: "A junior will say 'No, because it's single threaded'. A senior will immediately bring up database state and async interleaving."
      }
    },
    {
      id: "nc-complete",
      topicId: "node-concurrency",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Async Patterns & Concurrency",
        topicId: "node-concurrency"
      }
    }
  ]
};
