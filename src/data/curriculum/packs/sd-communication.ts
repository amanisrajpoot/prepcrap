import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "sd-communication")!;

export const sdCommunicationPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "sdc-intro",
      topicId: "sd-communication",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Communication & Distributed Systems",
        explanation: "Juniors argue about REST vs GraphQL. Seniors argue about Synchronous vs Asynchronous communication. Deciding when to block the user waiting for a response (Sync), versus when to drop a message on a queue and return immediately (Async), is the core of distributed system architecture.",
        interviewContext: "Interviewers will give you a feature (like 'Process a Payment' or 'Generate a PDF') and judge you entirely on whether you choose to make that operation synchronous or asynchronous."
      }
    },
    {
      id: "sdc-tradeoff-video",
      topicId: "sd-communication",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "tradeoff",
      difficulty: "intermediate",
      payload: {
        question: "Video Upload Processing",
        scenario: "Users upload large 4K videos. The backend must compress the video, extract thumbnails, and update the database. This process takes ~5 minutes.",
        optionA: "Synchronous REST API",
        optionB: "Asynchronous Message Queue",
        options: [
          {
            id: "opt1",
            text: "I select Synchronous REST API.",
            isCorrect: false,
            explanation: "HTTP connections cannot and should not be kept open for 5 minutes. The load balancer, the browser, or the server will timeout and drop the connection, failing the upload."
          },
          {
            id: "opt2",
            text: "I select Asynchronous Message Queue.",
            isCorrect: true,
            explanation: "Correct! The user uploads the raw file to S3. The API immediately returns HTTP 202 (Accepted) so the UI can show 'Processing...'. A message is dropped onto a queue (e.g., RabbitMQ or SQS). A background worker picks up the message, takes 5 minutes to compress it, and then sends a WebSocket event or push notification to the user when it's done."
          }
        ]
      }
    },
    {
      id: "sdc-tradeoff-payment",
      topicId: "sd-communication",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "tradeoff",
      difficulty: "advanced",
      payload: {
        question: "Payment Processing",
        scenario: "A user clicks 'Checkout' to buy a pair of shoes. You must charge their credit card using Stripe.",
        optionA: "Synchronous REST API",
        optionB: "Asynchronous Message Queue",
        options: [
          {
            id: "opt1",
            text: "I select Synchronous REST API.",
            isCorrect: true,
            explanation: "Correct! The user MUST know immediately if their credit card was declined. If you put the payment on a background queue, the user might close the app thinking they bought the shoes, only for the payment to fail 5 minutes later. Core user flows that dictate the immediate next step (Success Page vs Error Page) must be synchronous."
          },
          {
            id: "opt2",
            text: "I select Asynchronous Message Queue.",
            isCorrect: false,
            explanation: "Incorrect. While a queue is more scalable, you cannot tell the user 'We are processing your payment in the background, we will email you if your card is declined.' E-commerce requires immediate transactional feedback."
          }
        ]
      }
    },
    {
      id: "sdc-incident-delivery",
      topicId: "sd-communication",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Double Email",
        incident: "PagerDuty Alert!\n\nYou use an 'At-Least-Once' message queue to send welcome emails. Yesterday, the queue system experienced a brief network partition. Today, thousands of users are complaining they received the exact same Welcome Email three times.",
        options: [
          {
            id: "opt1",
            text: "Switch the queue to 'Exactly-Once' delivery.",
            explanation: "True 'Exactly-Once' delivery is mathematically impossible in distributed systems across independent services (like an Email API). Kafka claims it, but only internally within its own ecosystem.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Implement Idempotency on the email worker.",
            explanation: "Correct! 'At-Least-Once' guarantees the message arrives, but it might arrive multiple times. You MUST build your workers to be Idempotent. The worker should check the DB: 'Have I sent the Welcome Email for User_ID 123?' before calling the Email API. If yes, it safely ignores the duplicate message.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Switch to 'At-Most-Once' delivery.",
            explanation: "This would solve the duplicate emails, but now if the network partitions, the message is dropped forever and the user NEVER gets the welcome email. That's a worse user experience.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "sdc-explain-idempotency",
      topicId: "sd-communication",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Explain the concept of 'Idempotency' in the context of a REST API.",
        modelAnswer: "An operation is idempotent if executing it multiple times has the exact same result as executing it once. For example, a `GET` request or a `PUT` request (updating a user's name to 'Bob') is naturally idempotent. A `POST` request (charging a credit card) is NOT naturally idempotent. To make it idempotent, the client must pass a unique `Idempotency-Key` header so the server can ignore accidental duplicate requests.",
        interviewContext: "This is the #1 concept tested when discussing API design and network reliability."
      }
    },
    {
      id: "sdc-scenario-kafka",
      topicId: "sd-communication",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Event Sourcing",
        scenario: "You are designing the architecture for a bank. You need an immutable, append-only log of every transaction that has ever occurred, allowing new microservices to 'replay' history to build their own databases.",
        options: [
          {
            id: "opt1",
            text: "Use RabbitMQ.",
            isCorrect: false,
            explanation: "RabbitMQ is a traditional message broker. Once a consumer reads a message, it is deleted from the queue. You cannot 'replay' history."
          },
          {
            id: "opt2",
            text: "Use Apache Kafka.",
            isCorrect: true,
            explanation: "Correct! Kafka is a distributed event streaming platform. It persists events to disk for a configured retention period (or forever). A brand new microservice can connect to Kafka and read all events from the beginning of time to build its own state. This is called Event Sourcing."
          },
          {
            id: "opt3",
            text: "Use Redis Pub/Sub.",
            isCorrect: false,
            explanation: "Redis Pub/Sub is fire-and-forget. If a subscriber is not listening at the exact moment the event is fired, the event is lost forever."
          }
        ]
      }
    },
    {
      id: "sdc-complete",
      topicId: "sd-communication",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Communication & Distributed Systems",
        topicId: "sd-communication"
      }
    }
  ]
};
