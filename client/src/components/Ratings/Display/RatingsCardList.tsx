import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { Review } from "@lib/interfaces";
import { selectedParkAtom } from "@lib/atoms/atoms";
import { fetchReviewsByParkId } from "@lib/APIs/reviewApi";
import RatingCard from "./RatingCard";

const RatingsCardList = () => {
    const selectedPark = useAtomValue(selectedParkAtom);
    const [reviewList, setReviewList] = useState<Review[]>([]);

    const fetchReviews = async () => {
        const fetchedReviewList: Review[] = await fetchReviewsByParkId(
            selectedPark?.id!
        );
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
                        <RatingCard key={`${review.id}`} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RatingsCardList;
