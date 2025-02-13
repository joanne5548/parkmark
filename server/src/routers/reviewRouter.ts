import { Request, Response, Router } from "express";
import pool from "../db";
import { handleError } from "../../middleware/errorHandler";
import { deleteImage, uploadImage } from "../cloud/bucketFileManager";
import { upload } from "../multer/multer";

export const reviewRouter = Router();

reviewRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { user_sub_id, park_id, rating, content } = req.body;

        const insertQueryResult = await pool.query(
            "INSERT INTO Review(user_sub_id, park_id, rating, content) VALUES($1, $2, $3, $4) RETURNING *",
            [user_sub_id, park_id, rating, content]
        );

        res.json(insertQueryResult.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.post("/image", upload.array("img_file"), async (req: Request, res: Response) => {
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
});

reviewRouter.get("/", async (req: Request, res: Response) => {
    try {
        const selectQueryResult = await pool.query("SELECT * FROM Review");

        res.json(selectQueryResult.rows);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get("/createdBy", async (req: Request, res: Response) => {
    try {
        const { user_sub_id, login_user_sub_id="" } = req.query;

        const columns =
            "Review.id AS review_id, Review.park_id, Review.rating, Review.content, Review.created_at, Review.user_sub_id, UserData.name AS user_name, UserData.profile_picture_url AS user_profile_picture_url, ThumbsUpList.id AS thumbs_up_id, (SELECT ARRAY_AGG(img_url) AS img_url_list FROM ReviewImage WHERE ReviewImage.review_id=Review.id)";

        const selectQueryResult = await pool.query(
            `SELECT ${columns} FROM REVIEW LEFT JOIN ThumbsUpList ON Review.id=ThumbsUpList.review_id AND ThumbsUpList.user_sub_id=$1 JOIN UserData ON Review.user_sub_id=UserData.sub_id WHERE Review.user_sub_id=$2 ORDER BY Review.created_at DESC`,
            [login_user_sub_id, user_sub_id]
        );

        res.json(selectQueryResult.rows);
    }
    catch (error) {
        handleError(error, res);
    }
})

reviewRouter.get("/park_id/:park_id", async (req: Request, res: Response) => {
    try {
        const { park_id } = req.params;

        const selectQueryResult = await pool.query(
            "SELECT * FROM Review WHERE park_id=$1 ORDER BY created_at DESC",
            [park_id]
        );

        res.json(selectQueryResult.rows);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get("/reviewWithUserData", async (req: Request, res: Response) => {
    try {
        const columns =
            "Review.id AS review_id, Review.park_id, Review.rating, Review.content, Review.created_at, Review.user_sub_id, UserData.name AS user_name, UserData.profile_picture_url AS user_profile_picture_url, ThumbsUpList.id AS thumbs_up_id, (SELECT ARRAY_AGG(img_url) AS img_url_list FROM ReviewImage WHERE ReviewImage.review_id=Review.id)";

        const { park_id, user_sub_id = "" } = req.query;

        const selectQueryResult = await pool.query(
            `SELECT ${columns} FROM REVIEW LEFT JOIN ThumbsUpList ON Review.id=ThumbsUpList.review_id AND ThumbsUpList.user_sub_id=$1 JOIN UserData ON Review.user_sub_id=UserData.sub_id WHERE park_id=$2 ORDER BY Review.created_at DESC`,
            [user_sub_id, park_id]
        );

        // now it returns urls as list

        res.json(selectQueryResult.rows);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get(
    "/user_sub_id/:user_sub_id",
    async (req: Request, res: Response) => {
        try {
            const { user_sub_id } = req.params;

            const selectQueryResult = await pool.query(
                "SELECT * FROM Review WHERE user_sub_id=$1",
                [user_sub_id]
            );

            res.json(selectQueryResult.rows);
        } catch (error) {
            handleError(error, res);
        }
    }
);

reviewRouter.get("/review_id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const selectQueryResult = await pool.query(
            "SELECT * FROM Review WHERE id=$1",
            [id]
        );

        res.json(selectQueryResult.rows[0]);
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.get("/image/:id", async (req: Request, res: Response) => {
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

reviewRouter.get("/image/review_id/:review_id",
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

reviewRouter.put("/review_id/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rating, content, img_url } = req.body;

        const updateQueryResult = await pool.query(
            "UPDATE Review SET rating=$1, content=$2, img_url=$3 WHERE id=$4 RETURNING *",
            [rating, content, img_url, id]
        );

        res.json(updateQueryResult.rows[0]);
    } catch (error) {
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
    } catch (error) {
        handleError(error, res);
    }
});

reviewRouter.delete("/image/:id", async (req: Request, res: Response) => {
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

reviewRouter.delete("/image/review_id/:review_id",
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