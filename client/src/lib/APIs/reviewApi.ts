import { Review, ReviewWithUserData } from "@lib/interfaces";
import { handleApiError } from "./userDataApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const postReview = async (reviewData: Review) => {
    try {
        const response = await fetch(`${backendUrl}/api/review`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }

        const createdReview: Review = await response.json();
        return createdReview;
    }
    catch (error) {
        handleApiError(error);
    }
}

export const fetchReviewsWithUserDataByParkId = async (
    selectedParkId: string,
    logInUserId: string = ""
) => {
    try {
        const response = await fetch(
            `${backendUrl}/api/review/reviewWithUserData?park_id=${selectedParkId}&user_sub_id=${logInUserId}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        
        if (!response.ok) {
            throw new Error(`[Backend] Network Error: ${response.status}`);
        }

        const fetchedReviewList: ReviewWithUserData[] = await response.json();
        return fetchedReviewList;
    } catch (error) {
        handleApiError(error);
        return [];
    }
}

const deleteReviewImage = async (reviewId: string) => {
    try {
        const response = await fetch(`${backendUrl}/api/reviewimage/reviewid/${reviewId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }
    }
    catch (error) {
        handleApiError(error);
    }
}

export const deleteReview = async (reviewId: string) => {
    try {
        await deleteReviewImage(reviewId);

        const response = await fetch(`${backendUrl}/api/review/review_id/${reviewId}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }
    }
    catch (error) {
        handleApiError(error);
    }
}