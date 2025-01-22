import { useState } from "react";
import profileImg from "../../assets/parkmark-logo.jpg";
import { LuThumbsUp } from "react-icons/lu";

const RatingCard = () => {
    const [thumbsUpBool, setThumbsUpBool] = useState<boolean>(false);
    const [buttonClassName, setButtonClassName] = useState<string>("");

    const handleThumbsUpButtonClick = () => {
        const newThumbsUpBool = !thumbsUpBool;

        let className = "size-4.5";
        if (newThumbsUpBool) {
            className += " fill-blue-400";
        }
        setThumbsUpBool(newThumbsUpBool);
        setButtonClassName(className);
    };

    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-3">
                    <img src={profileImg} className="size-10 rounded-xl" />
                    <div className="font-medium min-w-24">Joanne Kim</div>
                </div>
                <div className="self-center">
                    <img
                        src={profileImg}
                        className="size-32 object-cover rounded-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row gap-2 items-center">
                    <div>stars</div>
                    <div className="text-xs font-medium text-slate-500">
                        date
                    </div>
                </div>
                <div className="text-slate-600 min-h-[7.75rem] min-w-full">
                    review content
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleThumbsUpButtonClick}
                        className="size-fit rounded-md bg-none border-2 p-1.5 border-slate-300"
                    >
                        <LuThumbsUp className={buttonClassName} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingCard;
