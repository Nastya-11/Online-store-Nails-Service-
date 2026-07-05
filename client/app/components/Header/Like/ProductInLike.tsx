import { ProductBasketType, ProductLikeType } from '@/app/interfaces/Goods';
import { Locale } from '@/i18n.config';
import React from 'react';
import './ProductInBasket.scss';
import Link from 'next/link';
import Image from 'next/image';
import DeleteSVG from '../../../assest/delete.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { delProductInLike } from '@/app/functions/like';
import { removeProductFromLike } from '@/app/store/reducers/likeSlice';

type Props = {
  product: ProductLikeType;
  lang: Locale;
  close: any;
};

const ProductInLike = ({ product, lang, close }: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { listLike } = useSelector((state: RootState) => state.like);
  const dispatch = useDispatch();
  const del = async () => {
    if (listLike.length == 1) close();
    if (await delProductInLike(isAuthenticated, product.id)) {
      dispatch(removeProductFromLike({ id: product.id }));
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
              <div className="count">1 шт.</div>
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

export default ProductInLike;
