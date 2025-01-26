import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userDataRouter } from "./routers/userDataRouter";
import { nationalParkRouter } from "./routers/nationalParkRouter";
import { reviewRouter } from "./routers/reviewRouter";
import { thumbsUpListRouter } from "./routers/thumbsUpListRouter";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/api/userdata", userDataRouter);
app.use("/api/nationalpark", nationalParkRouter);
app.use("/api/review", reviewRouter);
app.use("/api/thumbsuplist", thumbsUpListRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
