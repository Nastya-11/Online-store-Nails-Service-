import { Rating } from '@mui/material';
import './ReviewsHeader.scss';
import React from 'react';

type Props = {
  countReviews: number;
  averageRating: number;
  priceQuality: number;
};

const ReviewsHeader = ({
  countReviews,
  averageRating,
  priceQuality,
}: Props) => {
  return (
    <div className="reviews-header-container">
      <div className="row">
        {countReviews > 0 && (
          <Rating
            name="half-rating-read"
            color="#46773B"
            style={{ color: '#46773B' }}
            defaultValue={averageRating}
            precision={0.1}
            readOnly
          />
        )}
        <p>{countReviews} Відгуків</p>
      </div>
      <div className="starts">
        {countReviews > 0 && (
          <>
            <div className="star">
              <p>Якість</p>
              <div className="selects">
                {[...Array(Math.ceil(averageRating))].map((x, index) => (
                  <div className="select" key={index} />
                ))}
                {[...Array(5 - Math.ceil(averageRating))].map((x, index) => (
                  <div className="noSelect" key={index} />
                ))}
              </div>
            </div>
            <div className="star">
              <p>Співвідношення ціни та якості</p>
              <div className="selects">
                {[...Array(Math.ceil(priceQuality))].map((x, index) => (
                  <div className="select" key={index} />
                ))}
                {[...Array(5 - Math.ceil(priceQuality))].map((x, index) => (
                  <div className="noSelect" key={index} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewsHeader;
