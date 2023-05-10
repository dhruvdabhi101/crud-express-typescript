import express, { Request, Response, Express, NextFunction } from "express";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handler/user";
const morgan = require("morgan");
const cors = require("cors");

const app: Express = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  console.log("hello");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

export default app;
