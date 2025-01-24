import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface SelectStarsProps {
    ratingStars: number,
    setRatingStars: (rating: number) => void;
}

const SelectStars = ({ratingStars, setRatingStars}: SelectStarsProps) => {

    return (
        <div className="flex flex-row gap-[3px]">
            {[1, 2, 3, 4, 5].map((i) => {
                let baseClassName: string = "size-5 hover:cursor-pointer ";
                const gray: string = "text-gray-300";
                const filled: string = "text-amber-400";

                if (i <= ratingStars) {
                    baseClassName += filled;
                } else {
                    baseClassName += gray;
                }

                return (
                    <FaStar
                        key={i}
                        onClick={() => {setRatingStars(i)}}
                        className={baseClassName}
                    />
                );
            })}
        </div>
    );
};

export default SelectStars;
