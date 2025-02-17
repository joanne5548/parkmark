import { formatDate } from "@lib/dates";
import { UserData } from "@lib/interfaces";
import { FaRegCalendar } from "react-icons/fa";
import { PiNotePencilLight } from "react-icons/pi";

interface ProfileTileProps {
    userData: UserData | null;
    reviewCount: number;
}

const ProfileTile = ({ userData, reviewCount }: ProfileTileProps) => {
    return (
        <div>
            {userData && (
                <div className="flex flex-col justify-center items-center gap-2">
                    <img
                        src={userData.profile_picture_url}
                        className="rounded-full self-center w-32 aspect-square object-cover"
                    />
                    <div className="text-lg font-medium text-center">
                        {userData.name}
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-row gap-1 items-center justify-center w-fit max-w-44 rounded-md p-1 px-2 text-sm text-white bg-amber-900 hover:cursor-default">
                            <PiNotePencilLight className="text-base stroke-2" />
                            {reviewCount} Review{reviewCount !== 1 && "s"}
                        </div>
                        <div className="flex flex-row gap-1 items-center justify-center w-fit max-w-44 bg-slate-200 rounded-md p-1 px-2 text-sm hover:cursor-default">
                            <FaRegCalendar className="text-4" />
                            User Since {formatDate(userData.created_at)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileTile;
