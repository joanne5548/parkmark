import { Review, ReviewWithUserData } from "@lib/interfaces";
import { handleApiError } from "./userDataApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const postReview = async (review: Review) => {
    try {
        const response = await fetch(`${backendUrl}/api/review`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network Error: ${response.status}`);
        }
    } catch (error) {
        handleApiError(error);
    }
};

export const fetchReviewsWithUserDataByParkId = async (
    selectedParkId: string
) => {
    try {
        const response = await fetch(
            `${backendUrl}/api/review/reviewWithUserData/park_id/${selectedParkId}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return [];
            }
            throw new Error(`[Backend] Network Error: ${response.status}`);
        }

        const fetchedReviewList: ReviewWithUserData[] = await response.json();
        return fetchedReviewList;
    } catch (error) {
        handleApiError(error);
        return [];
    }
};
