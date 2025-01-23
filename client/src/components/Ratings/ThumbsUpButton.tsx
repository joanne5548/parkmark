import React, { useState } from "react";
import { LuThumbsUp } from "react-icons/lu";

const ThumbsUpButton = () => {
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
        <button
            onClick={handleThumbsUpButtonClick}
            className="size-fit rounded-md bg-none border-2 p-1.5 border-slate-300"
        >
            <LuThumbsUp className={buttonClassName} />
        </button>
    );
};

export default ThumbsUpButton;
