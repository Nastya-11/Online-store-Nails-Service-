import { ProductBasketType } from '@/app/interfaces/Goods';
import { Locale } from '@/i18n.config';
import React from 'react';
import './ProductInBasket.scss';
import Link from 'next/link';
import Image from 'next/image';
import DeleteSVG from '../../../assest/delete.svg';
import MinusSVG from '../../../assest/minus.svg';
import PlusSVG from '../../../assest/plus.svg';
import { delProductInBasket, setCountBasket } from '@/app/functions/basket';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {
  removeProductFromBasket,
  setCntBasket,
} from '@/app/store/reducers/basketSlice';

type Props = {
  product: ProductBasketType;
  lang: Locale;
  close: any;
};

const ProductInBasket = ({ product, lang, close }: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { listBasket } = useSelector((state: RootState) => state.basket);
  const dispatch = useDispatch();
  const minus = async () => {
    if (product.count == 1) return;
    if (await setCountBasket(isAuthenticated, product.id, product.count - 1)) {
      dispatch(
        setCntBasket({ productId: product.id, count: product.count - 1 })
      );
    }
  };
  const plus = async () => {
    if (await setCountBasket(isAuthenticated, product.id, product.count + 1)) {
      dispatch(
        setCntBasket({ productId: product.id, count: product.count + 1 })
      );
    }
  };
  const del = async () => {
    if (listBasket.length == 1) close();
    if (await delProductInBasket(isAuthenticated, product.id)) {
      dispatch(removeProductFromBasket({ id: product.id }));
    }
  };
  return (
    <Link
      href={`/${lang}/select-goods/${product.id}`}
      className="product-in-basket"
    >
      <div className="product-in-basket-cont">
        <div className="img">
          <Image
            height={82}
            alt={product[`name${lang}`]}
            width={82}
            src={process.env.NEXT_PUBLIC_SERVER + product.imgs[0].img}
          />
        </div>

        <div className="text">
          <div className="name">{product[`name${lang}`]}</div>
          <div className="buttons-with-price-and-count">
            <div className="button-and-count">
              <div className="buttons" onClick={(e) => e.preventDefault()}>
                <div className="but but-minus" onClick={minus}>
                  <MinusSVG />
                </div>
                <div className="but-count">{product.count}</div>
                <div className="but but-plus" onClick={plus}>
                  <PlusSVG />
                </div>
              </div>
              <div className="count">{product.count} шт.</div>
            </div>
            <div className="price-cont">
              {product.discount != 0 && (
                <div className="price">{product.price} ₴</div>
              )}
              <div className="price-with-dicount">
                {product.priceWithDiscount} ₴
              </div>
            </div>
          </div>
        </div>
        <div
          className="delete"
          onClick={(e) => {
            e.preventDefault();
            del();
          }}
        >
          <DeleteSVG />
        </div>
      </div>
    </Link>
  );
};

export default ProductInBasket;

