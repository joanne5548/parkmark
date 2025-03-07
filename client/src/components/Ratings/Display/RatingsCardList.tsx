import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
    logInUserAtom,
    selectedParkAtom,
    selectedParkReviewListAtom,
} from "@lib/atoms/atoms";
import { fetchReviewsWithUserDataByParkId } from "@lib/APIs/reviewApi";
import RatingCard from "./RatingCard";

const RatingsCardList = () => {
    const selectedPark = useAtomValue(selectedParkAtom);
    const [selectedParkReviewList, setSelectedParkReviewList] = useAtom(
        selectedParkReviewListAtom
    );
    const logInUser = useAtomValue(logInUserAtom);

    const fetchReviews = async () => {
        const fetchedReviewList = await fetchReviewsWithUserDataByParkId(
            selectedPark?.id!,
            logInUser ? logInUser.sub_id : ""
        );

        setSelectedParkReviewList(fetchedReviewList);
    };

    useEffect(() => {
        if (!selectedPark) {
            return;
        }

        fetchReviews();
    }, [selectedPark, logInUser]);

    return (
        <div className="h-full">
            {selectedParkReviewList.length === 0 ? (
                <div className="flex justify-center items-center text-center text-slate-800 text-lg h-full">
                    No Reviews Yet! Want to be the first? :D
                </div>
            ) : (
                <div className="flex flex-col">
                    {selectedParkReviewList.map((review) => (
                        <RatingCard
                            key={`${review.review_id}`}
                            review={review}
                            fetchReviews={fetchReviews}
                            initialThumbsUpBool={review.thumbs_up_id ? true : false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RatingsCardList;
