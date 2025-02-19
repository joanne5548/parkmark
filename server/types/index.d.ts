import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            decoded_user?: {
                sub_id: string;
            }
        }
    }
}