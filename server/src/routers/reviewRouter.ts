import { Request, Response, Router } from "express";
import pool from "../db";
import { handleError } from "../../middleware/errorHandler";

export const reviewRouter = Router();

reviewRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { user_sub_id, park_id, rating, content, img_url_list } =
            req.body;

        const insertQueryResult = await pool.query(
            "INSERT INTO Review(user_sub_id, park_id, rating, content, img_url_list) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [user_sub_id, park_id, rating, content, img_url_list]
        );

        res.json(insertQueryResult.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get("/", async (req: Request, res: Response) => {
    try {
        const selectQueryResult = await pool.query("SELECT * FROM Review");

        res.json(selectQueryResult.rows);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get("/park_id/:park_id", async (req: Request, res: Response) => {
    try {
        const { park_id } = req.params;

        const selectQueryResult = await pool.query(
            "SELECT * FROM Review WHERE park_id=$1",
            [park_id]
        );

        if (selectQueryResult.rowCount === 0) {
            res.status(404).json({ error: "There are no reviews for requested park id." });
            return;
        }

        res.json(selectQueryResult.rows);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get("/user_sub_id/:user_sub_id", async (req: Request, res: Response) => {
    try {
        const { user_sub_id } = req.params;
        
        const selectQueryResult = await pool.query(
            "SELECT * FROM Review WHERE user_sub_id=$1",
            [user_sub_id]
        );

        if (selectQueryResult.rowCount === 0) {
            res.status(404).json({ error: "There is no review found from the requested user sub id." });
            return;
        }

        res.json(selectQueryResult.rows);
    }
    catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get("/review_id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const selectQueryResult = await pool.query(
            "SELECT * FROM Review WHERE id=$1",
            [id]
        );

        res.json(selectQueryResult.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

reviewRouter.put("/review_id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rating, content, img_url_list } = req.body;

        const updateQueryResult = await pool.query(
            "UPDATE Review SET rating=$1, content=$2, img_url_list=$3 WHERE id=$4 RETURNING *",
            [rating, content, img_url_list, id]
        );

        res.json(updateQueryResult.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

reviewRouter.delete("/review_id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleteQueryResult = await pool.query(
            "DELETE FROM Review WHERE id=$1",
            [id]
        );

        res.json(deleteQueryResult);
    }
    catch (error) {
        handleError(error, res);
    }
});