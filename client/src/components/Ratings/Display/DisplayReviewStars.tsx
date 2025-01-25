import React from "react";
import { FaStar } from "react-icons/fa";

interface DisplayReviewStarsProps {
    rating: number;
    starSize: number;
}

const DisplayReviewStars: React.FC<DisplayReviewStarsProps> = ({ rating, starSize }) => {
    return (
        <div className="flex flex-row gap-[7px]">
            {[1, 2, 3, 4, 5].map((i) => {
                let className = "size-6 ";//"size-" + starSize + " ";
                const gray = "text-gray-300";
                const filled = "text-amber-400";

                if (i <= rating) {
                    className += filled;
                } else {
                    className += gray;
                }

                return <FaStar key={i} className={className} />;
            })}
        </div>
    );
};

export default DisplayReviewStars;
