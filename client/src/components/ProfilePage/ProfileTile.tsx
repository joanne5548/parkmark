import { formatDate } from "@lib/dates";
import { UserData } from "@lib/interfaces";
import { FaRegCalendar } from "react-icons/fa";

interface ProfileTileProps {
    userData: UserData | null;
}

const ProfileTile = ({ userData }: ProfileTileProps) => {
    return (
        <div className="self-center sm:self-start">
            {userData ? (
                <div className="flex flex-col items-center gap-4 w-48">
                    <img
                        src={userData.profile_picture_url}
                        className="rounded-full self-center w-32 sm:w-28 aspect-square object-cover"
                    />
                    <div className="text-lg font-medium text-center">
                        {userData.name}
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center max-w-44 bg-slate-200 rounded-md p-1 text-sm hover:cursor-default">
                        <FaRegCalendar className="text-4" />
                        User Since {formatDate(userData.created_at)}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ProfileTile;
