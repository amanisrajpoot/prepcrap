import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "node-architecture")!;

export const nodeArchitecturePack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "na-intro",
      topicId: "node-architecture",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Backend Architecture",
        explanation: "As systems grow, the hardest problems are no longer about syntax, but about resilience, testability, and state management. Senior engineers must design APIs that can safely handle network failures (Idempotency), write code that can be mocked (Dependency Injection), and build applications that can be deployed anywhere without code changes (Twelve-Factor Apps).",
        interviewContext: "These concepts separate the mid-level 'I can build a REST API' developers from the senior 'I can build a resilient distributed system' engineers."
      }
    },
    {
      id: "na-incident-idempotency",
      topicId: "node-architecture",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Double Charge",
        incident: "PagerDuty Alert!\n\nMultiple users are complaining they were charged twice for their monthly subscription.\n\nLogs show: The user's mobile app sent a POST /charge request. The Node.js server charged the credit card, but right before sending the HTTP 200 response, a brief network blip dropped the connection. The mobile app timed out, and automatically retried the POST request. The server charged the card again.",
        options: [
          {
            id: "opt1",
            text: "Change the mobile app to never automatically retry POST requests.",
            explanation: "Mobile networks are inherently flaky. If you never retry, users will constantly see 'Payment Failed' errors even if it actually succeeded on the backend.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Implement an Idempotency Key in the request header.",
            explanation: "Correct! The client generates a unique 'Idempotency-Key' (UUID) and sends it with the POST. The Node.js server checks the database: 'Have I seen this key recently?'. If yes, it immediately returns the cached successful response without hitting Stripe again. If no, it processes the payment and saves the key.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Use a GET request instead of a POST request.",
            explanation: "GET requests are naturally idempotent, but they should never be used for state-changing operations like charging a credit card.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "na-explain-twelve-factor",
      topicId: "node-architecture",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "What is the 'Twelve-Factor App' principle regarding Configuration, and why is it important?",
        modelAnswer: "The Twelve-Factor App methodology states that ALL configuration that varies between deployments (Staging, Production, Local) must be stored in the Environment (Environment Variables), NEVER hardcoded in the codebase.\n\nThis ensures that you can deploy the exact same compiled code/Docker container to any environment without changing a single line of code, preventing secrets from leaking into version control.",
        interviewContext: "If an interviewer asks how you manage secrets or config, 'dotenv' and environment variables are the only acceptable starting points."
      }
    },
    {
      id: "na-scenario-di",
      topicId: "node-architecture",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Untestable Code",
        scenario: "You are writing unit tests for a `UserService` that sends a welcome email. However, every time you run the unit tests, actual emails are sent to users because the `UserService` directly imports and instantiates the `SendGridClient` inside its constructor. How do you fix this?",
        options: [
          {
            id: "opt1",
            text: "Use Dependency Injection.",
            isCorrect: true,
            explanation: "Correct! Instead of instantiating the SendGridClient INSIDE the UserService, you pass the client IN via the constructor parameters: `new UserService(emailClient)`. In production, you pass the real SendGridClient. In unit tests, you pass a MockEmailClient that does nothing. This is Dependency Injection."
          },
          {
            id: "opt2",
            text: "Add an `if (process.env.NODE_ENV === 'test')` check inside the UserService.",
            isCorrect: false,
            explanation: "While this technically works, it couples your production business logic with test environment logic. It makes the code harder to read and maintain."
          },
          {
            id: "opt3",
            text: "Use Jest to globally mock the entire network stack.",
            isCorrect: false,
            explanation: "This is a brittle hack. It's much better to design the architecture to be inherently testable via DI."
          }
        ]
      }
    },
    {
      id: "na-scenario-feature-flags",
      topicId: "node-architecture",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "The Risky Migration",
        scenario: "You need to migrate the underlying search engine of your API from PostgreSQL to Elasticsearch. It's a massive rewrite. You want to test it in production without risking all your users crashing if there's a bug.",
        options: [
          {
            id: "opt1",
            text: "Deploy it to a staging server and run load tests.",
            isCorrect: false,
            explanation: "Staging environments rarely match the true chaos and data shape of production."
          },
          {
            id: "opt2",
            text: "Implement a Feature Flag to progressively route traffic.",
            isCorrect: true,
            explanation: "Correct! You wrap the logic in a Feature Flag. Initially, you route 99% of traffic to Postgres and 1% to Elasticsearch. If the 1% succeeds and performance is good, you slowly dial the flag up to 10%, 50%, and finally 100%. If it fails, you instantly dial the flag back to 0% without redeploying the code."
          },
          {
            id: "opt3",
            text: "Deploy it at 3:00 AM on a Sunday when traffic is lowest.",
            isCorrect: false,
            explanation: "This is a stressful 'Big Bang' release strategy that relies on hope rather than engineering."
          }
        ]
      }
    },
    {
      id: "na-complete",
      topicId: "node-architecture",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Backend Architecture",
        topicId: "node-architecture"
      }
    }
  ]
};
