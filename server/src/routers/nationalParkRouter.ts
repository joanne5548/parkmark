import { Request, Response, Router } from "express";
import pool from "../db";
import { handleError } from "../../middleware/errorHandler";

export const nationalParkRouter = Router();

nationalParkRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { id, name, park_info } = req.body;

        let insertQueryResult;
        if (id) {
            insertQueryResult = await pool.query(
                "INSERT INTO NationalPark(id, name, park_info) VALUES($1, $2, $3) RETURNING *",
                [id, name, park_info]
            );
        }
        else {
            insertQueryResult = await pool.query(
                "INSERT INTO NationalPark(name, park_info) VALUES($1, $2) RETURNING *",
                [name, park_info]
            );
        }

        res.json(insertQueryResult.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

nationalParkRouter.get("/", async (req: Request, res: Response) => {
    try {
        const selectQueryResult = await pool.query(
            "SELECT * FROM NationalPark",
        );

        res.json(selectQueryResult.rows);
    }
    catch (error) {
        handleError(error, res);
    }
});

nationalParkRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const selectQueryResult = await pool.query(
            "SELECT * FROM NationalPark WHERE id=$1",
            [id]
        );

        if (selectQueryResult.rowCount === 0 ) {
            res.status(404);
            res.json({error: "The requested national park does not exist."});
        }

        res.json(selectQueryResult.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

nationalParkRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, park_info } = req.body;

        const updateQueryResult = await pool.query(
            "UPDATE NationalPark SET name=$1, park_info=$2 WHERE id=$3 RETURNING *",
            [name, park_info, id]
        );

        res.json(updateQueryResult.rows[0]);
    }
    catch (error) {
        handleError(error, res);
    }
});

nationalParkRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deleteQueryResult = await pool.query(
            "DELETE FROM NationalPark WHERE id=$1",
            [id]
        );

        res.json(deleteQueryResult);
    }
    catch (error) {
        handleError(error, res);
    }
});