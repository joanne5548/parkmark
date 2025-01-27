import PercentageBar from "./PercentageBar";
import { StarRatingPercentageList } from "@lib/interfaces";

interface PercentageBarListProps {
    starRatingPercentageList: StarRatingPercentageList;
}

const PercentageBarList = ({
    starRatingPercentageList,
}: PercentageBarListProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {[5, 4, 3, 2, 1].map((i) => {
                const percentage =
                    starRatingPercentageList[
                        i.toString() as keyof StarRatingPercentageList
                    ];

                return (
                    <PercentageBar
                        star={i}
                        starPercentage={Math.round(percentage * 100) / 100}
                    />
                );
            })}
        </div>
    );
};

export default PercentageBarList;
