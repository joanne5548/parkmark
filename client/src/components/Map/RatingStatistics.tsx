import { useEffect, useState } from "react";
import DisplayReviewStars from "../Ratings/Display/DisplayReviewStars";
import PercentageBarList from "./PercentageBarList";
import { StarRatingPercentageList } from "@lib/interfaces";
import { fetchReviewsWithUserDataByParkId } from "@lib/APIs/reviewApi";
import {
    calculateAverageRating,
    calculateStarsPercentage,
} from "@lib/calculateReviewStats";

interface RatingStatisticsProps {
    parkId: string;
}

const RatingStatistics = ({ parkId }: RatingStatisticsProps) => {
    const [starRatingPercentageList, setStarRatingPercentageList] =
        useState<StarRatingPercentageList>({
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
        });
    const [averageRating, setAverageRating] = useState<number>(0);
    const [ratingsCount, setRatingsCount] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const fetchedReviewList = await fetchReviewsWithUserDataByParkId(
                parkId
            );

            if (fetchedReviewList.length === 0) {
                return;
            }
            const starRatingPercentageList =
                calculateStarsPercentage(fetchedReviewList);
            setStarRatingPercentageList(starRatingPercentageList);

            setAverageRating(calculateAverageRating(fetchedReviewList));

            setRatingsCount(fetchedReviewList.length);
        })();
    }, []);

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-2 items-center">
                <div className="font-normal text-lg">Average Rating</div>
                <div className="flex flex-row gap-3 w-fit p-3 rounded-full bg-slate-100">
                    <DisplayReviewStars rating={averageRating} />
                    <div className="text-base">{averageRating} out of 5</div>
                </div>
                <div className="text-base text-slate-600">
                    {ratingsCount} ratings
                </div>
            </div>
            <PercentageBarList
                starRatingPercentageList={starRatingPercentageList}
            />
        </div>
    );
};

export default RatingStatistics;
