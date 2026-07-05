'use client';
import React from 'react';
import './PriceAndBasket.scss';
import { ProductType } from '@/app/interfaces/Goods';
import { Rating } from '@mui/material';
import EmprtyStar from '../../assest/SelectGoods/EmprtyStar.svg';
import Star from '../../assest/SelectGoods/Star.svg';
import LikeSVG from '../../assest/SelectGoods/Like.svg';
import InBasket from './InBasket';
import { Locale } from '@/i18n.config';
import InLike from '../Like/InLike';
import Pencil from '../../assest/Reviews/Pencil.svg';

type Props = {
  product: ProductType;
  lang: Locale;
};

const PriceAndBasket = ({ product, lang }: Props) => {
  return (
    <div className="price-and-bakset-cont">
      <div className="review-and-avability">
        <div className="review">
          <Rating
            name="half-rating-read"
            defaultValue={0}
            value={0}
            emptyIcon={<EmprtyStar />}
            icon={<Star />}
            readOnly
          />
          <div
            className="write-review"
            onClick={() => {
              const formEl = document.getElementById('review-form');
              if (formEl) {
                formEl.scrollIntoView({ behavior: 'smooth' });
              }
              window.dispatchEvent(new CustomEvent('open-review-form'));
            }}
          >
            Написати відгук
          </div>

        </div>

        <div
          style={{ color: product.isAvaibility ? 'green' : 'red' }}
          className="avability"
        >
          {product.isAvaibility ? 'В наявності' : 'Немає в наявності'}
        </div>
      </div>

      <div className="price-and-like">
        <div className="price">{product.priceWithDiscount} грн.</div>
        <InLike
          lang={lang}
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
          }}
        >
          <div className="like">
            <LikeSVG /> <span>Додати до переліку побажань</span>
            <p>У переліку побажань</p>
          </div>
        </InLike>
      </div>

      <div className="line" />

      <div className="in-basket">
        <InBasket product={product} lang={lang} />
      </div>
    </div>
  );
};


export default PriceAndBasket;
