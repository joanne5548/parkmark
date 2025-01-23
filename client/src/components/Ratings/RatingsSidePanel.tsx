import { IoClose } from "react-icons/io5";
import RatingCard from "./RatingCard";
import { useSetAtom } from "jotai";
import { selectedParkAtom } from "../../lib/atoms/atoms";
import { MdAdd } from "react-icons/md";

const RatingsSidePanel = () => {
    const setSelectedPark = useSetAtom(selectedParkAtom);

    const handleCloseButton = () => {
        setSelectedPark(null);
    };

    return (
        <div className="absolute right-2 flex flex-col gap-4 w-5/12 max-w-[34rem] min-h-[97%] p-4 pr-5 bg-white rounded-lg border-slate-400 shadow-lg shadow-slate-400">
            <button
                className="absolute right-1 top-1"
                onClick={handleCloseButton}
            >
                <IoClose className="text-slate-500 size-5" />
            </button>
            <div className="relative font-medium text-2xl border-b-2 py-2">
                Reviews
                <div className="absolute right-0 bottom-1">
                    <button className="border-2 border-slate-400 rounded-md">
                        <MdAdd className="text-slate-700" />
                    </button>
                </div>
            </div>

            <RatingCard />
        </div>
    );
};

export default RatingsSidePanel;
