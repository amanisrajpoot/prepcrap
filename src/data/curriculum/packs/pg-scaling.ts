import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "pg-scaling")!;

export const pgScalingPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "pgs-intro",
      topicId: "pg-scaling",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Scaling PostgreSQL",
        explanation: "Scaling a stateless Node.js server is easy: just spin up more containers. Scaling a stateful PostgreSQL database is incredibly hard. PostgreSQL creates a dedicated OS process for every open connection, which consumes ~10MB of RAM. If you have 50 serverless lambda functions each opening 10 connections, your database will crash. Understanding Connection Pooling, Read Replicas, and Sharding is what separates mid-level from senior backend engineers.",
        interviewContext: "Always suggest Vertical Scaling (bigger server) and Connection Pooling before suggesting Sharding."
      }
    },
    {
      id: "pgs-scenario-pooler",
      topicId: "pg-scaling",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Serverless Connection Crash",
        scenario: "You migrate your backend to AWS Lambda. Suddenly, PostgreSQL keeps crashing with `FATAL: sorry, too many clients already`. What is the correct architectural fix?",
        options: [
          {
            id: "opt1",
            text: "Increase the max_connections setting in postgresql.conf to 10,000.",
            isCorrect: false,
            explanation: "PostgreSQL processes are heavy. Allowing 10,000 connections will exhaust all RAM and CPU, causing the database to thrash and crash even harder."
          },
          {
            id: "opt2",
            text: "Implement a Connection Pooler like PgBouncer between the Lambdas and the Database.",
            isCorrect: true,
            explanation: "Correct! PgBouncer sits in front of the database, accepting thousands of lightweight connections from Lambdas, but only opening a small, fixed number of heavy connections (e.g., 50) to the actual database. It multiplexes the queries over those fixed connections."
          },
          {
            id: "opt3",
            text: "Add a Read Replica.",
            isCorrect: false,
            explanation: "A read replica helps with read-heavy CPU loads, but it does not solve the fundamental issue of serverless environments exhausting connection limits."
          }
        ]
      }
    },
    {
      id: "pgs-explain-sharding",
      topicId: "pg-scaling",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Why should Sharding be the absolute last resort for scaling a relational database?",
        modelAnswer: "Sharding splits your data across multiple physical database servers. The moment you shard, you lose the ability to perform JOINs across different shards, and you lose global foreign key constraints. Application logic becomes incredibly complex because it must know *which* shard holds the data before making a query. You should exhaust Vertical Scaling (bigger CPU/RAM) and Read Replicas before ever attempting to shard.",
        interviewContext: "Interviewers want to see that you understand the massive complexity cost of distributed databases."
      }
    },
    {
      id: "pgs-complete",
      topicId: "pg-scaling",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Scaling PostgreSQL",
        topicId: "pg-scaling"
      }
    }
  ]
};
