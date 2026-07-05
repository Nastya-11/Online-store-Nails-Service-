'use client';
import React, { useState } from 'react';
import './DescriptionOrReviews.scss';
import Reviews from './Reviews/Reviews';
import { ReviewType } from '@/app/interfaces/Goods';

type Props = {
  description: string;
  reviews: ReviewType[];
  productId: number;
  productName: string;
};

const DescriptionOrReviews = ({
  description,
  reviews,
  productId,
  productName,
}: Props) => {
  const [isDescription, setIsDescription] = useState<boolean>(true);
  return (
    <div className="description-or-reviews-cont">
      <div className="desc-review-cont">
        <div
          onClick={() => setIsDescription(true)}
          className={`desc ${isDescription && 'active'}`}
        >
          Опис
        </div>
        <div
          onClick={() => setIsDescription(false)}
          className={`revi ${!isDescription && 'active'}`}
        >
          Відгуки
        </div>
      </div>
      <div className="line" />
      {isDescription ? (
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <Reviews
          reviews={reviews}
          productId={productId}
          productName={productName}
        />
      )}
      <div className="line" />
    </div>
  );
};

export default DescriptionOrReviews;
