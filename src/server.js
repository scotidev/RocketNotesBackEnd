import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { AppError } from "./utils/AppError.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.log(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
