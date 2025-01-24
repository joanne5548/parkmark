import { Review } from "../interfaces";

export const fetchReviewsByParkId = async (selectedParkId: string) => {
    const response = await fetch(
        `http://localhost:5000/api/review/park_id/${selectedParkId}`,
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

    const fetchedReviewList: Review[] = await response.json();
    return fetchedReviewList;
};
