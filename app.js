import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import xss from "xss-clean";
import router from "./src/routes/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const URL = "mongodb://localhost:27017/ecom4";
const option = { user: "", pass: "", autoIndex: true };

mongoose
  .connect(URL, option)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error(err));

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

app.set("etag", false);
app.use("/api/v1", router);




export default app;
