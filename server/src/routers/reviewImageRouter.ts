import { Request, Response, Router } from "express";
import { handleError } from "../../middleware/errorHandler";
import { upload } from "../multer/multer";
import {
    deleteImage,
    uploadImage,
    uploadImageList,
} from "../cloud/bucketFileManager";
import pool from "../db";

export const reviewImageRouter = Router();

reviewImageRouter.post(
    "/",
    upload.array("img_file"),
    async (req: Request, res: Response) => {
        try {
            if (!req.files) {
                throw new Error(
                    "[Backend] Invalid Data: the image list is empty!"
                );
            }

            const { review_id } = req.body;
            const fileList = req.files as Express.Multer.File[];

            // Apparently foreach or map functions don't wait for async functions
            // You can either use Promise.all or for loop (for more control within the loop).
            // explicit return statement in .map() is omitted since async functions implicitly returns promises
            await Promise.all(
                fileList.map(async (file) => {
                    const img_url = await uploadImage(file);
                    console.log(img_url);

                    await pool.query(
                        "INSERT INTO ReviewImage(review_id, img_url) VALUES ($1, $2)",
                        [review_id, img_url]
                    );
                })
            );

            const selectQueryResult = await pool.query(
                "SELECT img_url FROM ReviewImage WHERE review_id=$1",
                [review_id]
            );
            const imgUrlList = selectQueryResult.rows.map((reviewImage) => {
                return reviewImage["img_url"];
            });

            res.json(imgUrlList);
        } catch (error) {
            handleError(error, res);
        }
    }
);

reviewImageRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const selectQueryResult = await pool.query(
            "SELECT * FROM ReviewImage WHERE id=$1",
            [id]
        );

        res.json(selectQueryResult.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
});

reviewImageRouter.get(
    "/reviewid/:review_id",
    async (req: Request, res: Response) => {
        try {
            const { review_id } = req.params;

            const selectQueryResult = await pool.query(
                "SELECT * FROM ReviewImage WHERE review_id=$1",
                [review_id]
            );

            res.json(selectQueryResult.rows);
        } catch (error) {
            handleError(error, res);
        }
    }
);

reviewImageRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const selectImgUrlQueryResult = await pool.query(
            "SELECT * FROM ReviewImage WHERE id=$1",
            [id]
        );
        const img_url = selectImgUrlQueryResult.rows[0]["img_url"];
        await deleteImage(img_url);

        const deleteQueryResult = await pool.query(
            "DELETE FROM ReviewImage WHERE id=$1",
            [id]
        );

        res.json(deleteQueryResult);
    } catch (error) {
        handleError(error, res);
    }
});

reviewImageRouter.delete(
    "/reviewid/:review_id",
    async (req: Request, res: Response) => {
        try {
            const { review_id } = req.params;

            const selectQueryResult = await pool.query(
                "SELECT * FROM ReviewImage WHERE review_id=$1",
                [review_id]
            );

            await Promise.all(
                selectQueryResult.rows.map(async (reviewImage) => {
                    const img_url = reviewImage["img_url"];

                    await deleteImage(img_url);
                })
            );

            const deleteQueryResult = await pool.query(
                "DELETE FROM ReviewImage WHERE review_id=$1",
                [review_id]
            );

            res.json(deleteQueryResult);
        } catch (error) {
            handleError(error, res);
        }
    }
);
