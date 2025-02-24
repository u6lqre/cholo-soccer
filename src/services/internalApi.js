import express from "express";
import cron from "node-cron";
import { getLaLigaMatches } from "./externalApi.js";

const app = express();
const port = 3000;

let matches;

cron.schedule("0 2 * * *", async () => {
  console.log("Fetching matches at 2:00...");
  matches = await getLaLigaMatches();
});

app.get("/laliga", async (req, res) => {
  res.json(matches);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
