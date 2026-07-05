import React, { useEffect, useState } from 'react';
import './InBas.scss';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n.config';
import { AddToBasket } from '@/app/functions/basket';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ProductBasketType } from '@/app/interfaces/Goods';
import { addProductInBasket } from '@/app/store/reducers/basketSlice';

type Props = {
  children: any;
  product: ProductBasketType;
  lang: Locale;
};

const InBas = ({ children, product, lang }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { listBasket } = useSelector((state: RootState) => state.basket);
  const [isInBasket, setIsInBasket] = useState(true);

  const inBasket = async () => {
    if (isInBasket) {
      router.push(`/${lang}/basket`);
      return;
    }
    if (await AddToBasket(isAuthenticated, product)) {
      dispatch(addProductInBasket({ product }));
    } else alert('помилка');
  };

  useEffect(() => {
    setIsInBasket(listBasket.some((x) => x.id == product.id));
  }, [listBasket]);

  return (
    <div
      className={`in-bas-container ${isInBasket && 'in-bas'}`}
      onClick={inBasket}
    >
      {children}
    </div>
  );
};

export default InBas;

