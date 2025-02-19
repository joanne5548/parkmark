import { googleLogout } from "@react-oauth/google";
import { useAtom } from "jotai";
import { logInUserAtom } from "@lib/atoms/atoms";
import { useNavigate } from "react-router-dom";

const UserInfoPopup = () => {
    const navigate = useNavigate();
    const [logInUser, setLogInUser] = useAtom(logInUserAtom);
    
    const handleSignOut = () => {
        localStorage.removeItem("authToken");
        googleLogout();
        setLogInUser(null);
    };

    const handleUserNameClick = () => {
        navigate(`/profile/${logInUser?.sub_id}`);
    }

    return (
        <div
            className="absolute right-0 top-11 w-48 p-6 rounded-lg bg-white
                            shadow-lg shadow-userinfo border border-slate-100 z-[1001]"
        >
            <div className="flex flex-col gap-4 pb-4">
                <img
                    src={logInUser?.profile_picture_url}
                    className="size-12 rounded-3xl self-center"
                    referrerPolicy="no-referrer"
                />
                <button onClick={handleUserNameClick} className="font-semibold text-lg self-center hover:underline">
                    {logInUser?.name}
                </button>
            </div>
            <div className="flex flex-col justify-start gap-4 pt-4 w-full self-center border-t border-slate-400">
                {/* <button className="pb-4 font-medium text-center w-full border-b border-slate-400">
                    Settings
                </button> */}
                <button
                    onClick={handleSignOut}
                    className="font-medium self-center"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default UserInfoPopup;
