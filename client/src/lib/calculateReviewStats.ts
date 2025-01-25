import { fetchReviewsByParkId } from "./APIs/reviewApi";
import { Review, StarRatingPercentageList } from "./interfaces";

export const calculateStarsPercentage = (reviewList: Review[]) => {
    let starsPercentageList: StarRatingPercentageList = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
    };

    reviewList.forEach((review) => {
        starsPercentageList[review.rating.toString() as keyof StarRatingPercentageList] += 1
    });

    [1, 2, 3, 4, 5].forEach((rating) => {
        starsPercentageList[rating.toString() as keyof StarRatingPercentageList] /= reviewList.length;
        starsPercentageList[rating.toString() as keyof StarRatingPercentageList] *= 100;
    });

    console.log(starsPercentageList);

    return starsPercentageList;
};

export const calculateAverageRating = (reviewList: Review[]) => {
    let totalStars = 0;
    reviewList.forEach((review) => {
        totalStars += review.rating;
    });

    return totalStars / reviewList.length;
}
