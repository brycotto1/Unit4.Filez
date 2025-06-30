import express from "express";
const app = express();
export default app;
import { getFiles } from "#db/queries/files";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to your file manager");
});

app.get("/files", async (req, res) => {
  const files = await getFiles();
  res.status(200).send(files);
});

import { foldersRouter } from "#api/folders";
app.use("/folders", foldersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong :(");
});