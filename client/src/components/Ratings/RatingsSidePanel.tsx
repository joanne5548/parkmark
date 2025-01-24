import { useEffect, useState } from "react";
import { Review } from "../../lib/interfaces";
import RatingCard from "./RatingCard";
import { handleApiError } from "../../lib/APIs/userDataApi";
import { fetchReviewsByParkId } from "../../lib/APIs/reviewApi";
import { useAtom } from "jotai";
import { selectedParkAtom } from "../../lib/atoms/atoms";
import { IoClose } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

const RatingsSidePanel = () => {
    const [selectedPark, setSelectedPark] = useAtom(selectedParkAtom);
    const [reviewList, setReviewList] = useState<Review[]>([]);

    const handleCloseButton = () => {
        setSelectedPark(null);
    };

    const fetchReviews = async () => {
        try {
            const fetchedReviewList: Review[] = await fetchReviewsByParkId(selectedPark?.id!);
            setReviewList(fetchedReviewList);
        } catch (error) {
            handleApiError(error);
        }
    };

    useEffect(() => {
        if (!selectedPark) {
            return;
        }

        fetchReviews();
    }, [selectedPark]);

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
                        <button className="border-2 border-slate-400 rounded-md">
                            <MdAdd className="text-slate-700" />
                        </button>
                    </div>
                </div>

                {reviewList.length === 0 ? (
                    <div className="flex justify-center items-center text-slate-800 text-lg h-full">
                        No Reviews Yet! Wanna be the first? :D
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {reviewList.map((review) => (
                            <RatingCard key={`${review.id}`} review={review} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RatingsSidePanel;
