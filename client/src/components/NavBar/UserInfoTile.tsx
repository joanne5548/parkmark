import { googleLogout } from "@react-oauth/google";
import React, { useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { UserData } from "../../lib/Interfaces";

interface UserInfoTileProps {
    logInUserData: UserData;
    resetLogInUser: () => void;
}

const UserInfoTile: React.FC<UserInfoTileProps> = ({
    logInUserData,
    resetLogInUser,
}) => {
    const [displayUserInfo, setDisplayUserInfo] = useState<boolean>(false);

    const handleIconMouseHover = () => {
        setDisplayUserInfo(!displayUserInfo);
    };

    const handleSignOut = () => {
        googleLogout();
        resetLogInUser();
    };

    return (
        <div className="flex flex-row gap-2 relative group">
            <button
                onMouseEnter={handleIconMouseHover}
                onMouseLeave={handleIconMouseHover}
            >
                <img
                    src={logInUserData.profile_picture_url}
                    className="size-10 rounded-3xl"
                    referrerPolicy="no-referrer"
                />
            </button>
            {/* // disable button
                // cursor should be default - maybe this needs not to be inside of button
                // transition, probably use callback function (transition-opacity duration-1000 ease-out opacity-100 hover:opacity-0) */}
            <div
                className="absolute right-0 top-11 w-48 p-6 rounded-lg bg-white invisible group-hover:visible
                            shadow-lg shadow-userinfo border border-slate-100 z-[1000]"
            >
                <div className="flex flex-col gap-4 pb-6">
                    <img
                        src={logInUserData.profile_picture_url}
                        className="size-12 rounded-3xl self-center"
                        referrerPolicy="no-referrer"
                    />
                    <div className="font-semibold text-lg self-center">
                        {logInUserData.name}
                    </div>
                </div>
                <div className="flex flex-col justify-start gap-4 w-full self-center">
                    <button className="pb-4 font-medium text-center w-full border-b border-slate-400">
                        Settings
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="font-medium self-center"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoTile;
