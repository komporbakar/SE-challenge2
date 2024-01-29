import cors from "cors";
import express, { Application, urlencoded } from "express";

require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const app: Application = express();
const port: Number = 4011;

const openApiSpec = require(path.resolve(
  __dirname,
  "documentation/specapi-microblog.json"
));

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

const userRouter = require("./router/Users");
const postRouter = require("./router/Posts");
const commentRouter = require("./router/Comments");
const followRouter = require("./router/Follows");

const version = "/api/v1";

// API Users
app.use(`${version}/users`, userRouter);
app.use(`${version}/posts`, postRouter);
app.use(`${version}/comment`, commentRouter);
app.use(`${version}/users`, followRouter);

// Documentation
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
