import Image from 'next/image';
import React from 'react';
import './Discount.scss';

type Props = {
  discount: {
    id: number;
    img: string;
    name: string;
    dateStart: string;
    dateFinish: string;
  };
  itemWidth: number | null;
  dictionary: any;
};

const calculateDaysRemaining = (dateFinish: string): number => {
  const finishDate = new Date(dateFinish.split('.').reverse().join('-'));
  const today = new Date();
  const diffTime = finishDate.getTime() - today.getTime();
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
};

const Discount = ({ discount, itemWidth, dictionary }: Props) => {
  return (
    <div
      key={discount.id}
      className="discount-cont"
      style={{ minWidth: itemWidth ? itemWidth : 'unset' }}
    >
      <Image
        width={250}
        height={250}
        alt={discount.name}
        src={process.env.NEXT_PUBLIC_SERVER + discount.img}
      />
      <div className="text">
        <div className="remaning">
          <span>{dictionary.remaining}</span>
          <p>{calculateDaysRemaining(discount.dateFinish)}</p>
          <span>{dictionary.days}</span>
        </div>
        <div className="info">
          <div className="name">{discount.name}</div>
          <div className="description">
            з {discount.dateStart} до {discount.dateFinish}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
