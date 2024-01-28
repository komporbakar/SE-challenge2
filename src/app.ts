import cors from "cors";
import express, { Application, urlencoded } from "express";

require("dotenv").config();

const app: Application = express();
const port: Number = 4011;

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

const userRouter = require("./router/Users");
const postRouter = require("./router/Posts");

const version = "/api/v1";

// API Users
app.use(`${version}/users`, userRouter);
app.use(`${version}/posts`, postRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
