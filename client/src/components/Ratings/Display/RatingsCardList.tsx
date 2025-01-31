import { useEffect, useMemo, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { logInUserAtom, selectedParkAtom, selectedParkReviewListAtom } from "@lib/atoms/atoms";
import { fetchReviewsWithUserDataByParkId } from "@lib/APIs/reviewApi";
import RatingCard from "./RatingCard";
import { fetchListOfThumbsUpReviewByUserAndPark } from "@lib/APIs/thumbsUpListApi";

const RatingsCardList = () => {
    const selectedPark = useAtomValue(selectedParkAtom);
    const [selectedParkReviewList, setSelectedParkReviewList] = useAtom(
        selectedParkReviewListAtom
    );
    const logInUser = useAtomValue(logInUserAtom);
    const [listOfThumbsUpReviewByCurrentUser, setListOfThumbsUpReviewByCurrentUser] = useState<string[]>([]);

    const fetchReviews = async () => {
        const fetchedReviewList = await fetchReviewsWithUserDataByParkId(
            selectedPark?.id!
        );
        setSelectedParkReviewList(fetchedReviewList);
    };

    const fetchListOfThumbsUpReviewByCurrentUser = async (userSubId: string, parkId: string) => {
        const reviewList = await fetchListOfThumbsUpReviewByUserAndPark(userSubId, parkId);
        setListOfThumbsUpReviewByCurrentUser(reviewList);
        // selectedParkReviewList.forEach((review) => console.log(reviewList.includes(review.review_id)))
        // console.log(reviewList);
    }

    const isReviewThumbedUp = useMemo(() => {
        return (reviewId: string) => listOfThumbsUpReviewByCurrentUser.includes(reviewId);
    }, [listOfThumbsUpReviewByCurrentUser]);
    
    useEffect(() => {        
        
        if (!selectedPark) {
            return;
        }

        fetchReviews();

        if (logInUser) {
            fetchListOfThumbsUpReviewByCurrentUser(logInUser.sub_id, selectedPark.id);
        }
    }, [selectedPark]);

    return (
        <div className="h-full">
            {selectedParkReviewList.length === 0 ? (
                <div className="flex justify-center items-center text-center text-slate-800 text-lg h-full">
                    No Reviews Yet! Wanna be the first? :D
                </div>
            ) : (
                <div className="flex flex-col">
                    {selectedParkReviewList.map((review) => {
                        // console.log(isReviewThumbedUp(review.review_id))
                        return (
                        <RatingCard
                            key={`${review.review_id}`}
                            review={review}
                            fetchReviews={fetchReviews}
                            initialThumbsUpBool={isReviewThumbedUp(review.review_id)}
                        />
                    )})}
                </div>
            )}
        </div>
    );
};

export default RatingsCardList;
