'use client';
import { ProductType } from '@/app/interfaces/Goods';
import { RootState } from '@/app/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './InBasket.scss';
import Basket from '../../assest/SelectGoods/Basket.svg';
import InBas from '../Basket/InBas';
import { Locale } from '@/i18n.config';

type Props = {
  product: ProductType;
  lang: Locale;
};

const InBasket = ({ product, lang }: Props) => {
  //const {}=useSelector((state:RootState)=>)
  const [count, setCount] = useState(1);
  const minus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <div className="in-basket-container">
      <div className="count-cont">
        <div onClick={minus} className="but minus">
          <svg
            width="10"
            height="2"
            viewBox="0 0 10 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.64457 0.0227269V1.61364H0.553658V0.0227269H9.64457Z"
              fill="#1E1E1E"
              fill-opacity="0.5"
            />
          </svg>
        </div>
        <div className="count">{count}</div>
        <div className="but plus" onClick={() => setCount(count + 1)}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.30366 10.0057V0.630681H5.89457V10.0057H4.30366ZM0.411612 6.11364V4.52273H9.78661V6.11364H0.411612Z"
              fill="#1E1E1E"
              fill-opacity="0.5"
            />
          </svg>
        </div>
      </div>
      <div className="button-in-basket">
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
            count: count,
          }}
          lang={lang}
        >
          <button>
            <Basket /> <span>Купити</span> <p>У кошику</p>
          </button>
        </InBas>
      </div>
    </div>
  );
};

export default InBasket;
