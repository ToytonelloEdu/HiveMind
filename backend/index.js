import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ideaRouter } from "./routes/ideaRouter.js";

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(ideaRouter);

app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred"
  });
});

app.listen(PORT);