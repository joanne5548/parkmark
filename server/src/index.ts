import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userDataRouter } from "./routers/userDataRouter";
import { nationalParkRouter } from "./routers/nationalParkRouter";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/api/userdata", userDataRouter);
app.use("/api/nationalpark", nationalParkRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
