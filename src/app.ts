import express from "express";
import env from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import allroutes from "./routes/index";
import swagger from "./docConfig/swagger";

env.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/", allroutes);

app.get("", (req, res) => {
  res.status(200).json({
    message: "Welcome to URL Shortener Service API",
  });
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

export default app;
