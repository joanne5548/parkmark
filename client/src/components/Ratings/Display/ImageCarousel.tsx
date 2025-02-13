import { useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

interface ImageCarouselProps {
    imgUrlList: string[];
}

const ImageCarousel = ({ imgUrlList }: ImageCarouselProps) => {
    const [imgIndex, setImgIndex] = useState<number>(0);

    const updateImgIndex = (direction: number) => {
        const updatedImgIndex = imgIndex + direction;
        if (updatedImgIndex < 0 || updatedImgIndex >= imgUrlList.length) {
            return;
        }
        setImgIndex(updatedImgIndex);
    }

    return (
        <div className="relative w-full rounded-xl bg-white">
            <img
                src={imgUrlList[imgIndex]}
                className="w-full aspect-square object-cover rounded-lg"
            />
            {imgIndex > 0 && <button
                    onClick={() => {
                        updateImgIndex(-1);
                    }}
                    className="absolute left-1.5 top-16 rounded-full bg-white opacity-75 hover:cursor-pointer"
                >
                    <MdOutlineKeyboardArrowLeft className="size-5 text-slate-700" />
                </button>}
                {imgIndex < imgUrlList.length - 1 && <button
                    onClick={() => {
                        updateImgIndex(1);
                    }}
                    className="absolute right-1.5 top-16 rounded-full bg-white opacity-[60%] hover:cursor-pointer"
                >
                    <MdOutlineKeyboardArrowRight className="size-5 text-slate-700" />
                </button>}
        </div>
    );
};

export default ImageCarousel;
