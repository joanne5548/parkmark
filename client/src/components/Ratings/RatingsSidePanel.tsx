import { useState } from "react";
import { useSetAtom } from "jotai";
import { selectedParkAtom } from "@lib/atoms/atoms";
import { IoClose } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import RatingsCardList from "./Display/RatingsCardList";
import RatingCardForm from "./Form/RatingCardForm";
import { FiMinus } from "react-icons/fi";
import ProfileTabs from "../ProfilePage/ProfileTabs";

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
            className="absolute left-2 right-2 bottom-2 h-[55%] sm:right-2 sm:left-auto sm:bottom-auto
                sm:w-1/2 sm:max-w-[34rem] sm:h-[97%] pb-6
                flex flex-col z-[1000] bg-white rounded-lg border-slate-400 shadow-lg shadow-slate-400"
        >
            <button
                className="absolute right-1 top-1"
                onClick={handleCloseButton}
            >
                <IoClose className="text-slate-500 size-5" />
            </button>
            <div className="flex flex-col h-full pt-1">
                <ProfileTabs
                    tabs={[
                        {
                            title: "Info",
                            component: <div className="px-5">yo yoyoyoyoyoooy
                            yo yo ma
                            </div>,
                        },
                        {
                            title: "Reviews",
                            component: (
                                <div className="relative h-full px-5 overflow-y-auto">
                                    <button
                                        onClick={handleNewReviewButtonOnClick}
                                        className="absolute right-5 top-3 sm:top-2.5 text-xl sm:text-2xl bg-amber-900 hover:bg-amber-800 rounded-md p-0.5"
                                    >
                                        {creatingNewReview ? (
                                            <FiMinus className="text-amber-100" />
                                        ) : (
                                            // <div className="text-amber-100 px-1">Create</div>
                                            <MdAdd className="text-amber-100" />
                                        )}
                                    </button>
                                    {creatingNewReview ? (
                                        <RatingCardForm
                                            resetCreatingNewReview={() =>
                                                setCreatingNewReview(false)
                                            }
                                        />
                                    ) : (
                                        <RatingsCardList />
                                    )}
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default RatingsSidePanel;
