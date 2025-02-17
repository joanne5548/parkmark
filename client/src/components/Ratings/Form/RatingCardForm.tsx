import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import SelectStars from "./SelectStars";
import { logInUserAtom, selectedParkAtom } from "@lib/atoms/atoms";
import { Review, UserData } from "@lib/interfaces";
import { formatDate } from "@lib/dates";
import { postReview } from "@lib/APIs/reviewApi";
import { FaImage } from "react-icons/fa6";

interface RatingCardFormProps {
    resetCreatingNewReview: () => void;
}

const RatingCardForm = ({ resetCreatingNewReview }: RatingCardFormProps) => {
    const logInUser: UserData | null = useAtomValue(logInUserAtom);
    const selectedPark = useAtomValue(selectedParkAtom);

    const [ratingStars, setRatingStars] = useState<number>(0);
    const reviewContentRef = useRef<HTMLTextAreaElement>(null);
    const [imageFileList, setImageFileList] = useState<FileList | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }

        setImageFileList(event.target.files);
    };

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

        const reviewData: Review = {
            user_sub_id: logInUser.sub_id,
            park_id: selectedPark.id,
            rating: ratingStars,
            content: reviewContentRef.current.value,
        }

        const imageFormData = new FormData();
        if (imageFileList) {
            Array.from(imageFileList).forEach((file) => {
                imageFormData.append("img_file", file);
            })
        }
        await postReview(reviewData, imageFormData);

        resetCreatingNewReview();
    };

    useEffect(() => {
        if (!imageFileList) {
            return;
        }

        // After basic functionalities done, show all image previews
        const imageUrl = URL.createObjectURL(imageFileList[imageFileList.length - 1]);
        setImagePreviewUrl(imageUrl);

        return () => URL.revokeObjectURL(imageUrl);
    }, [imageFileList]);

    return (
        <div className="h-full">
            {logInUser ? (
                <div className="flex flex-col">
                    <div className="flex flex-row sm:gap-4 py-4 sm:py-5">
                        <div className="flex flex-col gap-3.5 sm:gap-4 w-5/12 min-w-36">
                            <div className="flex flex-row gap-3">
                                <img
                                    src={logInUser.profile_picture_url}
                                    className="size-8 sm:size-10 rounded-xl object-cover"
                                />
                                <div className="text-[0.95rem] sm:text-base font-medium">
                                    {logInUser.name}
                                </div>
                            </div>
                            <div className="relative w-[8.5rem] sm:w-full aspect-square">
                                <label
                                    htmlFor="imageUpload"
                                    className="block h-full border-[1.5px] border-slate-400 rounded-lg
                                                hover:cursor-pointer hover:bg-slate-100"
                                >
                                    <div className="flex h-full justify-center items-center">
                                        <FaImage className="text-slate-600 text-2xl sm:text-4xl" />
                                    </div>
                                    <input
                                        type="file"
                                        name="image"
                                        accept=".png, .jpg, .jpeg"
                                        id="imageUpload"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        multiple
                                    />
                                    {imagePreviewUrl && (
                                        <img
                                            src={imagePreviewUrl}
                                            className="absolute top-0 left-0 w-full aspect-square rounded-lg object-cover opacity-65"
                                        />
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col w-full min-h-32">
                            <div className="flex flex-col sm:flex-row gap-2 pb-2 sm:items-center">
                                <SelectStars
                                    ratingStars={ratingStars}
                                    size={5}
                                    setRatingStars={(i: number) =>
                                        setRatingStars(i)
                                    }
                                />
                                <div className="text-xs sm:text-sm font-medium text-slate-500">
                                    {formatDate()}
                                </div>
                            </div>
                            <textarea
                                ref={reviewContentRef}
                                name="content"
                                placeholder="Content"
                                className="w-full h-full p-2 sm:p-3 pb-1 border-[1px] border-slate-400 text-[0.95rem] sm:text-base rounded-lg text-slate-950 outline-none"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handlePostButtonClick}
                        className="self-end px-2 py-1 text-[0.95rem] text-white bg-amber-900 hover:bg-amber-800 border-none rounded-md"
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
