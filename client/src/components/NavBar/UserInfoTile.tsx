import React, { useState } from "react";
import { PiUserCircle } from "react-icons/pi";

interface UserInfoTileProps {
}

const UserInfoTile: React.FC<UserInfoTileProps> = () => {
    const [displayUserInfo, setDisplayUserInfo] = useState<boolean>(false);

    const handleIconMouseHover = () => {
        setDisplayUserInfo(!displayUserInfo);
    };

    return (
        <div className="flex flex-row gap-2 relative">
            <button
                onMouseEnter={handleIconMouseHover}
                onMouseLeave={handleIconMouseHover}
            >
                <PiUserCircle className="size-10 text-slate-900" />
                {displayUserInfo ? (
                    // disable button
                    // cursor should be default
                    // fix justify-content
                    // transition, probably use callback function (transition-opacity duration-1000 ease-out opacity-100 hover:opacity-0)
                    <div className="flex flex-col absolute right-0 top-11 w-48 gap-4 p-6 rounded-lg shadow-lg shadow-slate-200 border border-slate-100">
                        <div className="flex flex-col justify-center">
                            <PiUserCircle className="size-12 text-slate-900" />
                            <div className="font-semibold text-md md:text-lg">
                                Joanne Kim
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-4">
                            <div className="border-b border-slate-400 pb-4 font-medium">
                                Settings
                            </div>
                            <div className="font-medium">Sign Out</div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </button>
        </div>
    );
};

export default UserInfoTile;
