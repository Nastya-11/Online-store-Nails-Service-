import React from 'react';
import './ListGoodsHome.scss';
import MiniGoods from '../Goods/MiniGoods';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { Product } from '@/app/interfaces/Goods';

type Props = {
  title: string;
  miniGoods: Product[];
  lang: Locale;
};

const ListGoodsHome = async ({ title, miniGoods, lang }: Props) => {
  const miniGoodsDictionary = (await getDictionary(lang)).miniGoods;
  return (
    <div className="list-goods-home">
      <h2>{title}</h2>
      <div className="list-goods">
        {miniGoods.map((x, idx) => (
          <MiniGoods
            lang={lang}
            dictionary={miniGoodsDictionary}
            key={idx}
            /*тимчасово*/ goods={x}
          />
        ))}
      </div>
    </div>
  );
};

export default ListGoodsHome;
