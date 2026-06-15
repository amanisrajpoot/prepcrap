import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "pg-transactions")!;

export const pgTransactionsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "pgt-intro",
      topicId: "pg-transactions",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Transactions & Concurrency",
        explanation: "When two users try to buy the last concert ticket at the exact same millisecond, what happens? This is the core of backend concurrency. PostgreSQL uses ACID guarantees (Atomicity, Consistency, Isolation, Durability) to ensure data integrity. However, by default, Postgres uses the 'Read Committed' isolation level, which is fast but DOES NOT protect against race conditions like 'lost updates'.",
        interviewContext: "Concurrency bugs are the #1 cause of financial losses in backend systems."
      }
    },
    {
      id: "pgt-scenario-race",
      topicId: "pg-transactions",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Lost Update",
        scenario: "You are building a banking app. User A and User B both withdraw $50 from a shared account with a $100 balance at the exact same time. The code does: \n1. `balance = SELECT balance FROM accounts`\n2. `UPDATE accounts SET balance = balance - 50`. \nWhat happens?",
        options: [
          {
            id: "opt1",
            text: "PostgreSQL automatically queues the requests, resulting in a $0 balance.",
            isCorrect: false,
            explanation: "Postgres does not queue queries automatically unless you explicitly lock rows."
          },
          {
            id: "opt2",
            text: "Both queries read $100. Both queries update the balance to $50. The final balance is $50, and the bank just lost $50.",
            isCorrect: true,
            explanation: "Correct! This is a classic 'Lost Update' race condition. Because both transactions read the balance before either committed the update, they both overwrite the balance with $50. To fix this, you must use `SELECT ... FOR UPDATE` to lock the row, or do a relative update: `UPDATE accounts SET balance = balance - 50` directly in SQL without the read."
          },
          {
            id: "opt3",
            text: "The database throws a Deadlock error.",
            isCorrect: false,
            explanation: "A deadlock only happens when two transactions lock resources in opposite orders (A waits for B, B waits for A)."
          }
        ]
      }
    },
    {
      id: "pgt-explain-isolation",
      topicId: "pg-transactions",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "What is the difference between 'Read Committed' and 'Serializable' isolation levels?",
        modelAnswer: "Read Committed guarantees you only read data that has been successfully committed, preventing 'Dirty Reads'. However, if a row is updated by another transaction *while* your transaction is running, you will see the new data (Non-Repeatable Read). Serializable is the strictest level; it guarantees that concurrent transactions behave exactly as if they were executed sequentially one after the other, preventing all race conditions (at a massive performance cost).",
        interviewContext: "Seniors should know that Postgres defaults to Read Committed, not Serializable."
      }
    },
    {
      id: "pgt-complete",
      topicId: "pg-transactions",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Transactions & Concurrency",
        topicId: "pg-transactions"
      }
    }
  ]
};
