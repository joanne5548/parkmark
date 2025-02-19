import { deleteUser } from "@lib/APIs/userDataApi";
import { logInUserAtom } from "@lib/atoms/atoms";
import { formatDate } from "@lib/dates";
import { UserData } from "@lib/interfaces";
import { useAtom } from "jotai";
import { FaRegCalendar } from "react-icons/fa";
import { PiNotePencilLight } from "react-icons/pi";
import { TiUserDeleteOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

interface ProfileTileProps {
    userData: UserData | null;
    reviewCount: number;
}

const ProfileTile = ({ userData, reviewCount }: ProfileTileProps) => {
    const navigate = useNavigate();
    const [logInUser, setLogInUser] = useAtom(logInUserAtom);

    const handleUserDelete = async () => {
        if (!logInUser || logInUser.sub_id !== userData?.sub_id) {
            throw new Error("You must log in to your account to delete your account.");
        }

        const response = confirm(
            "Are you sure you want to delete your account and all your data? This action is irreversible!"
        );

        if (!response) {
            return;
        }

        const deleteSuccess = await deleteUser(userData.sub_id);

        if (deleteSuccess) {
            setLogInUser(null);
            navigate("/");
        }
        else {
            throw new Error("User deletion failed.");
        }
    };

    return (
        <div>
            {userData && (
                <div className="flex flex-col gap-2 justify-center items-center">
                    <img
                        src={userData.profile_picture_url}
                        className="rounded-full self-center w-32 aspect-square object-cover"
                    />
                    <div className="text-lg font-medium text-center">
                        {userData.name}
                    </div>
                    <div className="flex flex-row gap-1 items-center justify-center w-fit max-w-44 rounded-md p-1 px-2 text-sm text-white bg-amber-900 hover:cursor-default">
                        <PiNotePencilLight className="text-base stroke-2" />
                        {reviewCount} Review{reviewCount !== 1 && "s"}
                    </div>
                    <div className="flex flex-row gap-1 items-center justify-center w-fit max-w-44 bg-slate-200 rounded-md p-1 px-2 text-sm hover:cursor-default">
                        <FaRegCalendar className="text-4" />
                        User Since {formatDate(userData.created_at)}
                    </div>
                    {logInUser?.sub_id === userData.sub_id ? (
                        <button
                            onClick={handleUserDelete}
                            className="flex flex-row gap-1 mt-1 items-center justify-center w-fit max-w-44 bg-rose-200 rounded-md p-1 px-2 text-sm"
                        >
                            <TiUserDeleteOutline className="text-lg" />
                            Delete your account
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileTile;
