import express from "express";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";

import { createServer } from "node:http";
import getReposRoutes from "./routes/get-repos";
import cors from "cors";
import { startDeployment } from "../lib/start-deployment";
const app = express();
dotenv.config();
const server = createServer(app);
const wss = new WebSocketServer({ server });
const PORT = process.env.PORT;
console.log("hloo");
dotenv.config();
wss.on("connection", (ws) => {
  let clone_url = null;
  let token = null;

  console.log("ws connection established by a client");
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === "start") {
        const { clone_url, token } = data;

        if (!clone_url) {
          console.log("clone url is null");
          return;
        }

        if (token) {
          startDeployment({ ws, clone_url, token });
        } else {
          startDeployment({ ws, clone_url });
        }
      }
    } catch (err) {
      console.error("Invalid WS message:", err);
    }
  });
});
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  }),
);
app.use("/api", getReposRoutes);
server.listen(PORT, () => {
  console.log(`🚀Vercel-Clone server running at http://localhost:${PORT}`);
});
