import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { ReviewWithUserData } from "@lib/interfaces";
import { selectedParkAtom } from "@lib/atoms/atoms";
import { fetchReviewsWithUserDataByParkId } from "@lib/APIs/reviewApi";
import RatingCard from "./RatingCard";

const RatingsCardList = () => {
    const selectedPark = useAtomValue(selectedParkAtom);
    const [reviewList, setReviewList] = useState<ReviewWithUserData[]>([]);

    const fetchReviews = async () => {
        const fetchedReviewList =
            await fetchReviewsWithUserDataByParkId(selectedPark?.id!);
        setReviewList(fetchedReviewList);
    };

    useEffect(() => {
        if (!selectedPark) {
            return;
        }

        fetchReviews();
    }, [selectedPark]);

    return (
        <div className="h-full">
            {reviewList.length === 0 ? (
                <div className="flex justify-center items-center text-slate-800 text-lg h-full">
                    No Reviews Yet! Wanna be the first? :D
                </div>
            ) : (
                <div className="flex flex-col">
                    {reviewList.map((review) => (
                        <RatingCard key={`${review.review_id}`} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RatingsCardList;
