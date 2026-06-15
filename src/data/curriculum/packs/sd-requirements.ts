import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "sd-requirements")!;

export const sdRequirementsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "sdr-intro",
      topicId: "sd-requirements",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "foundation",
      payload: {
        topic: "Requirements & Estimation",
        explanation: "Most candidates fail system design interviews in the first 5 minutes. They hear 'Design Netflix' and immediately start drawing boxes for Load Balancers and Databases without asking about scale, traffic patterns, or core features. System design is entirely about making decisions under constraints. If you don't define the constraints, your design is guaranteed to be wrong.",
        interviewContext: "You should spend 15-20% of the interview strictly defining Functional Requirements (what it does) and Non-Functional Requirements (scale, latency, availability) before drawing a single box."
      }
    },
    {
      id: "sdr-scenario-first-question",
      topicId: "sd-requirements",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "The First 5 Minutes",
        scenario: "The interviewer says: 'I want you to design a URL Shortener service like Bitly. You have 50 million monthly active users.'\n\nWhat is the absolute FIRST question you should ask?",
        options: [
          {
            id: "opt1",
            text: "Should we use a relational database (PostgreSQL) or NoSQL (MongoDB)?",
            isCorrect: false,
            explanation: "Way too early. You cannot pick a database until you know the read/write ratio and data shape."
          },
          {
            id: "opt2",
            text: "What is the read-to-write ratio?",
            isCorrect: true,
            explanation: "Correct! Are people creating millions of URLs per day, or are they clicking them? A URL shortener is famously read-heavy (e.g., 100 reads for every 1 write). Knowing this instantly tells you that caching is going to be the most critical component of the architecture."
          },
          {
            id: "opt3",
            text: "Should I draw a Load Balancer first?",
            isCorrect: false,
            explanation: "Never ask for permission to draw standard infrastructure. Ask about the constraints of the specific problem."
          }
        ]
      }
    },
    {
      id: "sdr-estimation-storage",
      topicId: "sd-requirements",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "estimation",
      difficulty: "advanced",
      payload: {
        question: "Storage Capacity Planning",
        scenario: "You are designing a URL Shortener.\n\nAssumptions:\n- You generate 100 million new URLs per month.\n- You must store them for 10 years.\n- Each URL record (short link + long link + metadata) is approximately 500 bytes.\n\nCalculate the total storage required for 10 years.",
        options: [
          {
            id: "opt1",
            text: "~6 Terabytes (TB)",
            isCorrect: true,
            explanation: "Correct!\n100M URLs/month * 12 months = 1.2 Billion URLs/year.\n1.2B * 10 years = 12 Billion URLs total.\n12 Billion * 500 bytes = 6,000,000,000,000 bytes = ~6 TB."
          },
          {
            id: "opt2",
            text: "~60 Gigabytes (GB)",
            isCorrect: false,
            explanation: "Incorrect math. 12 Billion * 500 bytes is not 60 GB."
          },
          {
            id: "opt3",
            text: "~600 Terabytes (TB)",
            isCorrect: false,
            explanation: "This would be the answer if each record was 50 Kilobytes, not 500 bytes."
          }
        ]
      }
    },
    {
      id: "sdr-tradeoff-availability",
      topicId: "sd-requirements",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "tradeoff",
      difficulty: "advanced",
      payload: {
        question: "Availability Targets",
        scenario: "You are designing the backend for an internal HR tool that employees use to request vacation time. The PM asks you to ensure 'Maximum Reliability'.",
        optionA: "Target 99.9% Availability (Three Nines)",
        optionB: "Target 99.999% Availability (Five Nines)",
        options: [
          {
            id: "opt1",
            text: "I select Three Nines (99.9%).",
            isCorrect: true,
            explanation: "Correct! 99.9% availability allows ~8.7 hours of downtime per year, which is perfectly acceptable for an internal HR tool. Pushing for Five Nines (5 minutes of downtime per year) requires massively expensive multi-region active-active architectures. Over-engineering availability is a classic junior mistake."
          },
          {
            id: "opt2",
            text: "I select Five Nines (99.999%).",
            isCorrect: false,
            explanation: "Incorrect. Achieving Five Nines increases infrastructure costs exponentially. If the HR tool goes down for an hour, nobody dies and no revenue is lost. The business does not need, and should not pay for, Five Nines."
          }
        ]
      }
    },
    {
      id: "sdr-incident-latency",
      topicId: "sd-requirements",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Unreachable Target",
        incident: "PagerDuty Alert!\n\nYour API latency has breached the SLA target of 50ms.\n\nYou recently launched the service globally. Users in Australia are reporting 250ms latency. The DB query takes 10ms, the cache takes 2ms, and the application logic takes 5ms. The math doesn't add up.",
        options: [
          {
            id: "opt1",
            text: "The database connection pool is exhausted.",
            explanation: "If the connection pool was exhausted, the DB query time would spike. It is a stable 10ms.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "The SLA assumption ignored the speed of light.",
            explanation: "Correct! If your servers are in us-east-1 (Virginia), a network packet traveling to Sydney, Australia and back takes ~200ms purely due to the speed of light and fiber optic routing. You cannot beat physics. To meet a 50ms global SLA, you must revisit the assumption that a single-region deployment is sufficient, and deploy Edge Nodes or Multi-Region infrastructure.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "The JSON payload is too large to parse quickly.",
            explanation: "The application logic (which includes parsing) is only taking 5ms.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "sdr-explain-throughput",
      topicId: "sd-requirements",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "explain",
      difficulty: "intermediate",
      payload: {
        prompt: "In System Design, what is the difference between Latency and Throughput?",
        modelAnswer: "Latency is the time it takes for a SINGLE request to be processed and returned (e.g., 'This API takes 50ms').\nThroughput is the TOTAL NUMBER of requests the system can process concurrently in a given timeframe (e.g., 'This system handles 10,000 Requests Per Second (RPS)').\n\nYou can have low latency but terrible throughput if your server can only handle 1 user at a time.",
        interviewContext: "Confusing these two terms is an immediate red flag in an interview."
      }
    },
    {
      id: "sdr-complete",
      topicId: "sd-requirements",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Requirements & Estimation",
        topicId: "sd-requirements"
      }
    }
  ]
};
