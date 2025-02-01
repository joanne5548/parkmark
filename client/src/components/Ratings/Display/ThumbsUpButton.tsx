import {
    deleteThumbsUpData,
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
    initialThumbsUpBool: boolean;
}

const ThumbsUpButton = ({ reviewId, initialThumbsUpBool }: ThumbsUpButtonProps) => {
    const [thumbsUpBool, setThumbsUpBool] = useState<boolean>(initialThumbsUpBool);
    const [thumbsUpCount, setThumbsUpCount] = useState<number>(0);
    const logInUser: UserData | null = useAtomValue(logInUserAtom);

    let thumbsUpIconClassName = "size-4.5 ";
    if (thumbsUpBool) {
        thumbsUpIconClassName += "fill-blue-400";
    }

    let buttonClassName = "size-fit rounded-md bg-none border-2 border-slate-300 ";
    if (thumbsUpCount === 0) {
        buttonClassName += "p-1.5";
    }
    else {
        buttonClassName += "flex flex-row gap-2 items-center px-1.5 py-0.5";
    }

    const handleThumbsUpButtonClick = async () => {
        if (!logInUser) {
            alert("Please sign in to like a review.");
            return;
        }

        const newThumbsUpBool = !thumbsUpBool;
        const thumbsUpData = {
            user_sub_id: logInUser.sub_id,
            review_id: reviewId,
        };

        if (newThumbsUpBool) {
            await postThumbsUpData(thumbsUpData);
        } else {
            await deleteThumbsUpData(logInUser.sub_id, reviewId);
        }

        await calculateNumberOfThumbsUp();
        setThumbsUpBool(newThumbsUpBool);
    };

    const calculateNumberOfThumbsUp = async () => {
        const thumbsUpList = await fetchThumbsUpListByReviewId(reviewId);

        if (thumbsUpList === undefined) {
            console.log(
                `undefined number of thumbs up at review id: ${reviewId}`
            );
            return;
        }

        if (thumbsUpList.length === 0) {
            setThumbsUpCount(0);
        } else {
            setThumbsUpCount(thumbsUpList.length);
        }
    };

    useEffect(() => {
        console.log(initialThumbsUpBool);
        calculateNumberOfThumbsUp();
    }, []);

    return (
        <button onClick={handleThumbsUpButtonClick} className={buttonClassName}>
            <LuThumbsUp className={thumbsUpIconClassName} />
            {thumbsUpCount === 0 ? <></> : <>{thumbsUpCount}</>}
        </button>
    );
};

export default ThumbsUpButton;
