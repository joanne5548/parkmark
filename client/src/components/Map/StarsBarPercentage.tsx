import React, { useEffect, useState } from "react";

interface StarsBarPercentageProps {
    star: number;
    starPercentage: number;
}

const StarsBarPercentage = ({
    star,
    starPercentage,
}: StarsBarPercentageProps) => {
    const barWidth = `${Math.max(starPercentage, 5)}%`;

    return (
        <div className="flex flex-row gap-2 w-full items-center">
            <div className="text-blue-700 text-base font-medium w-[43px]">{star} star</div>
            <div className="relative bg-slate-100 rounded-full w-52 h-4">
                <div
                    className="absolute left-0 bg-amber-400 shadow-amber-200 shadow-sm rounded-full h-full"
                    style={{
                        width: barWidth,
                    }}
                ></div>
            </div>
            <div className="text-base font-medium">{starPercentage}%</div>
        </div>
    );
};

export default StarsBarPercentage;
