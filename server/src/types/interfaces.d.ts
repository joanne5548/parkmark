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

export interface ReviewImage {
    id: string;
    review_id: string;
    img_url: string;
}