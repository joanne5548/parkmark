import { ThumbsUpData } from "@lib/interfaces";
import { handleApiError } from "./userDataApi";

export const postThumbsUpData = async (thumbsUpData: ThumbsUpData) => {
    try {
        const response = await fetch("http://localhost:5000/api/thumbsuplist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(thumbsUpData)
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }
    }
    catch (error) {
        handleApiError(error);
    }
}

// export const deleteThumbsUpData = async (thumbsUpDataId)

export const fetchThumbsUpListByReviewId = async (reviewId: string) => {
    try {
        const response = await fetch(`http://localhost:5000/api/thumbsuplist/review_id/${reviewId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }

        const thumbsUpList: ThumbsUpData[] = await response.json();

        return thumbsUpList;
    }
    catch (error) {
        handleApiError(error);
    }
}