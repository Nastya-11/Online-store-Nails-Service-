'use client';
import { FilterCategoryType } from '@/app/interfaces/Goods';
import React from 'react';
import './ListCategoriesProducts.scss';
import { Locale } from '@/i18n.config';

type Props = {
  filter: FilterCategoryType[];
  brendName: string;
  countryMade: string;
  lang: Locale;
};

const ListCategoriesProducts = ({
  filter,
  brendName,
  countryMade,
  lang,
}: Props) => {
  return (
    <div className="list-product-categories-cont">
      <div className="filter">
        <span>Бренд</span>
        <div className="border" />
        <p>{brendName}</p>
      </div>
      <div className="filter">
        <span>Країна виробник</span>
        <div className="border" />
        <p>{countryMade}</p>
      </div>
      {filter.map(
        (x) =>
          x.productCategoryFilters[0] &&
          x.productCategoryFilters[0].valueuk && (
            <div key={x.id} className="filter">
              <span>{x[`name${lang}`]}</span>
              <div className="border" />
              <p>
                {lang === 'uk'
                  ? x.productCategoryFilters[0].valueuk
                  : x.productCategoryFilters[0].valueru}
              </p>
            </div>
          )
      )}

    </div>
  );
};

export default ListCategoriesProducts;
