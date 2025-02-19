import { useState } from "react";
import { useAtom } from "jotai";
import { selectedParkAtom } from "@lib/atoms/atoms";
import { IoClose } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import RatingsCardList from "./Display/RatingsCardList";
import RatingCardForm from "./Form/RatingCardForm";
import { FiExternalLink, FiMinus } from "react-icons/fi";
import ProfileTabs from "../ProfilePage/ProfileTabs";

const RatingsSidePanel = () => {
    const [selectedPark, setSelectedPark] = useAtom(selectedParkAtom);
    // const selectedParkReviewList = useAtomValue(selectedParkReviewListAtom)
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
                flex flex-col z-[1000] bg-white rounded-lg border-slate-400 shadow-md shadow-slate-400"
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
                            component: (
                                <div className="flex flex-col gap-2 pl-3 pr-2 sm:px-5 pt-3 sm:py-3 overflow-y-auto">
                                    <div className="flex flex-row gap-2 flex-wrap justify-between items-end mb-2">
                                        <div className="text-2xl font-semibold">
                                            {selectedPark?.name}
                                        </div>
                                        <a
                                            href={
                                                selectedPark?.park_info.nps_url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-500 font-bold hover:underline"
                                        >
                                            <span>
                                                NPS Website{" "}
                                                <FiExternalLink className="text-sm inline align-baseline sm:align-middle stroke-2" />
                                            </span>
                                        </a>
                                    </div>
                                    <img
                                        src={selectedPark?.park_info.img_url}
                                        className="mb-2 rounded-lg"
                                    />
                                    <div className="text-lg font-medium">
                                        {
                                            selectedPark?.park_info.description
                                                .title
                                        }
                                    </div>
                                    <div>
                                        {
                                            selectedPark?.park_info.description
                                                .content
                                        }
                                    </div>
                                </div>
                            ),
                        },
                        {
                            title: "Reviews",
                            component: (
                                <div className="h-full px-5 overflow-y-auto">
                                    <button
                                        onClick={handleNewReviewButtonOnClick}
                                        className="absolute right-7 top-3 sm:top-2.5 text-xl sm:text-2xl bg-amber-900 hover:bg-amber-800 rounded-md p-0.5"
                                    >
                                        {creatingNewReview ? (
                                            <FiMinus className="text-amber-100" />
                                        ) : (
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
                            // length: selectedParkReviewList.length, // works only after clicking on the tab
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default RatingsSidePanel;
