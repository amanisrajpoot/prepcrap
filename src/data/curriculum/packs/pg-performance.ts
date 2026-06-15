import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "pg-performance")!;

export const pgPerformancePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "pgp-intro",
      topicId: "pg-performance",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "SQL Performance & Indexing",
        explanation: "As a senior backend engineer, you need to understand exactly what happens when you run a query. PostgreSQL uses a Query Planner to decide the fastest way to retrieve data. Adding an index (which is fundamentally a B-Tree data structure) allows the database to find rows in O(log N) time instead of O(N) sequential scans. However, indexes are not free—they slow down every INSERT, UPDATE, and DELETE because the B-Tree must be rebalanced.",
        interviewContext: "Always mention 'EXPLAIN ANALYZE' when asked how to debug slow queries."
      }
    },
    {
      id: "pgp-scenario-composite",
      topicId: "pg-performance",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Leftmost Prefix Rule",
        scenario: "You have a `users` table with 10 million rows. You create a composite index on `(last_name, first_name)`. Which of the following queries will actually USE this index?",
        options: [
          {
            id: "opt1",
            text: "SELECT * FROM users WHERE first_name = 'John'",
            isCorrect: false,
            explanation: "Because `first_name` is the SECOND column in the index, the database cannot use the B-Tree to find it efficiently without knowing the `last_name` first. This is called the 'leftmost prefix rule'."
          },
          {
            id: "opt2",
            text: "SELECT * FROM users WHERE last_name = 'Smith'",
            isCorrect: true,
            explanation: "Correct! The index can be used for queries filtering by `last_name` alone, OR queries filtering by both `last_name` AND `first_name`. It works like a phonebook sorted by last name, then first name."
          },
          {
            id: "opt3",
            text: "SELECT * FROM users WHERE last_name LIKE '%Smith%'",
            isCorrect: false,
            explanation: "A leading wildcard (`%Smith`) prevents the use of a standard B-Tree index because the database doesn't know what letter the string starts with."
          }
        ]
      }
    },
    {
      id: "pgp-explain-planner",
      topicId: "pg-performance",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Why might PostgreSQL choose to do a Sequential Scan even if an index exists on the column you are filtering by?",
        modelAnswer: "If the Query Planner estimates that the query will return a large percentage of the table (e.g., filtering for `is_active = true` where 95% of users are active), it is actually faster to just read the table sequentially from disk rather than bouncing back and forth between the B-Tree index and the heap memory for every single row.",
        interviewContext: "Interviewers love this question because juniors blindly believe 'Index = Faster'."
      }
    },
    {
      id: "pgp-complete",
      topicId: "pg-performance",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "SQL Performance & Indexing",
        topicId: "pg-performance"
      }
    }
  ]
};
