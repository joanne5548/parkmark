import { ReviewWithUserData } from "@lib/interfaces";
import DisplayReviewStars from "./DisplayReviewStars";
import ThumbsUpButton from "./ThumbsUpButton";
import { formatDate } from "@lib/dates";
import { useAtomValue } from "jotai";
import { logInUserAtom } from "@lib/atoms/atoms";
import { IoClose } from "react-icons/io5";
import { deleteReview } from "@lib/APIs/reviewApi";

interface RatingCardProps {
    review: ReviewWithUserData;
    fetchReviews: () => Promise<void>;
}

const RatingCard: React.FC<RatingCardProps> = ({ review, fetchReviews }) => {
    const logInUser = useAtomValue(logInUserAtom);

    const handleDeleteRatingButtonOnClick = async () => {
        const result = confirm("Are you sure you want to delete the review?");

        if (!result) {
            return;
        }

        await deleteReview(review.review_id);

        await fetchReviews();
    }

    return (
        <div className="flex flex-row md:gap-4 py-4 md:py-5 border-b-2">
            <div className="flex flex-col gap-3.5 md:gap-4 w-5/12 min-w-36">
                <div className="flex flex-row gap-3">
                    <img
                        src={review.user_profile_picture_url}
                        className="size-8 md:size-10 rounded-xl object-cover"
                    />
                    <div className="text-[0.95rem] md:text-base font-medium">{review.user_name}</div>
                </div>
                <div className="self-center">
                    {review.img_url && (
                        <img
                            src={review.img_url}
                            className="size-24 md:size-32 object-cover rounded-lg"
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col w-full min-h-28">
                <div className="flex flex-row gap-1 md:gap-2 pb-2 items-start justify-between">
                    <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <DisplayReviewStars rating={review.rating} size={4} />
                        <div className="text-xs md:text-sm font-medium text-slate-500">
                            {formatDate(review.created_at)}
                        </div>
                    </div>
                    {logInUser?.sub_id === review.user_sub_id && 
                        <button onClick={handleDeleteRatingButtonOnClick} className="bg-none outline-none">
                            <IoClose className="text-lg text-slate-500" />
                        </button>
                    }
                </div>
                <div className="h-full text-[0.95rem] md:text-base pb-4 md:pb-1 text-slate-700">
                    {review.content}
                </div>
                <div className="flex justify-end">
                    <ThumbsUpButton reviewId={review.review_id} />
                </div>
            </div>
        </div>
    );
};

export default RatingCard;
