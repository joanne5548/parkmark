import { ReviewWithUserData } from "@lib/interfaces";
import { handleApiError } from "./userDataApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const postReview = async (formData: FormData) => {
    try {
        const response = await fetch(`${backendUrl}/api/review`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }
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
};

export const deleteReview = async (reviewId: string) => {
    try {
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