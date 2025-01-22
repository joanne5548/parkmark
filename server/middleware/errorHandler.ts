import { Response } from "express";


export const handleError = (error: any, res: Response) => {
    if (error instanceof Error) {
        console.error("Database error:", error.message);
        res.status(500).json({ error: "Database error: " + error.message });
    }
    else {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Unexpected error occured" });
    }
}