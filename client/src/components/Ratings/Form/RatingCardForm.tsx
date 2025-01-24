import React from "react";
import { useAtomValue } from "jotai";
import { logInUserAtom } from "../../../lib/atoms/atoms";
import { UserData } from "../../../lib/interfaces";
import profileImg from "../../../assets/parkmark-logo.jpg";
import { formatDate } from "../../../lib/dates";
import SelectStars from "./SelectStars";

const RatingCardForm = () => {
    const logInUser: UserData | null = useAtomValue(logInUserAtom);

    return (
        <div className="h-full">
            {true ? (
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4 py-4">
                        <div className="flex flex-col gap-3 w-5/12 min-w-36">
                            <div className="flex flex-row gap-3">
                                <img
                                    src={logInUser?.profile_picture_url}
                                    className="size-10 rounded-xl object-cover"
                                />
                                <div className="font-medium">
                                    {logInUser?.name}
                                </div>
                            </div>
                            <div className="self-center">
                                <img
                                    src={profileImg}
                                    className="size-32 object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row gap-2 pb-2 items-center">
                                <SelectStars />
                                <div className="text-xs font-medium text-slate-500">
                                    {formatDate()}
                                </div>
                            </div>
                            <textarea
                                placeholder="Content"
                                className="border-[1px] border-slate-400 rounded-lg p-3 text-slate-950 pb-1 w-full h-full outline-none"
                            />
                        </div>
                    </div>
                    <button className="self-end px-2 py-1 text-base text-white bg-amber-900 hover:bg-amber-800 border-none rounded-md">
                        Post
                    </button>
                </div>
            ) : (
                <div className="flex justify-center items-center text-slate-800 text-lg h-full">
                    Please log in to write reviews.
                </div>
            )}
        </div>
    );
};

export default RatingCardForm;
