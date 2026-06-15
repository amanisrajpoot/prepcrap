import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "net-protocols")!;

export const netProtocolsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "np-intro",
      topicId: "net-protocols",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "Protocols (TCP vs UDP)",
        explanation: "As a backend engineer, 'the network' is not magic. It is a set of protocols. TCP (Transmission Control Protocol) is the foundation of HTTP, providing guaranteed, ordered delivery via a 3-way handshake. It is reliable but slow. UDP (User Datagram Protocol) provides absolutely no guarantees—packets can be lost or arrive out of order—but it is blazingly fast. Understanding these layers helps you debug why an API is slow or why a video stream is artifacting.",
        interviewContext: "You must know the TCP 3-way handshake (SYN, SYN-ACK, ACK)."
      }
    },
    {
      id: "np-scenario-udp",
      topicId: "net-protocols",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "Choosing the Right Protocol",
        scenario: "You are building a multiplayer First Person Shooter (FPS) game. You need to send the player's X/Y coordinates to the server 60 times a second. Which protocol should you use for this specific data?",
        options: [
          {
            id: "opt1",
            text: "TCP",
            isCorrect: false,
            explanation: "TCP guarantees delivery. If packet #4 gets lost, TCP will pause the entire stream and wait for #4 to be re-transmitted before delivering packet #5. In an FPS, if packet #4 is lost, it's already outdated because packet #5 has the newer coordinates. This causes unbearable lag."
          },
          {
            id: "opt2",
            text: "UDP",
            isCorrect: true,
            explanation: "Correct! In an FPS, you only care about the *latest* data. If a coordinate packet drops, you don't care, because the next frame's coordinate packet is arriving 16ms later anyway. UDP avoids the latency of waiting for re-transmissions."
          },
          {
            id: "opt3",
            text: "HTTP/2",
            isCorrect: false,
            explanation: "HTTP/2 runs on top of TCP, so it suffers from the exact same Head-of-Line blocking issue when packets are lost."
          }
        ]
      }
    },
    {
      id: "np-explain-http3",
      topicId: "net-protocols",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Why was HTTP/3 built on top of QUIC (which is based on UDP) instead of TCP?",
        modelAnswer: "HTTP/2 runs on TCP. If a single packet is lost on the network, TCP pauses the ENTIRE connection until that packet is re-transmitted (Head-of-Line Blocking), even if multiple independent HTTP requests were sharing that TCP connection. HTTP/3 uses QUIC (over UDP) to handle reliability at the application layer per-stream, so one lost packet only delays that specific file/stream, not the whole connection.",
        interviewContext: "Knowing that HTTP/3 is UDP-based is a massive flex in a networking interview."
      }
    },
    {
      id: "np-complete",
      topicId: "net-protocols",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Protocols (TCP vs UDP)",
        topicId: "net-protocols"
      }
    }
  ]
};
