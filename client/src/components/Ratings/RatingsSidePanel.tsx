import React from "react";
import { IoClose } from "react-icons/io5";
import RatingCard from "./RatingCard";
import { useAtom } from "jotai";
import { selectedParkAtom } from "../../lib/atoms/atoms";

const RatingsSidePanel = () => {
    const [selectedPark, setSelectedPark] = useAtom(selectedParkAtom);

    const handleCloseButton = () => {
        setSelectedPark(null);
    };

    return (
        <div className="flex flex-col gap-4 w-3/5 min-w-[28rem] max-w-[38rem] p-4 bg-white rounded-lg border-slate-400 shadow-lg shadow-slate-300">
            <button className="self-end" onClick={handleCloseButton}>
                <IoClose className="text-slate-500 size-6" />
            </button>
            <div className="font-medium text-2xl border-b-2 pb-4">
                Replace with Park Name
            </div>

            <RatingCard />
        </div>
    );
};

export default RatingsSidePanel;
