import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "sd-reliability")!;

export const sdReliabilityPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "sdrb-intro",
      topicId: "sd-reliability",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Reliability & Failure Engineering",
        explanation: "Mid-level engineers design systems that work when everything is perfect. Senior engineers design systems that survive when everything is on fire. At scale, hardware WILL fail, networks WILL partition, and data centers WILL burn down. If your system requires human intervention to stay online, it is not highly available.",
        interviewContext: "Interviewers will intentionally 'kill' components of your architecture diagram during the interview to see if the system recovers automatically or collapses."
      }
    },
    {
      id: "sdrb-incident-stampede",
      topicId: "sd-reliability",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Cache Stampede",
        incident: "PagerDuty Alert!\n\nThe Primary Database just crashed due to a massive CPU spike.\n\nYou investigate the logs: A highly popular Reddit post went viral. The post's data was cached in Redis with a TTL of 10 minutes. Exactly when the TTL expired, 50,000 users requested the post at the exact same millisecond. Since the cache was empty, all 50,000 requests bypassed Redis and hit the Database simultaneously to rebuild the cache, instantly killing the DB.",
        options: [
          {
            id: "opt1",
            text: "Increase the Redis cache size.",
            explanation: "The cache didn't run out of memory; the TTL naturally expired. Increasing the size doesn't prevent the stampede.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Implement a Mutex Lock (Cache Locking).",
            explanation: "Correct! When the cache expires, you must acquire a distributed lock in Redis. The FIRST request gets the lock, queries the DB, and rebuilds the cache. The other 49,999 requests wait for the lock or serve stale data. This guarantees that exactly ONE request hits the database, completely preventing the stampede.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Scale the Database vertically.",
            explanation: "Even if you scale the DB, 50,000 concurrent complex queries will still overwhelm it. You must fix the architecture, not just throw money at the hardware.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "sdrb-incident-retry",
      topicId: "sd-reliability",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Retry Storm",
        incident: "PagerDuty Alert!\n\nService B is experiencing a minor 5% error rate due to a slow garbage collection cycle.\n\nService A depends on Service B. Whenever Service A gets an error, it immediately retries the request 3 times. Because of these retries, Service B's load quadruples. Service B's error rate jumps to 100%, taking down the entire platform.",
        options: [
          {
            id: "opt1",
            text: "Turn off garbage collection in Service B.",
            explanation: "You cannot turn off garbage collection in managed runtimes like Node.js or Java; memory would leak infinitely.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Implement Exponential Backoff and Jitter in Service A.",
            explanation: "Correct! If an API fails, you should never retry immediately. You must wait (e.g., 1s, then 2s, then 4s). Furthermore, you MUST add 'Jitter' (randomness) to the wait time. If you don't add Jitter, thousands of clients will back off and then all retry at the exact same millisecond, creating a 'Thundering Herd' that knocks the service back down.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Scale Service A up.",
            explanation: "Scaling Service A makes the problem worse, as it will just send even more retry requests to the dying Service B.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "sdrb-scenario-regional",
      topicId: "sd-reliability",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Datacenter Outage",
        scenario: "You are the lead architect for a global E-commerce platform. AWS `us-east-1` goes down completely. Your Load Balancer successfully routes all new traffic to `us-west-2`. However, users in `us-west-2` complain that they cannot checkout, and their shopping carts are empty.",
        options: [
          {
            id: "opt1",
            text: "The Load Balancer is misconfigured.",
            isCorrect: false,
            explanation: "The scenario states the LB successfully routed traffic to the West region."
          },
          {
            id: "opt2",
            text: "The database replication lag was too high, or state was not replicated globally.",
            isCorrect: true,
            explanation: "Correct! If the users' shopping cart data (or the primary writable database) only existed in `us-east-1`, failing over the compute instances to `us-west-2` is useless. Multi-region high availability requires synchronous or fast-asynchronous cross-region data replication, which is the hardest problem in distributed systems."
          },
          {
            id: "opt3",
            text: "The CDN didn't cache the HTML pages.",
            isCorrect: false,
            explanation: "Shopping carts are dynamic state, they cannot be cached on a CDN."
          }
        ]
      }
    },
    {
      id: "sdrb-tradeoff-active",
      topicId: "sd-reliability",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "tradeoff",
      difficulty: "advanced",
      payload: {
        question: "Multi-Region Architecture",
        scenario: "You have been tasked with designing a system that survives the total destruction of a datacenter.",
        optionA: "Active-Passive Failover",
        optionB: "Active-Active Architecture",
        options: [
          {
            id: "opt1",
            text: "I select Active-Passive Failover.",
            isCorrect: true,
            explanation: "Correct (in most scenarios)! Active-Passive means Region A serves 100% of traffic, while Region B sits idle, constantly receiving DB backups. If A dies, a script flips the DNS to B. It is vastly cheaper and easier to engineer than Active-Active, which requires complex bi-directional database replication and conflict resolution. Always start with Active-Passive unless you have massive global latency constraints."
          },
          {
            id: "opt2",
            text: "I select Active-Active Architecture.",
            isCorrect: false,
            explanation: "While Active-Active is the 'ultimate' reliability, it is wildly expensive and introduces nightmarish data synchronization problems (e.g., User updates profile in US, simultaneously updates in EU, which wins?). You should not default to this."
          }
        ]
      }
    },
    {
      id: "sdrb-explain-rate",
      topicId: "sd-reliability",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Explain the difference between a 'Token Bucket' and a 'Leaky Bucket' rate limiting algorithm.",
        modelAnswer: "Token Bucket: You are given a bucket with N tokens. Every request costs 1 token. The bucket refills at a constant rate. This allows for 'bursts' of traffic (if you haven't used your tokens recently, you can spend them all at once).\n\nLeaky Bucket: Requests are put into a queue (the bucket). The bucket leaks (processes) requests at a strict, constant rate. If the bucket is full, new requests are dropped. This strictly enforces a smooth, constant output rate with no bursts.",
        interviewContext: "Knowing specific rate limiting algorithms shows you have implemented API defenses in the real world."
      }
    },
    {
      id: "sdrb-complete",
      topicId: "sd-reliability",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Reliability & Failure Engineering",
        topicId: "sd-reliability"
      }
    }
  ]
};
