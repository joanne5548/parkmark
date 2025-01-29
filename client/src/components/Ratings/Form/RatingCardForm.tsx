import { ChangeEvent, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import SelectStars from "./SelectStars";
import { logInUserAtom, selectedParkAtom } from "@lib/atoms/atoms";
import { UserData } from "@lib/interfaces";
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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const reviewContentRef = useRef<HTMLTextAreaElement>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) {
            return;
        }

        setImageFile(event.target.files[0]);
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

        const formData = new FormData();
        formData.append("user_sub_id", logInUser.sub_id);
        formData.append("park_id", selectedPark.id);
        formData.append("rating", ratingStars.toString());
        formData.append("content", reviewContentRef.current.value);
        
        if (imageFile) {
            formData.append("img_file", imageFile);
        }

        await postReview(formData);

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
                            <div className="size-32 self-center">
                                <label
                                    htmlFor="imageUpload"
                                    className="block h-full self-center border-[1.5px] border-slate-400 rounded-lg
                                                hover:cursor-pointer hover:bg-slate-100"
                                >
                                    <div className="flex h-full justify-center items-center">
                                        <FaImage className="text-slate-600 text-4xl" />
                                    </div>
                                    <input
                                        type="file"
                                        name="image"
                                        accept=".png, .jpg, .jpeg"
                                        id="imageUpload"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col w-full min-h-32">
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
                                name="content"
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
