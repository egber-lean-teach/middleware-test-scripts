import { config } from "dotenv";
config();
import express, { Express } from "express";
import cors from "cors";
import { router } from "./routes";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json()); // middleware to parse json data
app.use("/api/revenium", router);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

console.log("ok");
