import React from "react";
import StarsBarPercentage from "./StarsBarPercentage";
import { StarRatingPercentageList } from "@lib/interfaces";

interface StarsBarListProps {
    starRatingPercentageList: StarRatingPercentageList;
}

const StarsBarList = ({ starRatingPercentageList }: StarsBarListProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {[5, 4, 3, 2, 1].map((i) => (
                <StarsBarPercentage
                    star={i}
                    starPercentage={
                        starRatingPercentageList[
                            i.toString() as keyof StarRatingPercentageList
                        ]
                    }
                />
            ))}
        </div>
    );
};

export default StarsBarList;
