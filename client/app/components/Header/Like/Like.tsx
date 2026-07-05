'use client';
import React, { useState, useEffect, useRef } from 'react';
import LikeSVG from '../../../assest/Header/Like.svg';
import './Like.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Locale } from '@/i18n.config';
import { useRouter } from 'next/navigation';
import { setLikeList } from '@/app/store/reducers/likeSlice';
import { delProductInLike, GetLike } from '@/app/functions/like';
import ProductInLike from './ProductInLike';
import { AddToBasket } from '@/app/functions/basket';
import { addProductInBasket } from '@/app/store/reducers/basketSlice';

type Props = {
  dictionary: any;
  lang: Locale;
};

const Like = ({ dictionary, lang }: Props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const basketRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { listLike } = useSelector((state: RootState) => state.like);
  const { listBasket } = useSelector((state: RootState) => state.basket);

  // Закривання при кліці поза basket-container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        basketRef.current &&
        !basketRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getLike = async () => {
    const like = await GetLike(isAuthenticated);
    dispatch(setLikeList(like));
  };

  useEffect(() => {
    getLike();
  }, [isAuthenticated]);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    let res = 0;
    listLike.forEach((x) => (res += x.priceWithDiscount));

    // Округлюємо вниз до сотих
    setSum(Math.floor(res * 100) / 100);
  }, [listLike]);

  const inBasket = async () => {
    for (const x of listLike) {
      let prod = { ...x, count: 1 };
      if (!listBasket.some((item) => item.id === prod.id)) {
        const added = await AddToBasket(isAuthenticated, prod);
        await delProductInLike(isAuthenticated, prod.id);
        if (added) {
          dispatch(addProductInBasket({ product: prod })); // Виправлено ключ "product"
        }
      }
    }
    dispatch(setLikeList([]));
    setIsOpen(false);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="like-container"
      onMouseLeave={() => setIsOpen(false)}
      ref={basketRef}
    >
      <div className="title" onMouseEnter={() => setIsOpen(true)}>
        <LikeSVG />
        {listLike.length > 0 && <div className="count">{listLike.length}</div>}
      </div>
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        {listLike.length == 0 ? (
          <div className="empty">
            <p>{dictionary.empty.title}</p>
            <span>{dictionary.empty.description}</span>
          </div>
        ) : (
          <div className="list-basket-cont">
            <h2>Вподобане</h2>
            <div className="list-like-list">
              {listLike.map((x) => (
                <ProductInLike
                  close={close}
                  key={x.id}
                  product={x}
                  lang={lang}
                />
              ))}
            </div>
            <div className="basket-foo">
              <div className="sum-and-title">
                <br />
                <div className="sum">{sum} ₴</div>
              </div>
              <button onClick={inBasket}>Додати у кошик</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Like;
