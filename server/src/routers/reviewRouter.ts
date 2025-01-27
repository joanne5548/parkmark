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

        res.json(selectQueryResult.rows);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get("/reviewWithUserData/park_id/:park_id", async (req:Request, res:Response) => {
    try {
        const { park_id } = req.params;

        const columns = "Review.id AS review_id, Review.park_id, Review.rating, Review.content, Review.img_url_list, Review.created_at, Review.user_sub_id, UserData.name AS user_name, UserData.profile_picture_url AS user_profile_picture_url"
        const selectQueryResult = await pool.query(
            `SELECT ${columns} FROM Review JOIN UserData ON Review.user_sub_id=UserData.sub_id WHERE park_id=$1`,
            [park_id]
        );

        res.json(selectQueryResult.rows);
    }
    catch (error) {
        handleError(error, res);
    }
})

reviewRouter.get("/user_sub_id/:user_sub_id", async (req: Request, res: Response) => {
    try {
        const { user_sub_id } = req.params;
        
        const selectQueryResult = await pool.query(
            "SELECT * FROM Review WHERE user_sub_id=$1",
            [user_sub_id]
        );

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

// SELECT Review.id AS review_id, Review.park_id, Review.rating, Review.content, Review.img_url_list, Review.created_at, Review.user_sub_id, UserData.name AS user_name, UserData.profile_picture_url AS user_profile_picture_url FROM Review JOIN UserData ON Review.user_sub_id=UserData.sub_id WHERE park_id='6e723d86-06cf-44b3-a31d-420d57950554';v