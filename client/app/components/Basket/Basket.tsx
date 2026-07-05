'use client';
import { Locale } from '@/i18n.config';
import React, { useState } from 'react';
import EmptyLikeOrBasket from '../utils/EmptyLikeOrBasket';
import ProductList from '../Goods/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Link from 'next/link';
import DeleteSVG from '../../assest/delete.svg';
import { setBasket } from '@/app/store/reducers/basketSlice';
import { $authHost } from '@/app/http';

type Props = {
  lang: Locale;
  miniGoods: any;
};

const Basket = ({ lang, miniGoods }: Props) => {
  const { listBasket }: any = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const clear = async () => {
    if (isAuthenticated) {
      await $authHost.post('basketAndLike/clearBasket');
    } else {
      localStorage.removeItem('basket');
    }
    dispatch(setBasket({ newBasket: [] }));
  };

  return (
    <div className="basket-container">
      {listBasket.length == 0 ? (
        <EmptyLikeOrBasket lang={lang} />
      ) : (
        <>
          <ProductList
            lang={lang}
            dictrionaryMiniGoods={miniGoods}
            products={listBasket}
          />

          <div className="empty-down-block">
            <button onClick={clear} className="form-order">
              <DeleteSVG /> Очистити
            </button>
            <button>
              <Link className="form-order" href={`/${lang}/make-order`}>
                Оформити замовлення
              </Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;

