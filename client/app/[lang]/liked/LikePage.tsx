'use client';
import { Locale } from '@/i18n.config';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Link from 'next/link';
import DeleteSVG from '../../assest/delete.svg';
import { $authHost } from '@/app/http';
import EmptyLikeOrBasket from '@/app/components/utils/EmptyLikeOrBasket';
import ProductList from '@/app/components/Goods/ProductList';
import { setLikeList } from '@/app/store/reducers/likeSlice';

type Props = {
  lang: Locale;
  miniGoods: any;
};

const LikePage = ({ lang, miniGoods }: Props) => {
  const { listLike }: any = useSelector((state: RootState) => state.like);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const clear = async () => {
    if (isAuthenticated) {
      await $authHost.post('basketAndLike/clearLike');
    } else {
      localStorage.removeItem('like');
    }
    dispatch(setLikeList([]));
  };

  return (
    <div className="basket-container">
      {listLike.length == 0 ? (
        <EmptyLikeOrBasket lang={lang} />
      ) : (
        <>
          <ProductList
            lang={lang}
            dictrionaryMiniGoods={miniGoods}
            products={listLike}
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

export default LikePage;
