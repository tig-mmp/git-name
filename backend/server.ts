import express from "express";
import fs from "fs";
import { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
