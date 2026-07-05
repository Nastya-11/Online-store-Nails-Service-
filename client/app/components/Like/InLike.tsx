'use client';
import React, { useEffect, useState } from 'react';
import './InLike.scss';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n.config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ProductLikeType } from '@/app/interfaces/Goods';
import { AddToLike } from '@/app/functions/like';
import { addProductInLike } from '@/app/store/reducers/likeSlice';

type Props = {
  children: any;
  product: ProductLikeType;
  lang: Locale;
};

const InLike = ({ children, product, lang }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { listLike } = useSelector((state: RootState) => state.like);
  const [isInLike, setIsInLike] = useState(true);

  const inLike = async () => {
    if (isInLike) {
      router.push(`/${lang}/liked`);
      return;
    }
    if (await AddToLike(isAuthenticated, product)) {
      dispatch(addProductInLike({ productLike: product }));
    }
  };

  useEffect(() => {
    setIsInLike(listLike.some((x) => x.id == product.id));
  }, [listLike]);

  return (
    <div
      className={`in-like-cont ${isInLike && 'in-like-true'}`}
      onClick={(e) => {
        e.preventDefault();
        inLike();
      }}
    >
      {children}
    </div>
  );
};

export default InLike;
