'use client';
import { RelatedProductType } from '@/app/interfaces/Goods';
import React, { useEffect, useState } from 'react';
import './RelatedProducts.scss';
import RightSVG from '../../assest/SelectGoods/Right.svg';
import LeftSVG from '../../assest/SelectGoods/Left.svg';
import MiniGoods from '../Goods/MiniGoods';
import { Locale } from '@/i18n.config';

type Props = {
  relatedProducts: any[];
  miniGoods: any;
  lang: Locale;
};

const showInOnePage = 4;

const RelatedProducts = ({ relatedProducts, miniGoods, lang }: Props) => {
  const [idxgoods, setIdxgoods] = useState<number>(0);

  const right = () => {
    if (relatedProducts.length / 4 != idxgoods + 1) setIdxgoods(idxgoods + 1);
  };

  const left = () => {
    if (idxgoods != 0) setIdxgoods(idxgoods - 1);
  };

  return (
    <div className="related-product-type-cont">
      <h2 className="title">Можливо Вас це зацікавить</h2>
      <div className="list-goods-cont">
        {idxgoods != 0 && (
          <div className="arrow1 left1" onClick={left}>
            <LeftSVG />
          </div>
        )}
        <div className="list-goods">
          {relatedProducts
            .slice(idxgoods * 4, (idxgoods + 1) * 4)
            .map((x: any) => (
              <MiniGoods
                key={x.id}
                lang={lang}
                goods={x}
                dictionary={miniGoods}
              />
            ))}
        </div>
        {relatedProducts.length / 4 != idxgoods + 1 && (
          <div className="arrow1 right1" onClick={right}>
            <RightSVG />
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
