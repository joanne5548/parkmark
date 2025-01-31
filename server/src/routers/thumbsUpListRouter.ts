import { Request, Response, Router } from "express";
import pool from "../db";
import { handleError } from "../../middleware/errorHandler";
import { RequestError } from "@google-cloud/storage/build/cjs/src/file";

export const thumbsUpListRouter = Router();

thumbsUpListRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { user_sub_id, review_id } = req.body;

        const insertQueryResult = await pool.query(
            "INSERT INTO ThumbsUpList(user_sub_id, review_id) VALUES($1, $2) RETURNING *",
            [user_sub_id, review_id]
        );

        res.json(insertQueryResult.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
});

thumbsUpListRouter.get("/", async (req: Request, res: Response) => {
    try {
        const selectQueryResult = await pool.query(
            "SELECT * FROM ThumbsUpList"
        );

        res.json(selectQueryResult.rows);
    } catch (error) {
        handleError(error, res);
    }
});

thumbsUpListRouter.get(
    "/user_sub_id/:user_sub_id",
    async (req: Request, res: Response) => {
        try {
            const { user_sub_id } = req.params;

            const selectQueryResult = await pool.query(
                "SELECT * FROM ThumbsUpList WHERE user_sub_id=$1",
                [user_sub_id]
            );

            res.json(selectQueryResult.rows);
        } catch (error) {
            handleError(error, res);
        }
    }
);

thumbsUpListRouter.get(
    "/review_id/:review_id",
    async (req: Request, res: Response) => {
        try {
            const { review_id } = req.params;

            const selectQueryResult = await pool.query(
                "SELECT * FROM ThumbsUpList WHERE review_id=$1",
                [review_id]
            );

            res.json(selectQueryResult.rows);
        } catch (error) {
            handleError(error, res);
        }
    }
);

thumbsUpListRouter.get("/review_id_by_user_and_park", async (req: Request, res: Response) => {
    try {
        const { user_sub_id, park_id } = req.query;

        const selectQueryResult = await pool.query(
            "SELECT review_id FROM ThumbsUpList JOIN Review ON Review.id=ThumbsUpList.review_id WHERE ThumbsUpList.user_sub_id=$1 AND park_id=$2",
            [user_sub_id, park_id]
        );

        const reviewIdList = selectQueryResult.rows.map((row) => row['review_id']);
        
        res.json(reviewIdList);
    }
    catch (error) {
        handleError(error, res);
    }
});

thumbsUpListRouter.delete("/", async (req: Request, res: Response) => {
    try {
        const { user_sub_id, review_id } = req.query;

        const deleteQueryResult = await pool.query(
            "DELETE FROM ThumbsUpList WHERE user_sub_id=$1 AND review_id=$2",
            [user_sub_id, review_id]
        );

        res.json(deleteQueryResult);
    } catch (error) {
        handleError(error, res);
    }
});

thumbsUpListRouter.delete("/id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleteQueryResult = await pool.query(
            "DELETE FROM ThumbsUpList WHERE id=$1",
            [id]
        );

        res.json(deleteQueryResult);
    } catch (error) {
        handleError(error, res);
    }
});
