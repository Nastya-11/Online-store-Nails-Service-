import { Product } from '@/app/interfaces/Goods';
import { Locale } from '@/i18n.config';
import React from 'react';
import './ProductList.scss';
import MiniGoods from './MiniGoods';

type Props = {
  lang: Locale;
  products: Product[];
  dictrionaryMiniGoods: any;
};

const ProductList = ({ products, lang, dictrionaryMiniGoods }: Props) => {
  return (
    <div className="product-list-cont">
      {products.map((x) => (
        <MiniGoods
          dictionary={dictrionaryMiniGoods}
          key={x.id}
          lang={lang}
          goods={x}
        />
      ))}
    </div>
  );
};

export default ProductList;
