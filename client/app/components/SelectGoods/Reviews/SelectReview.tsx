import React from 'react';
import './SelectReview.scss';
import User from '../../../assest/Reviews/User.svg';
import { Rating } from '@mui/material';
import { ReviewType } from '@/app/interfaces/Goods';

type Props = {
  review: ReviewType;
};

const SelectReview = ({ review }: Props) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="select-review-container">
      <div className="select-review-header">
        <div className="svg-name-countStar">
          <div className="svg-container">
            <p>{review.user ? review.user.name[0] : review.nameUser[0]}</p>
            <div className="svg-main">
              <User />
            </div>
          </div>
          <div className="name-container-count-start">
            <div className="name-container">
              <span>
                {review.user
                  ? review.user.name + ' ' + review.user.surname
                  : review.nameUser + ' ' + review.surnameUser}{' '}
              </span>
              <p>Перевірений покупець</p>
            </div>
            <div className="count-start">
              <Rating
                name="half-rating-read"
                color="#46773B"
                style={{ color: '#46773B' }}
                defaultValue={review.overallQualityRating}
                readOnly
              />
            </div>
            <div className="starts">
              <div className="star">
                <p>Якість</p>
                <div className="selects">
                  {[...Array(review.overallQualityRating)].map((x, index) => (
                    <div className="select" key={index} />
                  ))}
                  {[...Array(5 - review.overallQualityRating)].map(
                    (x, index) => (
                      <div className="noSelect" key={index} />
                    )
                  )}
                </div>
              </div>
              <div className="star">
                <p>Співвідношення ціни та якості</p>
                <div className="selects">
                  {[...Array(review.valueForMoneyRating)].map((x, index) => (
                    <div className="select" key={index} />
                  ))}
                  {[...Array(5 - review.valueForMoneyRating)].map(
                    (x, index) => (
                      <div className="noSelect" key={index} />
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="texts">
              <h2>{review.title}</h2>
              <p>{review.text}</p>
            </div>
          </div>
        </div>
        <div className="date">{formatDate(review.createdAt)}</div>
      </div>
    </div>
  );
};

export default SelectReview;
