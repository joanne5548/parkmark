import { useState } from "react";
import { useSetAtom } from "jotai";
import { selectedParkAtom } from "../../lib/atoms/atoms";
import { IoClose } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import RatingsCardList from "./Display/RatingsCardList";
import RatingCardForm from "./Form/RatingCardForm";
import { FiMinus } from "react-icons/fi";

const RatingsSidePanel = () => {
    const setSelectedPark = useSetAtom(selectedParkAtom);
    const [creatingNewReview, setCreatingNewReview] = useState<boolean>(false);

    const handleCloseButton = () => {
        setSelectedPark(null);
    };

    const handleNewReviewButtonOnClick = () => {
        setCreatingNewReview(!creatingNewReview);
    };

    return (
        <div
            className="absolute right-2 flex flex-col w-5/12 max-w-[34rem] h-[97%] p-6 pr-2
            z-[1000] bg-white rounded-lg border-slate-400 shadow-lg shadow-slate-400"
        >
            <button
                className="absolute right-1 top-1"
                onClick={handleCloseButton}
            >
                <IoClose className="text-slate-500 size-5" />
            </button>
            <div className="flex flex-col overflow-y-scroll pr-4 h-full">
                <div className="relative h-[50px] font-medium text-2xl border-b-2 py-2">
                    Reviews
                    <div className="absolute right-0 bottom-1">
                        <button
                            onClick={handleNewReviewButtonOnClick}
                            className="bg-amber-900 hover:bg-amber-800 rounded-md p-0.5"
                        >
                            {creatingNewReview ? (
                                <FiMinus className="text-amber-100" />
                            ) : (
                                <MdAdd className="text-amber-100" />
                            )}
                        </button>
                    </div>
                </div>

                {creatingNewReview ? <RatingCardForm resetCreatingNewReview={() => setCreatingNewReview(false)} /> : <RatingsCardList />}
            </div>
        </div>
    );
};

export default RatingsSidePanel;
