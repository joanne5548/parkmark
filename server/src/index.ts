import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from './db'
import { profile } from "console";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Helper Functions
const handleError = (error: any, res: Response) => {
    if (error instanceof Error) {
        console.error("Database error:", error.message);
        res.status(500).json({ error: "Database error: " + error.message });
    }
    else {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Unexpected error occured" });
    }
}

// Routes
// UserData
app.post("/userdata", async (req: Request, res: Response) => {
    try {
        const { sub_id, name, email, profile_picture_url, created_at } = req.body;
        const newUserData = await pool.query(
            "INSERT INTO UserData(sub_id, name, email, profile_picture_url, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [sub_id, name, email, profile_picture_url, created_at]
        );
        
        res.json(newUserData.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

app.get("/userdata", async (req: Request, res: Response) => {
    try {
        const allUserData = await pool.query("SELECT * FROM UserData");

        res.json(allUserData.rows);
    }
    catch (error) {
        handleError(error, res);
    }
});

app.get("/userdata/:sub_id", async (req: Request, res: Response) => {
    try {
        const { sub_id } = req.params;
        const userData = await pool.query(
            "SELECT * FROM UserData WHERE sub_id=$1",
            [sub_id]
        );

        res.json(userData.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

app.put("/userdata/:sub_id", async (req: Request, res: Response) => {
    try {
        const { sub_id } = req.params;
        const { name, email, profile_picture_url } = req.body;

        await pool.query(
            "UPDATE UserData SET name=$1, email=$2, profile_picture_url=$3 WHERE sub_id=$4",
            [name, email, profile_picture_url, sub_id]
        );

        res.json("User is updated!");
    }
    catch (error) {
        handleError(error, res);
    }
});

app.delete("/userdata/:sub_id", async (req: Request, res: Response) => {
    try {
        const { sub_id } = req.params;

        await pool.query(
            "DELETE FROM UserData WHERE sub_id=$1",
            [sub_id]
        );

        res.json("User is deleted :o");
    }
    catch (error) {
        handleError(error, res);
    }
});

// Next Database!

app.get("/", (req: Request, res: Response) => {
    res.send("yo");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
