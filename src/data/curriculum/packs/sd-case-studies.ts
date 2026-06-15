import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "sd-case-studies")!;

export const sdCaseStudiesPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "sdcs-intro",
      topicId: "sd-case-studies",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Interviews & Case Studies",
        explanation: "In a real System Design interview, you don't just draw 'Twitter' and then go home. The interviewer will establish a baseline architecture, and then aggressively change the constraints. 'Okay, now what if traffic spikes 100x?' 'Okay, now what if the CEO wants real-time analytics?' This is called Constraint Evolution.",
        interviewContext: "We are going to walk through a complete URL Shortener interview, step by step, pivoting the architecture as the constraints change."
      }
    },
    {
      id: "sdcs-scenario-step1",
      topicId: "sd-case-studies",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "Step 1: The Foundation",
        scenario: "You are designing a URL shortener for an internal company tool. Traffic is low (10 requests per second). You need to store the mapping between a short hash (e.g., 'A8bC2') and the long URL.",
        options: [
          {
            id: "opt1",
            text: "Spin up a Kubernetes cluster with a sharded Cassandra NoSQL cluster.",
            isCorrect: false,
            explanation: "Massive over-engineering. For 10 RPS, you do not need distributed NoSQL."
          },
          {
            id: "opt2",
            text: "Use a simple Relational Database (PostgreSQL) with a single Load Balancer and 2 Node.js instances.",
            isCorrect: true,
            explanation: "Correct! For an MVP with low traffic, a standard RDBMS is perfect. You can easily index the short hash, and a single Postgres instance can handle thousands of reads per second out of the box."
          },
          {
            id: "opt3",
            text: "Store the links in an in-memory Redis cache.",
            isCorrect: false,
            explanation: "Redis is in-memory. If the server restarts, all the company's links are permanently deleted. You need persistent storage."
          }
        ]
      }
    },
    {
      id: "sdcs-scenario-step2",
      topicId: "sd-case-studies",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Step 2: 100x Traffic Spikes",
        scenario: "The company makes the URL shortener public. It goes viral. Traffic spikes from 10 RPS to 10,000 RPS. The PostgreSQL database hits 100% CPU and the service crashes. The traffic is 99% reads (clicking links) and 1% writes (creating links). What is your first architectural move?",
        options: [
          {
            id: "opt1",
            text: "Migrate from PostgreSQL to MongoDB.",
            isCorrect: false,
            explanation: "Migrating databases takes months and doesn't inherently solve a read-heavy bottleneck."
          },
          {
            id: "opt2",
            text: "Introduce a Redis Caching Layer in front of the Database.",
            isCorrect: true,
            explanation: "Correct! URL shorteners are incredibly read-heavy, and the data is immutable (a short URL never changes its destination). This is the absolute perfect use case for a cache. The Node.js server checks Redis first; if it's a hit, it redirects immediately without touching the DB."
          },
          {
            id: "opt3",
            text: "Shard the PostgreSQL database by user_id.",
            isCorrect: false,
            explanation: "Sharding is extremely complex. You should always exhaust caching and read replicas before attempting to shard a relational database."
          }
        ]
      }
    },
    {
      id: "sdcs-tradeoff-step3",
      topicId: "sd-case-studies",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "tradeoff",
      difficulty: "advanced",
      payload: {
        question: "Step 3: Real-Time Analytics",
        scenario: "The CEO now wants to see a real-time dashboard of every click, including the user's IP, device type, and timestamp. You must record this analytics data EVERY time a short URL is clicked.",
        optionA: "Synchronous DB Write during Redirect",
        optionB: "Asynchronous Message Queue",
        options: [
          {
            id: "opt1",
            text: "I select Synchronous DB Write.",
            isCorrect: false,
            explanation: "If you do a synchronous `INSERT INTO analytics` before sending the HTTP 302 Redirect to the user, you completely ruin the latency of the redirect. The user doesn't care about your analytics; they just want to go to the website."
          },
          {
            id: "opt2",
            text: "I select Asynchronous Message Queue.",
            isCorrect: true,
            explanation: "Correct! During the redirect, you instantly return the HTTP 302 to the user. In the background (or asynchronously), you drop an event ('User Clicked') onto a Kafka or RabbitMQ queue. A separate Analytics Worker consumes that queue and batch-inserts the data into a Data Warehouse (like Snowflake or ClickHouse) without affecting the end-user's latency."
          }
        ]
      }
    },
    {
      id: "sdcs-scenario-step4",
      topicId: "sd-case-studies",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Step 4: Global Expansion",
        scenario: "The app is now used heavily in Asia, but your servers and database are in the US. Asian users are experiencing 300ms latency on redirects.",
        options: [
          {
            id: "opt1",
            text: "Deploy read-only infrastructure (Nodes + Redis) in an Asian datacenter.",
            isCorrect: true,
            explanation: "Correct! Since creating URLs (writes) is rare, users in Asia can still hit the US database to create links. But for clicking links (reads), you can deploy a Load Balancer, Node servers, and a Redis cache locally in Tokyo. The cache warms up locally, giving Asian users 10ms latency for redirects."
          },
          {
            id: "opt2",
            text: "Move the Primary Database to Asia.",
            isCorrect: false,
            explanation: "Now the US users will experience 300ms latency."
          },
          {
            id: "opt3",
            text: "Upgrade the Load Balancer to a Layer 4 Network Load Balancer.",
            isCorrect: false,
            explanation: "A faster Load Balancer in the US does not solve the physical speed of light for packets traveling across the Pacific Ocean."
          }
        ]
      }
    },
    {
      id: "sdcs-explain-communication",
      topicId: "sd-case-studies",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "During an interview, you realize you need a Message Queue. Do you immediately draw it on the whiteboard?",
        modelAnswer: "No. You should say: 'To decouple the analytics processing and protect the user latency, I am thinking of introducing an asynchronous message queue here like Kafka. Does that align with our requirements, or would you prefer I explore a synchronous batching approach?' Always communicate the tradeoff and seek alignment before committing to a component.",
        interviewContext: "This 'structural communication' is often what determines if you get the job or not."
      }
    },
    {
      id: "sdcs-complete",
      topicId: "sd-case-studies",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Interviews & Case Studies",
        topicId: "sd-case-studies"
      }
    }
  ]
};
