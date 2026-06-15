import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "sd-storage")!;

export const sdStoragePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "sds-intro",
      topicId: "sd-storage",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Storage & Data Modeling",
        explanation: "Choosing a database is the most permanent decision you will make in a system design. If you pick the wrong compute layer, you can rewrite the code in a weekend. If you pick the wrong storage layer and have 10 Terabytes of live production data, migrating it is a multi-month nightmare.",
        interviewContext: "Interviewers do not care if you choose SQL or NoSQL. They care entirely about WHY you chose it. You must be able to defend your choice based on schema flexibility, read/write throughput, and consistency requirements."
      }
    },
    {
      id: "sds-hottake-nosql",
      topicId: "sd-storage",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "hot-take",
      difficulty: "intermediate",
      payload: {
        quote: "NoSQL scales better than SQL.",
        author: "Junior Developer",
        options: [
          {
            id: "opt1",
            text: "Strongly Agree",
            isCorrect: false,
            explanation: "This is a dangerous oversimplification."
          },
          {
            id: "opt2",
            text: "It Depends",
            isCorrect: true,
            explanation: "Correct! NoSQL databases (like Cassandra or DynamoDB) scale HORIZONTALLY much easier out-of-the-box because they don't enforce strict ACID transactions across distributed nodes. However, modern SQL databases (like PostgreSQL or NewSQL solutions like CockroachDB) scale incredibly well vertically and can be horizontally sharded. 'NoSQL is for scale' is a junior myth."
          },
          {
            id: "opt3",
            text: "Strongly Disagree",
            isCorrect: false,
            explanation: "While SQL scales well, NoSQL wide-column stores do have a massive edge in pure write-throughput for time-series data."
          }
        ]
      }
    },
    {
      id: "sds-tradeoff-cache-replica",
      topicId: "sd-storage",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "tradeoff",
      difficulty: "advanced",
      payload: {
        question: "Database is Overloaded",
        scenario: "Your primary PostgreSQL database is hitting 90% CPU. The application is read-heavy (95% reads, 5% writes). You need to reduce the load on the primary DB.",
        optionA: "Add a Redis Cache",
        optionB: "Add a DB Read Replica",
        options: [
          {
            id: "opt1",
            text: "I select Redis Cache.",
            isCorrect: false,
            explanation: "While a cache is great, it introduces cache invalidation logic, which is notoriously difficult to get right. If the data is highly dynamic, the cache miss rate might be high, and the DB will still be overloaded."
          },
          {
            id: "opt2",
            text: "I select DB Read Replica.",
            isCorrect: true,
            explanation: "Correct! In a heavily read-skewed system, spinning up a Read Replica (and routing SELECT queries to it) instantly cuts the load on the Primary DB with almost zero code changes. You don't have to write complex cache invalidation logic. Always scale the database natively before introducing an entirely new stateful component like Redis."
          }
        ]
      }
    },
    {
      id: "sds-explain-eventual",
      topicId: "sd-storage",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "You chose to use a NoSQL database with 'Eventual Consistency' for the user profile service. The interviewer asks: 'What user-facing bug might happen because of this?'",
        modelAnswer: "With eventual consistency, writes are acknowledged before they are fully propagated to all read replicas. The classic bug is: A user uploads a new profile picture, the page refreshes, and they still see their OLD profile picture for a few seconds. The read request hit a replica that hadn't received the update yet.",
        interviewContext: "You must be able to tie abstract distributed system concepts (consistency models) to actual user experiences."
      }
    },
    {
      id: "sds-tradeoff-nosql-sql",
      topicId: "sd-storage",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "tradeoff",
      difficulty: "intermediate",
      payload: {
        question: "Financial Ledger Design",
        scenario: "You are designing the core ledger for a Fintech app. Users transfer money between accounts. The data schema is highly structured and will almost never change.",
        optionA: "Relational DB (PostgreSQL)",
        optionB: "Document DB (MongoDB)",
        options: [
          {
            id: "opt1",
            text: "I select PostgreSQL.",
            isCorrect: true,
            explanation: "Correct! For financial data, strict ACID guarantees (Atomicity, Consistency, Isolation, Durability) are non-negotiable. If a transfer deducts $100 from Account A, it MUST guarantee the $100 is added to Account B. Relational databases excel at multi-row transactions and structured schemas."
          },
          {
            id: "opt2",
            text: "I select MongoDB.",
            isCorrect: false,
            explanation: "While MongoDB supports transactions now, Document databases are designed for unstructured, flexible data. A financial ledger is the exact opposite of that."
          }
        ]
      }
    },
    {
      id: "sds-scenario-sharding",
      topicId: "sd-storage",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Celebrity Problem",
        scenario: "You decided to shard your Twitter-clone's database by `user_id`. Every time a user tweets, it goes to the shard associated with their ID. Justin Bieber (who has 100M followers) posts a tweet.",
        options: [
          {
            id: "opt1",
            text: "The shard runs out of memory.",
            isCorrect: false,
            explanation: "Storing one tweet takes very little memory."
          },
          {
            id: "opt2",
            text: "A 'Hot Shard' bottleneck occurs.",
            isCorrect: true,
            explanation: "Correct! Because all 100M followers instantly try to read that specific tweet, 100% of the read traffic hits a SINGLE database shard, melting it down. This is the 'Celebrity Problem'. Sharding by user_id works for normal users, but celebrities require a completely different architecture (like heavy pre-computation and caching)."
          },
          {
            id: "opt3",
            text: "The consistent hashing ring rebalances.",
            isCorrect: false,
            explanation: "Hashing rings do not rebalance based on traffic load, only on node failure/addition."
          }
        ]
      }
    },
    {
      id: "sds-complete",
      topicId: "sd-storage",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Storage & Data Modeling",
        topicId: "sd-storage"
      }
    }
  ]
};
