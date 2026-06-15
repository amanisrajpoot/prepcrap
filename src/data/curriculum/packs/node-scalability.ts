import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "node-scalability")!;

export const nodeScalabilityPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "ns-intro",
      topicId: "node-scalability",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Scalability & Distributed Systems",
        explanation: "At scale, your Node.js application will not run on a single machine. It will run on 10, 50, or 500 instances simultaneously behind a load balancer. If your application relies on local state (like saving sessions in memory or files on the local disk), horizontal scaling will instantly break your app.",
        interviewContext: "Interviewers will present a simple Express.js application and ask: 'What happens to this code when we spin up 5 instances of it?'"
      }
    },
    {
      id: "ns-scenario-stateless",
      topicId: "node-scalability",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "The Login Loop",
        scenario: "You have a Node.js server using an in-memory object `const sessions = {}` to store authenticated users. Traffic spikes, so DevOps spins up 3 more identical instances of your server behind a Round-Robin Load Balancer. Suddenly, users complain they are being randomly logged out as they navigate the site.",
        options: [
          {
            id: "opt1",
            text: "The Load Balancer is stripping the authentication cookies.",
            isCorrect: false,
            explanation: "Load balancers forward cookies perfectly fine."
          },
          {
            id: "opt2",
            text: "The sessions are stateful and isolated per instance.",
            isCorrect: true,
            explanation: "Correct! User A logs into Server 1, and their session is stored in Server 1's memory. Their next HTTP request is routed by the Load Balancer to Server 2. Server 2's memory is completely empty, so it thinks User A is not logged in. To fix this, you must extract the state into a centralized data store (like Redis) that all servers can access."
          },
          {
            id: "opt3",
            text: "The Node.js garbage collector is aggressively clearing the in-memory object.",
            isCorrect: false,
            explanation: "Garbage collection does not clear referenced objects."
          }
        ]
      }
    },
    {
      id: "ns-scenario-sticky",
      topicId: "node-scalability",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Sticky Sessions vs Redis",
        scenario: "To solve the Login Loop problem, a junior developer suggests enabling 'Sticky Sessions' on the Load Balancer, which ensures User A is always routed to Server 1. Why is a centralized Redis store usually preferred over Sticky Sessions?",
        options: [
          {
            id: "opt1",
            text: "Sticky Sessions make it impossible to use HTTPS.",
            isCorrect: false,
            explanation: "HTTPS works perfectly fine with sticky sessions."
          },
          {
            id: "opt2",
            text: "If Server 1 crashes or is scaled down, User A loses their session entirely.",
            isCorrect: true,
            explanation: "Correct! Sticky sessions tie the user's availability to a specific piece of ephemeral hardware. If that pod dies, the session dies. A centralized Redis cache ensures that if Server 1 dies, the Load Balancer routes User A to Server 2, which simply fetches the session from Redis."
          },
          {
            id: "opt3",
            text: "Sticky Sessions are much slower than Redis.",
            isCorrect: false,
            explanation: "Sticky Sessions don't require an external network hop to a database, so they are technically faster, but the reliability tradeoff is usually unacceptable."
          }
        ]
      }
    },
    {
      id: "ns-incident-queues",
      topicId: "node-scalability",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Missing Video Uploads",
        incident: "PagerDuty Alert!\n\nUsers upload large 10GB videos. The Express route immediately starts processing the video using FFmpeg, which takes 30 minutes. Occasionally, the Node.js server crashes due to an unrelated bug, or gets redeployed during the day. When this happens, any videos currently being processed are permanently lost.",
        options: [
          {
            id: "opt1",
            text: "Use a Message Queue (like RabbitMQ or SQS) and dedicated Worker nodes.",
            explanation: "Correct! Web servers should never do heavy, long-running processing. The Express route should instantly drop a message ('Process Video X') onto a Queue and return 200 OK. A separate pool of Worker nodes reads from the Queue. If a Worker crashes mid-process, it fails to 'ACK' (acknowledge) the message. The Queue will safely deliver the message to another Worker to retry.",
            isCorrect: true
          },
          {
            id: "opt2",
            text: "Increase the HTTP timeout limit to 60 minutes.",
            explanation: "Keeping an HTTP connection open for 60 minutes is highly unstable and will be dropped by browsers, load balancers, or proxies.",
            isCorrect: false
          },
          {
            id: "opt3",
            text: "Use `fs.appendFile` instead of `fs.writeFile`.",
            explanation: "This doesn't solve the problem of the process dying halfway through an FFmpeg encode.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "ns-explain-lb",
      topicId: "node-scalability",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "What is the primary difference between a Layer 4 (L4) Load Balancer and a Layer 7 (L7) Load Balancer?",
        modelAnswer: "Layer 4 operates at the transport layer (TCP/UDP). It routes traffic based purely on IP addresses and ports without looking at the data inside. It is incredibly fast but dumb.\n\nLayer 7 operates at the application layer (HTTP/HTTPS). It can look inside the HTTP requests (headers, cookies, URL paths) and make intelligent routing decisions (e.g., routing `/api` traffic to Node.js backend servers, and `/static` traffic to an S3 bucket).",
        interviewContext: "This is a classic infrastructure question. Knowing when to use an Application Load Balancer (L7) vs a Network Load Balancer (L4) shows senior systems knowledge."
      }
    },
    {
      id: "ns-scenario-db-bottleneck",
      topicId: "node-scalability",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Horizontal Scaling Bottleneck",
        scenario: "Your application is getting slammed. You scale your stateless Node.js backend from 10 instances to 100 instances. However, your application's overall throughput actually DECREASES and the system crashes.",
        options: [
          {
            id: "opt1",
            text: "Node.js cannot run on more than 32 instances.",
            isCorrect: false,
            explanation: "Node.js can be scaled infinitely horizontally."
          },
          {
            id: "opt2",
            text: "You exhausted the Database Connection Pool.",
            isCorrect: true,
            explanation: "Correct! If each of your 100 Node.js instances opens a pool of 20 database connections, you suddenly have 2,000 active connections hitting your single PostgreSQL database. Databases have hard limits on connections. To fix this, you need a connection pooler (like PgBouncer) in front of your database."
          },
          {
            id: "opt3",
            text: "The Load Balancer ran out of memory.",
            isCorrect: false,
            explanation: "Modern cloud Load Balancers can handle millions of concurrent connections effortlessly."
          }
        ]
      }
    },
    {
      id: "ns-complete",
      topicId: "node-scalability",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Scalability & Distributed Systems",
        topicId: "node-scalability"
      }
    }
  ]
};
