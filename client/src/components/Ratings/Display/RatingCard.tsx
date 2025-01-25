import { Review, UserData } from "../../../lib/interfaces";
import profileImg from "../../../assets/parkmark-logo.jpg";
import DisplayReviewStars from "./DisplayReviewStars";
import ThumbsUpButton from "./ThumbsUpButton";
import { formatDate } from "../../../lib/dates";
import { useEffect, useState } from "react";
import { getUser, handleApiError } from "../../../lib/APIs/userDataApi";

interface RatingCardProps {
    review: Review;
}

const RatingCard: React.FC<RatingCardProps> = ({ review }) => {
    const [reviewUserData, setReviewUserData] = useState<UserData | null>(null);

    const fetchUserData = async () => {
        try {
            const fetchedReviewUserData: UserData | null = await getUser(
                review.user_sub_id
            );

            if (!fetchedReviewUserData) {
                throw new Error(
                    "The user for requested review does not exist!"
                );
            }

            setReviewUserData(fetchedReviewUserData);
        } catch (error) {
            handleApiError(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-row gap-4 py-4 border-b-2">
            <div className="flex flex-col gap-3 w-5/12 min-w-36">
                <div className="flex flex-row gap-3">
                    <img
                        src={reviewUserData?.profile_picture_url}
                        className="size-10 rounded-xl object-cover"
                    />
                    <div className="font-medium">{reviewUserData?.name}</div>
                </div>
                <div className="self-center">
                    <img
                        src={profileImg}
                        className="size-32 object-cover rounded-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row gap-2 pb-2 items-center">
                    <DisplayReviewStars rating={review.rating} starSize={4} />
                    <div className="text-xs font-medium text-slate-500">
                        {formatDate(review.created_at)}
                    </div>
                </div>
                <div className="text-slate-700 pb-1">{review.content}</div>
                <div className="flex justify-end">
                    <ThumbsUpButton />
                </div>
            </div>
        </div>
    );
};

export default RatingCard;
