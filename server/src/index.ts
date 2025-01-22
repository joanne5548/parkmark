import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userDataRouter } from "./routers/userDataRouter";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

// Routes
// UserData
// app.delete("/userdata/:sub_id", async (req: Request, res: Response) => {
//     try {
//         const { sub_id } = req.params;

//         await pool.query(
//             "DELETE FROM UserData WHERE sub_id=$1",
//             [sub_id]
//         );

//         res.json("User is deleted :o");
//     }
//     catch (error) {
//         handleError(error, res);
//     }
// });

// Next Database!

app.use("/api/userdata", userDataRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
