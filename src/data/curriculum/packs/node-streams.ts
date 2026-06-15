import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "node-streams")!;

export const nodeStreamsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "ns-intro",
      topicId: "node-streams",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Streams, Buffers & Backpressure",
        explanation: "Junior developers load entire files into memory using `fs.readFile` or `res.send(buffer)`. Senior developers stream data. Streams are the secret to Node's scalability—allowing a server with 512MB of RAM to comfortably serve a 10GB video file to thousands of users simultaneously by processing it in tiny chunks.",
        interviewContext: "Interviewers will ask you how to process a CSV file that is larger than your available RAM. If you don't instantly say 'Streams', the interview is over."
      }
    },
    {
      id: "ns-debug-oom",
      topicId: "node-streams",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "debug",
      difficulty: "intermediate",
      payload: {
        question: "A microservice handles user video uploads. It works perfectly in staging with 5MB test videos. In production, users upload 2GB 4K videos, and the service immediately crashes with 'FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed'.",
        code: [
          "app.post('/upload', async (req, res) => {",
          "  try {",
          "    // Read the entire file buffer from the request",
          "    const videoBuffer = await req.files.video.data;",
          "    ",
          "    // Write it to disk",
          "    fs.writeFileSync('/tmp/video.mp4', videoBuffer);",
          "    ",
          "    res.send('Uploaded');",
          "  } catch (e) {",
          "    res.status(500).send('Error');",
          "  }",
          "});"
        ],
        bugLineIndex: 3,
        explanation: "By reading the entire `videoBuffer` into memory at once, you easily exceed Node's default V8 heap limit (typically ~1.4GB on 64-bit systems). You must use `req.pipe(fs.createWriteStream('/tmp/video.mp4'))` to stream the file to disk in small chunks, never holding the whole file in memory at once."
      }
    },
    {
      id: "ns-timeline-backpressure",
      topicId: "node-streams",
      objectiveId: topicData.objectives[1],
      category: "learn",
      type: "timeline",
      difficulty: "advanced",
      payload: {
        mode: "explore",
        steps: [
          {
            title: "1. The Firehose (Readable)",
            description: "A Readable stream (like a fast SSD reading a file) pushes data chunks incredibly fast."
          },
          {
            title: "2. The Straw (Writable)",
            description: "A Writable stream (like a slow 3G network connection) cannot process the chunks as fast as they arrive. Its internal buffer begins to fill up."
          },
          {
            title: "3. Writable Full (highWaterMark)",
            description: "The Writable stream's buffer hits its limit (highWaterMark). It returns `false` when `write()` is called, signaling Backpressure."
          },
          {
            title: "4. Pause",
            description: "The Readable stream must respect this signal and `pause()` itself, stopping the flow of data so memory doesn't explode."
          },
          {
            title: "5. Drain & Resume",
            description: "Once the Writable stream finishes emptying its buffer over the slow network, it emits a 'drain' event. The Readable stream catches this and `resume()`s pumping data."
          }
        ]
      }
    },
    {
      id: "ns-implementation-pipe",
      topicId: "node-streams",
      objectiveId: topicData.objectives[2],
      category: "implementation",
      type: "code-completion",
      difficulty: "intermediate",
      payload: {
        prompt: "Complete the code to safely stream a file to the HTTP response, automatically handling backpressure.",
        template: `const fs = require('fs');

app.get('/video', (req, res) => {
  const readStream = fs.createReadStream('./movie.mp4');
  
  // Safely stream the data to the client
  readStream.{{blank1}}(res);
});`,
        answers: ["pipe"],
        explanation: "The `.pipe()` method connects a Readable stream to a Writable stream. It automatically listens for 'drain' events and manages backpressure for you under the hood."
      }
    },
    {
      id: "ns-explain-buffer",
      topicId: "node-streams",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "What exactly is a Buffer in Node.js, and how does it relate to the V8 memory heap?",
        modelAnswer: "A Buffer represents a fixed-length sequence of raw binary data. Unlike standard JavaScript objects or strings, Buffer memory is allocated OUTSIDE of the V8 JavaScript engine heap (it uses Node.js C++ layer memory). This allows Node to handle large amounts of binary data without placing immense garbage collection pressure on V8.",
        interviewContext: "This proves you understand the architecture of Node.js beyond just JS syntax."
      }
    },
    {
      id: "ns-scenario-transform",
      topicId: "node-streams",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "Streaming Transformations",
        scenario: "You need to read a 50GB log file, gzip compress it, and upload it to an S3 bucket. You cannot save the gzipped file to disk due to limited storage.",
        options: [
          {
            id: "opt1",
            text: "Read the file, gzip it in memory, then upload the buffer.",
            isCorrect: false,
            explanation: "A 50GB file will crash the process with an Out Of Memory (OOM) error."
          },
          {
            id: "opt2",
            text: "Use a Transform Stream: pipe the ReadStream into zlib.createGzip(), and pipe that into the S3 UploadStream.",
            isCorrect: true,
            explanation: "Correct! Transform streams (like Gzip) sit in the middle of a pipe chain. As chunks are read from the file, they are compressed on the fly and immediately uploaded to S3, keeping memory usage flat."
          },
          {
            id: "opt3",
            text: "Split the file into 1GB chunks on disk, then process them sequentially.",
            isCorrect: false,
            explanation: "The scenario specifically states you have limited storage and cannot save intermediate files to disk."
          }
        ]
      }
    },
    {
      id: "ns-complete",
      topicId: "node-streams",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Streams, Buffers & Backpressure",
        topicId: "node-streams"
      }
    }
  ]
};
