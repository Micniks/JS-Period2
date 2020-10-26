require("dotenv").config();
import express from "express";
import path from "path";
import { myLogger } from "./middlewares/simpleLogger";
import { myCors } from "./middlewares/my-cors";
import { winstonLogger, winstonErrorLogger } from "./middlewares/logger";
import { endpointNotFound, errorFormatter } from "./middlewares/errorHandler";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());

let userAPIRouter = require("./routes/userApi");

var cors = require("cors");
app.use(cors());

app.use(winstonLogger);
app.use(winstonErrorLogger);

app.use("/api/users", userAPIRouter);

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" });
});

app.use(endpointNotFound);
app.use(errorFormatter);

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);
console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;
