import { useState } from "react";
import UserInfoPopup from "./UserInfoPopup";
import { useAtomValue } from "jotai";
import { logInUserAtom } from "../../lib/atoms/atoms";

// interface UserInfoTileProps {
//     resetLogInUser: () => void;
// }

const UserInfoTile = () => {
    const logInUser = useAtomValue(logInUserAtom);
    const [displayUserInfo, setDisplayUserInfo] = useState<boolean>(false);

    const handleUserIconOnClick = () => {
        setDisplayUserInfo(!displayUserInfo);
    };

    // const setDisplayUserInfoToFalse = () => {
    //     setDisplayUserInfo(false);
    // };

    // const handleProfileButtonOnClick = () => {
    //     setDisplayUserInfo(!displayUserInfo);
    // };

    return (
        <div className="flex flex-row gap-2 relative">
            <button onClick={handleUserIconOnClick}>
                <img
                    src={logInUser?.profile_picture_url}
                    className="size-10 rounded-3xl"
                    referrerPolicy="no-referrer"
                />
            </button>
            {displayUserInfo && <UserInfoPopup />}
        </div>
    );
};

export default UserInfoTile;
