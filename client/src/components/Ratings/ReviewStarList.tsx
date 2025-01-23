import React from 'react'
import { FaStar } from 'react-icons/fa';

interface ReviewStarListProps {
    rating: number;
}

const ReviewStarList: React.FC<ReviewStarListProps> = ({ rating }) => {
  return (
    <div className='flex flex-row gap-[3px]'>
      {[1, 2, 3, 4, 5].map((i) => {
        let className = "size-[1.2rem] ";
        const gray = "text-gray-300";
        const filled = "text-amber-400";

        if (i <= rating) {
            className += filled;
        }
        else {
            className += gray;
        }

        return <FaStar className={className}/>
      })}
    </div>
  )
}

export default ReviewStarList
