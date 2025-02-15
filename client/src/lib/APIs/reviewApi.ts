import { Review, ReviewWithUserData } from "@lib/interfaces";
import { handleApiError } from "./userDataApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const postReview = async (reviewData: Review, imageFormData: FormData | null = null) => {
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

        if (imageFormData && createdReview.id) {
            imageFormData.append("review_id", createdReview.id);

            await postImages(imageFormData);
        }

        // return createdReview;
    }
    catch (error) {
        handleApiError(error);
    }
}

export const postImages = async (formData: FormData) => {
    try {
        const response = await fetch(`${backendUrl}/api/review/image`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }

        const imgUrlList: string[] = await response.json();
        return imgUrlList;
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

export const fetchReviewsCreatedByUser = async (userSubId: string, logInUserSubId: string = "") => {
    try {
        const response = await fetch(`${backendUrl}/api/review/createdBy?user_sub_id=${userSubId}&login_user_sub_id=${logInUserSubId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}]`);
        }

        const fetchedReviewsCreatedByUser: ReviewWithUserData[] = await response.json();
        return fetchedReviewsCreatedByUser;
    }
    catch (error) {
        handleApiError(error);
    }
}

export const fetchReviewsLikedByUser = async (userSubId: string, logInUserSubId: string = "") => {
    try {
        const response = await fetch(`${backendUrl}/api/review/likedBy?user_sub_id=${userSubId}&login_user_sub_id=${logInUserSubId}`);

        if (!response.ok) {
            throw new Error(`[Backend] Network error: ${response.status}`);
        }

        const fetchedReviewsLikedByUser: ReviewWithUserData[] = await response.json();
        return fetchedReviewsLikedByUser;
    }
    catch (error) {
        handleApiError(error);
    }
}

const deleteReviewImage = async (reviewId: string) => {
    try {
        const response = await fetch(`${backendUrl}/api/review/image/review_id/${reviewId}`, {
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