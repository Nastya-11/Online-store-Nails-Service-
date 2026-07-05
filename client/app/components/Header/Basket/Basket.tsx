'use client';
import React, { useState, useEffect, useRef } from 'react';
import BasketSVG from '../../../assest/Header/Basket.svg';
import './Basket.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setBasket } from '@/app/store/reducers/basketSlice';
import { getBasket } from '@/app/functions/basket';
import { Locale } from '@/i18n.config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductInBasket from './ProductInBasket';

type Props = {
  dictionary: any;
  lang: Locale;
};

const Basket = ({ dictionary, lang }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const basketRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { listBasket } = useSelector((state: RootState) => state.basket);

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

  const getBas = async () => {
    const basket = await getBasket(isAuthenticated);
    dispatch(setBasket({ newBasket: basket }));
  };

  useEffect(() => {
    getBas();
  }, [isAuthenticated]);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    let res = 0;
    listBasket.forEach((x) => (res += x.count * x.priceWithDiscount));

    setSum(Math.floor(res * 100) / 100);
  }, [listBasket]);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="basket-container"
      onMouseLeave={() => setIsOpen(false)}
      ref={basketRef}
    >
      <div className="title" onMouseEnter={() => setIsOpen(true)}>
        <BasketSVG />
        {listBasket.length > 0 && (
          <div className="count">{listBasket.length}</div>
        )}
      </div>
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        {listBasket.length == 0 ? (
          <div className="empty">
            <p>{dictionary.empty.title}</p>
            <span>{dictionary.empty.description}</span>
          </div>
        ) :
        (
          <div className="list-basket-cont">
            <h2>Кошик</h2>
            <div className="list-basket-list">
              {listBasket.map((x) => (
                <ProductInBasket
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
              <button
                onClick={() => {
                  close();
                  router.push(`/${lang}/make-order`);
                }}
              >
                Оформити замовлення
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;

