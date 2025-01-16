import React, { useState } from "react";
import { PiUserCircle } from "react-icons/pi";

interface UserInfoTileProps {}

const UserInfoTile: React.FC<UserInfoTileProps> = () => {
    const [displayUserInfo, setDisplayUserInfo] = useState<boolean>(false);

    const handleIconMouseHover = () => {
        setDisplayUserInfo(!displayUserInfo);
    };

    return (
        <div className="flex flex-row gap-2 relative group">
            <button
                onMouseEnter={handleIconMouseHover}
                onMouseLeave={handleIconMouseHover}
            >
                <PiUserCircle className="size-10 text-slate-900" />
                {true ? <></> : <></>}
            </button>
            {/* // disable button
                // cursor should be default - maybe this needs not to be inside of button
                // transition, probably use callback function (transition-opacity duration-1000 ease-out opacity-100 hover:opacity-0) */}
            <div
                className="absolute right-0 top-11 w-48 p-6 rounded-lg bg-white invisible group-hover:visible
                            shadow-lg shadow-userinfo border border-slate-100 z-[1000]"
            >
                <div className="flex flex-col gap-2 pb-4">
                    <PiUserCircle className="size-12 self-center text-slate-900" />
                    <div className="font-semibold text-md self-center">
                        Joanne Kim
                    </div>
                </div>
                <div className="flex flex-col justify-start gap-4 w-full self-center">
                    <button className="pb-4 font-medium text-center w-full border-b border-slate-400">
                        Settings
                    </button>
                    <button className="font-medium self-center">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoTile;
