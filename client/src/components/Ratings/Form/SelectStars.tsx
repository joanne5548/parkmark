import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const SelectStars = () => {
    const [rating, setRating] = useState<number>(0);

    return (
        <div className="flex flex-row gap-[3px]">
            {[1, 2, 3, 4, 5].map((i) => {
                let baseClassName: string = "size-5 hover:cursor-pointer ";
                const gray: string = "text-gray-300";
                const filled: string = "text-amber-400";

                if (i <= rating) {
                    baseClassName += filled;
                } else {
                    baseClassName += gray;
                }

                return (
                    <FaStar
                        key={i}
                        onClick={() => setRating(i)}
                        className={baseClassName}
                    />
                );
            })}
        </div>
    );
};

export default SelectStars;
