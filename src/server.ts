import express, { Request, Response, Express, NextFunction } from "express";
import router from "./router";
const morgan = require("morgan");

const app: Express = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.body.name = "hello";
  res.status(401);
  res.send("Nope");
  next();
});

app.get("/", (req: Request, res: Response) => {
  console.log("hello");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", router);

export default app;
