require("dotenv").config();
const express = require("express");
const app = express();
//const path = require("path");
import { UserFacade } from "./facades/userFacade";
const debug = require("debug")("game-case")

app.use(express.json());

app.get("/api/dummy", (req: any, res: any) => {
  res.json({ msg: "Hello" });
});

app.get("/api/users", (req: any, res: any) => {
  res.status(200).json(UserFacade.getAllUsers());
});

app.get("/api/users/makeTestData", async (req: any, res: any) => {
  if (await UserFacade.generatorTestUsers()) res.send("Testdata was added");
  else res.send("Error in adding testdata");
});

app.get("/api/users/:id", (req: any, res: any) => {
  try {
    let userName = req.params.id;
    let user = UserFacade.getUser(userName);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send("User not found");
  }
});

app.post("/api/users", async (req: any, res: any) => {
  if (await UserFacade.addUser(req.body))
    res.status(200).send("User was added!");
  else res.status(400).send("Error in adding user");
});

app.delete("/api/users/:id", (req: any, res: any) => {
  if(UserFacade.deleteUser(req.params.id)) res.status(200).send(`User: ${req.params.id} has been removed`)
  else res.status(404).send(`User: ${req.params.id} not found`)
});

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);
console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;
