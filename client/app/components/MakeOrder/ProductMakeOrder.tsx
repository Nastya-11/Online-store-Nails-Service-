'use client';
import { ProductBasketType } from '@/app/interfaces/Goods';
import { Locale } from '@/i18n.config';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './ProductMakeOrder.scss';

type Props = {
  product: ProductBasketType;
  lang: Locale;
};

const ProductMakeOrder = ({ product, lang }: Props) => {
  return (
    <div className="product-make-order">
      <div className="img">
        <Image
          src={process.env.NEXT_PUBLIC_SERVER + product.imgs[0].img}
          alt={product[`name${lang}`]}
          width={100}
          height={100}
        />
      </div>

      <div className="text">
        <div className="name-and-cod">
          <div className="name-prod">{product[`name${lang}`]}</div>
          <div className="cod">Код: {product.cod}</div>
        </div>
        <div className="info-for-product">
          <div className="price-one">
            <p>Ціна одиниці</p>
            <div className="price-with-discount">
              {product.priceWithDiscount} грн.
            </div>
            {product.discount != 0 && (
              <div className="price-no-discount">{product.price} грн.</div>
            )}
          </div>
          <div className="count">
            {' '}
            <p>Кількість</p>
            {product.count}
          </div>
          <div className="all-sum">
            <p>Загальна ціна</p>
            <span style={{ width: '100px' }}>
              {product.priceWithDiscount * product.count} грн.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMakeOrder;
