import { useEffect, useState } from "react";
import DisplayReviewStars from "../../Ratings/Display/DisplayReviewStars";
import PercentageBarList from "./PercentageBarList";
import { StarRatingPercentageList } from "@lib/interfaces";
import { fetchReviewsWithUserDataByParkId } from "@lib/APIs/reviewApi";
import {
    calculateAverageRating,
    calculateStarsPercentage,
} from "@lib/calculateReviewStats";
import { useAtomValue } from "jotai";
import { selectedParkReviewListAtom } from "@lib/atoms/atoms";

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
    const selectedParkReviewList = useAtomValue(selectedParkReviewListAtom);

    useEffect(() => {
        const updateReviewStatistics = async () => {
            const fetchedReviewList = await fetchReviewsWithUserDataByParkId(
                parkId
            );

            if (fetchedReviewList.length === 0) {
                setStarRatingPercentageList({
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 0,
                });
                setAverageRating(0);
                setRatingsCount(0);
                return;
            }
            setStarRatingPercentageList(calculateStarsPercentage(fetchedReviewList));

            setAverageRating(calculateAverageRating(fetchedReviewList));

            setRatingsCount(fetchedReviewList.length);
        };

        updateReviewStatistics();
    }, [selectedParkReviewList]);

    return (
        <div className="flex flex-col gap-3 md:gap-4 items-center">
            <div className="flex flex-col gap-2 items-center">
                <div className="font-normal text-base md:text-lg">Average Rating</div>
                <div className="flex flex-row gap-3 w-fit p-3 rounded-full bg-slate-100">
                    <DisplayReviewStars rating={averageRating} size={6} />
                    <div className="text-sm md:text-base">
                        {Math.round(averageRating * 100) / 100} out of 5
                    </div>
                </div>
                <div className="text-sm nd:text-base text-slate-600">
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
