import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "net-websockets")!;

export const netWebsocketsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "nw-intro",
      topicId: "net-websockets",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "WebSockets & Real-time",
        explanation: "HTTP is request-response. The client asks, the server answers. But what if the server wants to push a chat message to the client? Historically we used Polling (asking every 5 seconds), which wastes resources. Today, we use WebSockets for true bi-directional communication over a persistent TCP connection, or Server-Sent Events (SSE) for simple uni-directional server-to-client streaming.",
        interviewContext: "Scaling WebSockets is much harder than scaling HTTP because the connections are stateful and persistent. Load balancers must be configured carefully."
      }
    },
    {
      id: "nw-scenario-sse",
      topicId: "net-websockets",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "The Stock Ticker",
        scenario: "You are building a live stock price dashboard. The server needs to push new prices to the client every second. The client never sends data back to the server (other than the initial HTTP request). What is the best technology to use?",
        options: [
          {
            id: "opt1",
            text: "Short Polling (fetch every 1 second)",
            isCorrect: false,
            explanation: "This creates massive overhead. Establishing an HTTP connection requires a TCP handshake and TLS negotiation every single second."
          },
          {
            id: "opt2",
            text: "WebSockets",
            isCorrect: false,
            explanation: "WebSockets work, but they are overkill. WebSockets are designed for *bi-directional* communication (like a chat app). They require a custom protocol upgrade."
          },
          {
            id: "opt3",
            text: "Server-Sent Events (SSE)",
            isCorrect: true,
            explanation: "Correct! SSE is an HTTP standard specifically designed for uni-directional server-to-client streaming. It is much simpler to implement and debug than WebSockets, handles auto-reconnection natively, and works perfectly for a stock ticker."
          }
        ]
      }
    },
    {
      id: "nw-explain-pingpong",
      topicId: "net-websockets",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Why do WebSocket servers typically implement a 'ping/pong' heartbeat mechanism?",
        modelAnswer: "Because WebSockets are persistent TCP connections, network intermediaries (like Load Balancers, Proxies, or NAT routers) will silently drop connections that appear 'idle' for too long (e.g., 60 seconds of no data transfer) to save memory. A ping/pong heartbeat sends a tiny frame every ~30 seconds to keep the connection active and to allow the server to detect if a client has disconnected ungracefully.",
        interviewContext: "If you've built real WebSockets in production, you have dealt with load balancers killing your idle connections."
      }
    },
    {
      id: "nw-complete",
      topicId: "net-websockets",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "WebSockets",
        topicId: "net-websockets"
      }
    }
  ]
};
