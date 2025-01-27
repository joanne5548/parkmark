import { useState } from "react";
import UserInfoPopup from "./UserInfoPopup";
import { useAtomValue } from "jotai";
import { logInUserAtom } from "@lib/atoms/atoms";

const UserInfoTile = () => {
    const logInUser = useAtomValue(logInUserAtom);
    const [mouseClickOnIcon, setMouseClickOnIcon] = useState<boolean>(false);
    const [mouseHoverOverIcon, setMouseHoverOverIcon] = useState<boolean>(false);

    const handleUserIconOnClick = () => {
        setMouseClickOnIcon(!mouseClickOnIcon);
    };

    return (
        <div className="flex flex-row gap-2 relative">
            <button
                onClick={handleUserIconOnClick}
                onMouseEnter={() => {
                    setMouseHoverOverIcon(true);
                }}
                onMouseLeave={() => {
                    setMouseHoverOverIcon(false);
                }}
            >
                <img
                    src={logInUser?.profile_picture_url}
                    className="size-10 rounded-3xl"
                    referrerPolicy="no-referrer"
                />
            </button>
            {(mouseClickOnIcon || mouseHoverOverIcon) && <UserInfoPopup />}
        </div>
    );
};

export default UserInfoTile;
