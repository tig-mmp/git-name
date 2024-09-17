import express from "express";
import fs from "fs";
import { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

const corsOptions = {
  origin: allowedOrigin,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/api/write", (req: Request, res: Response) => {
  const { data } = req.body;
  console.log(data);
  fs.appendFile("data.txt", data + "\n", (err) => {
    if (err) {
      res.status(500).send("Error writing to file");
    } else {
      res.send("Content written to file successfully");
    }
  });
});

app.get("/api/read", (req: Request, res: Response) => {
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.send(data.replace(/\n/g, "<br>"));
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
