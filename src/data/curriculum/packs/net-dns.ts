import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "net-dns")!;

export const netDnsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "nd-intro",
      topicId: "net-dns",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "DNS & Load Balancing",
        explanation: "When you type `google.com`, your browser doesn't know where to go. It queries a DNS (Domain Name System) server to translate that name into an IP address. Once the request reaches that IP, it hits a Load Balancer. Layer 4 load balancers simply route IP/Port traffic efficiently. Layer 7 load balancers decrypt the HTTPS traffic, read the URL path (e.g. `/api/v1`), and make smart routing decisions to specific microservices.",
        interviewContext: "'What happens when you type google.com' is the most famous systems interview question in the world."
      }
    },
    {
      id: "nd-scenario-l7",
      topicId: "net-dns",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Layer 4 vs Layer 7",
        scenario: "You have a monolithic architecture, but you are extracting the video processing service to a new set of servers. You want all requests to `api.example.com/video/*` to go to the new servers, and everything else to go to the monolith. What do you need?",
        options: [
          {
            id: "opt1",
            text: "A Layer 4 Load Balancer",
            isCorrect: false,
            explanation: "Layer 4 operates at the TCP level. It only sees the IP and Port. It has no idea what URL path the user requested, because the HTTP payload is encrypted."
          },
          {
            id: "opt2",
            text: "A Layer 7 Load Balancer",
            isCorrect: true,
            explanation: "Correct! Layer 7 operates at the Application layer. It terminates the TLS connection, decrypts the traffic, reads the HTTP headers and URL path (`/video/*`), and can intelligently route the request to the correct backend pool."
          },
          {
            id: "opt3",
            text: "A DNS A-Record update",
            isCorrect: false,
            explanation: "DNS maps domain names (api.example.com) to IPs. It cannot map specific URL paths."
          }
        ]
      }
    },
    {
      id: "nd-explain-dns",
      topicId: "net-dns",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Briefly explain the steps of DNS resolution when a user types a new URL into their browser.",
        modelAnswer: "1. Browser Cache: Checks if the IP is cached locally.\n2. OS Cache: Checks the operating system's DNS resolver cache.\n3. ISP Resolver: Queries the ISP's DNS server.\n4. Root Server: If not found, ISP queries the Root DNS servers to find the Top Level Domain (TLD) server for '.com'.\n5. TLD Server: Points to the Authoritative Name Server for the specific domain.\n6. Authoritative Server: Returns the actual A-Record (IP address) to the browser.",
        interviewContext: "You don't need to know every RFC, but you must know the difference between the Root, TLD, and Authoritative servers."
      }
    },
    {
      id: "nd-complete",
      topicId: "net-dns",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "DNS & Load Balancing",
        topicId: "net-dns"
      }
    }
  ]
};
