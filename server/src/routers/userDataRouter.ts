import { Request, Response, Router } from "express";
import pool from "../db";
import { handleError } from "../../middleware/errorHandler";

export const userDataRouter = Router();

userDataRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { sub_id, name, email, profile_picture_url } = req.body;

        const insertQueryResult = await pool.query(
            "INSERT INTO UserData(sub_id, name, email, profile_picture_url) VALUES($1, $2, $3, $4) RETURNING *",
            [sub_id, name, email, profile_picture_url]
        );

        res.json(insertQueryResult.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
});

userDataRouter.get("/", async (req: Request, res: Response) => {
    try {
        const selectQueryResult = await pool.query(
            "SELECT * FROM UserData"
        );

        res.json(selectQueryResult.rows);
    }
    catch (error) {
        handleError(error, res);
    }
});

userDataRouter.get("/:sub_id", async (req: Request, res: Response) => {
    try {
        const { sub_id } = req.params;
        const selectQueryResult = await pool.query(
            "SELECT * FROM UserData WHERE sub_id=$1",
            [sub_id]
        );

        if (selectQueryResult.rowCount === 0) {
            res.json(null);
            return;
        }

        res.json(selectQueryResult.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

userDataRouter.put("/:sub_id", async (req: Request, res: Response) => {
    try {
        const { sub_id } = req.params;
        const { name, email, profile_picture_url } = req.body;

        const updateQueryResult = await pool.query(
            "UPDATE UserData SET name=$1, email=$2, profile_picture_url=$3 WHERE sub_id=$4 RETURNING *",
            [ name, email, profile_picture_url, sub_id ]
        );

        res.json(updateQueryResult.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

userDataRouter.delete("/:sub_id", async (req: Request, res: Response) => {
    try {
        const { sub_id } = req.params;

        const deleteQueryResult = await pool.query(
            "DELETE FROM UserData WHERE sub_id=$1",
            [sub_id]
        );

        res.json(deleteQueryResult);
    }
    catch (error) {
        handleError(error, res);
    }
});