import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
          size={20}
        />
      ))}
    </div>
  );
};

export default StarRating;
