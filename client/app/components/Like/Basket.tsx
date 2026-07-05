'use client';
import { Locale } from '@/i18n.config';
import Link from 'next/link';
import React, { useState } from 'react';
import EmptyLikeOrBasket from '../utils/EmptyLikeOrBasket';

type Props = {
  lang: Locale;
};

const Basket = ({ lang }: Props) => {
  const [basketEmpty, setBasketEmpty] = useState(true);

  return (
    <div className="basket-container">
      {basketEmpty ? <EmptyLikeOrBasket lang={lang} /> : <></>}
    </div>
  );
};

export default Basket;
