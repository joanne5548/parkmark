import { useState } from "react";
import profileImg from "../../assets/parkmark-logo.jpg";
import ReviewStarList from "./ReviewStarList";
import ThumbsUpButton from "./ThumbsUpButton";

const RatingCard = () => {
    return (
        <div className="flex flex-row gap-4 pb-2 border-b-2">
            <div className="flex flex-col gap-3 w-5/12 min-w-36">
                <div className="flex flex-row gap-3">
                    <img src={profileImg} className="size-10 rounded-xl" />
                    <div className="font-medium">Joanne Kim</div>
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
                    <ReviewStarList rating={0} />
                    <div className="text-xs font-medium text-slate-500">
                        01/23/2025
                    </div>
                </div>
                <div className="text-slate-700 pb-1">
                    Yellowstone is the best national park ever! I loved seeing
                    the bisons Though sometimes, bisons do jam the traffic when
                    they're moving across the fields. We were stuck on the roads
                    for 40 minutes! But it was unforgettable moments for sure.
                    We camped there for a week, and one day, a huge moose was
                    standing right next to our tent lol
                </div>
                <div className="flex justify-end">
                    <ThumbsUpButton />
                </div>
            </div>
        </div>
    );
};

export default RatingCard;
