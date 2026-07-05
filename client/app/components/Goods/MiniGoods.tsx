import { Product } from '@/app/interfaces/Goods';
import React from 'react';
import './MiniGoods.scss';
import Image from 'next/image';
import Like from '../../assest/Goods/Like.svg';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import Rating from '@mui/material/Rating';
import InBasket from './InBasket';
import InLike from '../Like/InLike';

type Props = {
  goods: Product;
  dictionary: any;
  lang: Locale;
};

const MiniGoods = ({ goods, dictionary, lang }: Props) => {
  return (
    <Link
      href={`/${lang}/select-goods/${goods.id}`}
      className="mini-goods-container"
    >
      <div className="mini-goods">
        <div className="is-hit-and-like">
          <div className="is-hit-is-discount">
            {goods.discount > 0 && (
              <div className="discount">{dictionary.discount}</div>
            )}
            {goods.isHit && <div className="hit">{dictionary.hit}</div>}
            {goods.isNovetly && (
              <div className="novetly">{dictionary.novetly}</div>
            )}
          </div>
          <InLike
            product={{
              id: goods.id,
              nameuk: goods.nameuk,
              nameru: goods.nameru,
              price: goods.price,
              discount: goods.discount,
              priceWithDiscount: goods.priceWithDiscount,
              timeDiscount: goods.timeDiscount,
              isAvaibility: goods.isAvaibility,
              isHit: goods.isHit,
              isNovetly: goods.isNovetly,
              cod: goods.cod,
              review: goods.review,
              imgs: goods.imgs,
            }}
            lang={lang}
          >
            <div className="like">
              <Like />{' '}
            </div>
          </InLike>
          {/*тимчасово */}
        </div>
        <div className="img-container">
          <Image
            src={
              process.env.NEXT_PUBLIC_SERVER +
              (goods.imgs.length > 0
                ? goods.imgs[0].img
                : '02d63fb17c39c0425b76eea5d879809e.jpeg')
            }
            fill
            alt={goods[`name${lang}`]}
          />
        </div>
        <div className="text">
          <h3>{goods[`name${lang}`]}</h3>
        </div>
        <div className="rating-with-avaibility">
          <div className="rating">
            <Rating
              name="half-rating-read"
              defaultValue={5} //тимчасово
              precision={0.1}
              readOnly
              sx={{ width: 200 }}
            />
          </div>
          {goods.isAvaibility ? (
            <div className="avaibility is-avaibility">
              {dictionary.avaibility}
            </div>
          ) : (
            <div className="avaibility no-avaibility">
              {dictionary.noAvability}
            </div>
          )}
        </div>
        <div className="price-with-basket">
          <div className="price">
            {goods.discount != 0 && (
              <div className="price-no-discount-and-discount">
                <div className="price-no-disco">{goods.price} грн</div>
                <div className="disco">{goods.discount}%</div>
              </div>
            )}{' '}
            <div className="prict-with-disc">{goods.priceWithDiscount} грн</div>
          </div>
          <InBasket
            product={goods}
            goodsId={goods.id}
            title={dictionary.buy}
            titleInBasket={dictionary.inBasket}
            lang={lang}
          />
        </div>
      </div>
    </Link>
  );
};

export default MiniGoods;
