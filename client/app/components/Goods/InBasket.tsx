'use client';
import React, { useState } from 'react';
import BasketSVG from '../../assest/Goods/Basket.svg';
import InBas from '../Basket/InBas';
import { Product } from '@/app/interfaces/Goods';
import { Locale } from '@/i18n.config';

type Props = {
  goodsId: number;
  title: string;
  titleInBasket: string;
  product: Product;
  lang: Locale;
};

const InBasket = ({ goodsId, title, titleInBasket, product, lang }: Props) => {
  const [count, setCount] = useState(1);
  const minus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (count > 1) setCount(count - 1);
  };
  const plus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setCount(count + 1);
  };
  const inBasket = () => {};
  return (
    <div
      className="in-basket-container"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className="count-container">
        <div className="arrow minus" onClick={minus}>
          <svg
            width="10"
            height="2"
            viewBox="0 0 10 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.14457 0.0227269V1.61364H0.0536577V0.0227269H9.14457Z"
              fill="#1E1E1E"
              fill-opacity="0.5"
            />
          </svg>
        </div>
        <div className="count">{count}</div>
        <div className="arrow plus" onClick={plus}>
          <svg
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.80366 10.0057V0.630681H6.39457V10.0057H4.80366ZM0.911612 6.11364V4.52273H10.2866V6.11364H0.911612Z"
              fill="#1E1E1E"
              fill-opacity="0.5"
            />
          </svg>
        </div>
      </div>
      <InBas
        product={{
          id: product.id,
          nameuk: product.nameuk,
          nameru: product.nameru,
          price: product.price,
          discount: product.discount,
          priceWithDiscount: product.priceWithDiscount,
          timeDiscount: product.timeDiscount,
          isAvaibility: product.isAvaibility,
          isHit: product.isHit,
          isNovetly: product.isNovetly,
          cod: product.cod,
          review: product.review,
          imgs: product.imgs,
          count: 1,
        }}
        lang={lang}
      >
        <button onClick={inBasket}>
          <BasketSVG />
          <span>{title}</span>
          <p>{titleInBasket}</p>
        </button>
      </InBas>
    </div>
  );
};

export default InBasket;
