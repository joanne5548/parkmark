import { FaStar } from "react-icons/fa";

interface SelectStarsProps {
    ratingStars: number,
    size: number,
    setRatingStars: (rating: number) => void;
}

const SelectStars = ({ratingStars, size, setRatingStars}: SelectStarsProps) => {

    return (
        <div className="flex flex-row gap-[3px]">
            {[1, 2, 3, 4, 5].map((i) => {
                let baseClassName: string = `size-${size} hover:cursor-pointer `;
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
