import {
    fetchThumbsUpListByReviewId,
    postThumbsUpData,
} from "@lib/APIs/thumbsUpListApi";
import { logInUserAtom } from "@lib/atoms/atoms";
import { UserData } from "@lib/interfaces";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { LuThumbsUp } from "react-icons/lu";

interface ThumbsUpButtonProps {
    reviewId: string;
}

const ThumbsUpButton = ({ reviewId }: ThumbsUpButtonProps) => {
    const [thumbsUpBool, setThumbsUpBool] = useState<boolean>(false);
    const [buttonClassName, setButtonClassName] = useState<string>("");
    const [thumbsUpIconClassName, setThumbsUpIconClassName] =
        useState<string>("");
    const [thumbsUpCount, setThumbsUpCount] = useState<number>(0);

    const logInUser: UserData | null = useAtomValue(logInUserAtom);

    const handleThumbsUpButtonClick = () => {
        if (!logInUser) {
            alert("Please sign in to like a review.");
            return;
        }

        const newThumbsUpBool = !thumbsUpBool;
        const thumbsUpData = {
            user_sub_id: logInUser.sub_id,
            review_id: reviewId,
        };

        let className = "size-4.5";
        if (newThumbsUpBool) {
            className += " fill-blue-400";

            postThumbsUpData(thumbsUpData);
        } else {
            // delete here, but I need to delete by user id and review id..
        }
        setThumbsUpBool(newThumbsUpBool);
        setThumbsUpIconClassName(className);
    };

    const calculateNumberOfThumbsUp = async () => {
        const thumbsUpList = await fetchThumbsUpListByReviewId(reviewId);

        if (thumbsUpList === undefined) {
            console.log(
                `undefined number of thumbs up at review id: ${reviewId}`
            );
            return;
        }

        const baseClassName =
            "size-fit rounded-md bg-none border-2 border-slate-300 ";
        if (thumbsUpList.length === 0) {
            setButtonClassName(baseClassName + "p-1.5");
            setThumbsUpCount(0);
        } else {
            setButtonClassName(
                baseClassName + "flex flex-row gap-2 items-center px-1.5 py-0.5"
            );
            setThumbsUpCount(thumbsUpList.length);
        }
    };

    useEffect(() => {
        calculateNumberOfThumbsUp();
    }, []);

    return (
        <button onClick={handleThumbsUpButtonClick} className={buttonClassName}>
            <LuThumbsUp className={thumbsUpIconClassName} />
            {thumbsUpCount === 0 ? (
                <></>
            ) : (
                <>{thumbsUpBool ? thumbsUpCount + 1 : thumbsUpCount}</>
            )}
        </button>
    );
};

export default ThumbsUpButton;
