import { useRef, useState } from "react";
import { useAtomValue } from "jotai";
import SelectStars from "./SelectStars";
import { logInUserAtom, selectedParkAtom } from "@lib/atoms/atoms";
import { Review, UserData } from "@lib/interfaces";
import placeholderImg from "@assets/parkmark-logo.jpg";
import { formatDate } from "@lib/dates";
import { postReview } from "@lib/APIs/reviewApi";

interface RatingCardFormProps {
    resetCreatingNewReview: () => void;
}

const RatingCardForm = ({ resetCreatingNewReview }: RatingCardFormProps) => {
    const logInUser: UserData | null = useAtomValue(logInUserAtom);
    const [ratingStars, setRatingStars] = useState<number>(0);
    const reviewContentRef = useRef<HTMLTextAreaElement>(null);
    const selectedPark = useAtomValue(selectedParkAtom);

    const handlePostButtonClick = async () => {
        if (!logInUser) {
            throw new Error("User is not logged in!");
        }
        if (!selectedPark) {
            throw new Error("Park is not selected!");
        }
        if (!reviewContentRef.current) {
            throw new Error("Textarea ref is null");
        }
        if (ratingStars === 0) {
            alert("Select Rating Stars");
            return;
        }

        const review: Review = {
            user_sub_id: logInUser.sub_id,
            park_id: selectedPark.id,
            rating: ratingStars,
            content: reviewContentRef.current.value,
            img_url_list: {},
        };

        await postReview(review);

        resetCreatingNewReview();
    };

    return (
        <div className="h-full">
            {logInUser ? (
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4 py-4">
                        <div className="flex flex-col gap-3 w-5/12 min-w-36">
                            <div className="flex flex-row gap-3">
                                <img
                                    src={logInUser.profile_picture_url}
                                    className="size-10 rounded-xl object-cover"
                                />
                                <div className="font-medium">
                                    {logInUser.name}
                                </div>
                            </div>
                            <div className="self-center">
                                <img
                                    src={placeholderImg}
                                    className="size-32 object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row gap-2 pb-2 items-center">
                                <SelectStars
                                    ratingStars={ratingStars}
                                    setRatingStars={(i: number) =>
                                        setRatingStars(i)
                                    }
                                />
                                <div className="text-xs font-medium text-slate-500">
                                    {formatDate()}
                                </div>
                            </div>
                            <textarea
                                ref={reviewContentRef}
                                placeholder="Content"
                                className="border-[1px] border-slate-400 rounded-lg p-3 text-slate-950 pb-1 w-full h-full outline-none"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handlePostButtonClick}
                        className="self-end px-2 py-1 text-base text-white bg-amber-900 hover:bg-amber-800 border-none rounded-md"
                    >
                        Post
                    </button>
                </div>
            ) : (
                <div className="flex justify-center items-center text-slate-800 text-lg h-full">
                    Please log in to write reviews.
                </div>
            )}
        </div>
    );
};

export default RatingCardForm;
