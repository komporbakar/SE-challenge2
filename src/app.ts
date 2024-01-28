import express, { Application, urlencoded } from "express";

const app: Application = express();
const port: Number = 4011;

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
