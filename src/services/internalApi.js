import express from "express";
import { getLaLigaMatches } from "./externalApi.js";

const app = express();
const port = 3000;

const matches = await getLaLigaMatches();

app.get("/laliga", async (req, res) => {
  res.json(matches);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
