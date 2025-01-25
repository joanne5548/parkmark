import React, { useEffect, useState } from "react";

interface PercentageBarProps {
    star: number;
    starPercentage: number;
}

const PercentageBar = ({ star, starPercentage }: PercentageBarProps) => {
    const barWidth = `${starPercentage ? Math.max(starPercentage, 8) : 0}%`;

    return (
        <div className="flex flex-row gap-2 w-full items-center">
            <div className="text-blue-700 text-base font-medium w-[43px]">
                {star} star
            </div>
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

export default PercentageBar;
