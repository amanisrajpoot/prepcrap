import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "bi-system-design")!;

export const biSystemDesignPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "bis-intro",
      topicId: "bi-system-design",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Backend System Design",
        explanation: "Backend System Design interviews test your ability to handle scale, failure, and tradeoffs. You are rarely expected to write code; instead, you will draw boxes and arrows. The biggest mistake candidates make is jumping straight into drawing without gathering requirements. You must understand the Read vs Write ratio, the total expected storage, and the availability requirements before you can decide between a SQL and NoSQL database.",
        interviewContext: "Always start with capacity estimation (Fermi calculations) and API design before drawing the architecture."
      }
    },
    {
      id: "bis-scenario-spof",
      topicId: "bi-system-design",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Single Point of Failure (SPOF)",
        scenario: "You are designing a high-traffic URL shortener (like bit.ly). You draw an architecture with multiple web servers sitting behind a load balancer, all talking to a single massive PostgreSQL database. What is the critical flaw?",
        options: [
          {
            id: "opt1",
            text: "PostgreSQL cannot handle high traffic.",
            isCorrect: false,
            explanation: "PostgreSQL can handle massive traffic if tuned correctly, but that's not the critical flaw in the architecture diagram."
          },
          {
            id: "opt2",
            text: "You didn't include a Redis cache.",
            isCorrect: false,
            explanation: "While a cache is highly recommended for a read-heavy system like a URL shortener, its absence isn't a fatal flaw that crashes the system; it just makes it slower."
          },
          {
            id: "opt3",
            text: "The single database is a Single Point of Failure.",
            isCorrect: true,
            explanation: "Correct! If that one database server's hard drive fails or it loses network connectivity, the entire system goes down. You must design for failure by including at least a Primary-Replica setup with automatic failover."
          }
        ]
      }
    },
    {
      id: "bis-explain-eventual",
      topicId: "bi-system-design",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Explain the concept of 'Eventual Consistency' and give an example of when it is acceptable to use.",
        modelAnswer: "Eventual Consistency means that if no new updates are made to a given piece of data, eventually all reads of that data will return the last updated value. However, there is a window of time where reads might be stale. It is acceptable in systems where high availability and low latency are more important than strict correctness. Example: updating a user's Facebook status or YouTube view count. It is NOT acceptable for banking transactions.",
        interviewContext: "Mention the CAP Theorem (Consistency, Availability, Partition Tolerance)."
      }
    },
    {
      id: "bis-complete",
      topicId: "bi-system-design",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Backend System Design",
        topicId: "bi-system-design"
      }
    }
  ]
};
