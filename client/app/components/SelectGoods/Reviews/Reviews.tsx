import React from 'react';
import AddReviews from './AddReviews';
import './Reviews.scss';
import SelectReview from './SelectReview';
import ReviewsHeader from './ReviewsHeader';
import { ReviewType } from '@/app/interfaces/Goods';

type Props = {
  reviews: ReviewType[];
  productId: number;
  productName: string;
};

const Reviews = ({ reviews, productId, productName }: Props) => {
  console.log(322323, reviews);
  return (
    <div className="reviews-container2">
      {/*<ReviewsHeader
        averageRating={averageRating}
        priceQuality={priceQuality}
        countReviews={reviews.length}
      />*/}
      <AddReviews
        countReviews={reviews.length}
        productId={productId}
        productName={productName}
      />
      <div className="list-reviews-container">
        <div className="list-reviews">
          {reviews.map((x) => (
            <SelectReview review={x} key={x.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
