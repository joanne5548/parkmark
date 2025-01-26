import { ReviewWithUserData } from "@lib/interfaces";
import DisplayReviewStars from "./DisplayReviewStars";
import ThumbsUpButton from "./ThumbsUpButton";
import { formatDate } from "@lib/dates";

interface RatingCardProps {
    review: ReviewWithUserData;
}

const RatingCard: React.FC<RatingCardProps> = ({ review }) => {
    return (
        <div className="flex flex-row gap-4 py-4 border-b-2">
            <div className="flex flex-col gap-3 w-5/12 min-w-36">
                <div className="flex flex-row gap-3">
                    <img
                        src={review.user_profile_picture_url}
                        className="size-10 rounded-xl object-cover"
                    />
                    <div className="font-medium">{review.user_name}</div>
                </div>
                <div className="self-center">
                    {/* <img
                        src={profileImg}
                        className="size-32 object-cover rounded-lg"
                    /> */}
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row gap-2 pb-2 items-center">
                    <DisplayReviewStars rating={review.rating} />
                    <div className="text-sm font-medium text-slate-500">
                        {formatDate(review.created_at)}
                    </div>
                </div>
                <div className="text-slate-700 pb-1 h-full">{review.content}</div>
                <div className="flex justify-end">
                    <ThumbsUpButton reviewId={review.review_id}/>
                </div>
            </div>
        </div>
    );
};

export default RatingCard;
