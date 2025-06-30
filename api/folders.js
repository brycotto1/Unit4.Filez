import { addFile } from "#db/queries/files";
import { getAllFolders, getFolderById } from "#db/queries/folders";
import express from "express";
export const foldersRouter = express.Router();

//send array of all folders
foldersRouter.get("/", async (req, res) => {
  const folders = await getAllFolders();
  res.status(200).send(folders);
});

//sends the folder specified by ID and all files with status 200
//sends 404 if folder doesn't exist
foldersRouter.get("/:id", async (req, res) => {
  const {id} = req.params;

  const folder = await getFolderById(id);
  folder ?
    res.status(200).send(folder)
    :
    res.status(404).send("That folder does not exist.");
});

//posts a new file to the folder db with status 201
//returns 404 if folder doesn't exist
//returns 400 if there isn't enough information
foldersRouter.post("/:id/files", async (req, res) => {
  const {id} = req.params;
  const body = req.body;

  console.log(body);

  if(!body)
    return res.status(400).send("The body is missing");

  if(!body.name || !body.size)
    return res.status(400).send("A required field in the body is missing.");

  const newFile = await addFile(body.name, body.size, id);
  newFile ?
    res.status(201).send(newFile)
    :
    res.status(404).send("That folder does not exist");
});