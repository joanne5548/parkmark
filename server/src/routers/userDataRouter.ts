import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../db";
import { handleError } from "../lib/errorHandler";
import { authenticateUser } from "../middleware/userAuth";
import { deleteImages } from "../lib/handleImages";

export const userDataRouter = Router();

userDataRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { sub_id, name, email, profile_picture_url } = req.body;

        const insertQueryResult = await pool.query(
            "INSERT INTO UserData(sub_id, name, email, profile_picture_url) VALUES($1, $2, $3, $4) RETURNING *",
            [sub_id, name, email, profile_picture_url]
        );

        const userData = insertQueryResult.rows[0];

        const token = jwt.sign(
            { sub_id: userData.sub_id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        res.json({ token, userData });
    } catch (error) {
        handleError(error, res);
    }
});

userDataRouter.get("/", async (req: Request, res: Response) => {
    try {
        const selectQueryResult = await pool.query("SELECT * FROM UserData");

        res.json(selectQueryResult.rows);
    } catch (error) {
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

        const userData = selectQueryResult.rows[0];

        const token = jwt.sign(
            { sub_id: userData.sub_id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        res.json({ token, userData });
    } catch (error) {
        handleError(error, res);
    }
});

userDataRouter.put("/:sub_id", async (req: Request, res: Response) => {
    try {
        const { sub_id } = req.params;
        const { name, email, profile_picture_url } = req.body;

        const updateQueryResult = await pool.query(
            "UPDATE UserData SET name=$1, email=$2, profile_picture_url=$3 WHERE sub_id=$4 RETURNING *",
            [name, email, profile_picture_url, sub_id]
        );

        res.json(updateQueryResult.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
});

const handleReviewImageDeletion = async (user_sub_id: string) => {
    // ReviewImages deletion on cloud should be handled separately
    const selectQueryResult = await pool.query(
        "SELECT ReviewImage.* FROM ReviewImage JOIN Review ON ReviewImage.review_id=Review.id WHERE Review.user_sub_id=$1",
        [user_sub_id]
    );
    
    await deleteImages(selectQueryResult.rows);

    const deleteQueryResult = await pool.query(
        "DELETE FROM ReviewImage USING Review WHERE ReviewImage.review_id=Review.id AND Review.user_sub_id=$1",
        [user_sub_id]
    );
}

userDataRouter.delete(
    "/:sub_id",
    authenticateUser,
    async (req: Request, res: Response) => {
        try {
            const { sub_id } = req.params;
            const decoded_sub_id = req.decoded_user?.sub_id;

            if (!decoded_sub_id || decoded_sub_id !== sub_id) {
                res.status(401).json({ message: "Unauthenticated Request" });
                return;
            }

            await handleReviewImageDeletion(sub_id);

            // All other information - Reviews, thumbs up data - cascades on delete.
            const deleteQueryResult = await pool.query(
                "DELETE FROM UserData WHERE sub_id=$1",
                [sub_id]
            );

            res.json(deleteQueryResult);
        } catch (error) {
            handleError(error, res);
        }
    }
);
