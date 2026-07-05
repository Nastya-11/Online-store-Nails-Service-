'use client';

import React from 'react';
import CategoryMenu from './CategoryMenu';
import './Filter.scss';
import { Locale } from '@/i18n.config';
import BrandsFilter from './BrandsFilter';
import CountryMadeFilter from './CountryMadeFilter';
import PriceFilter from './PriceFilter';
import {
  Brand,
  Category,
  Country,
  FilterCategoryType,
} from '@/app/interfaces/Goods';
import FilterCategory from './FilterCategory';

type SearchParams = {
  categoryId?: string;
  subcategoryTitleId?: string;
  subcategoryId?: string;
  brendId?: string;
  countryMadeId?: string;
  minPrice?: string;
  maxPrice?: string;
  filters?: string;
  limit?: string;
};

type Props = {
  lang: Locale;
  searchParams: SearchParams;
  categories: Category[];
  brands: Brand[];
  countries: Country[];
  page: string;
  filterCategories: FilterCategoryType[];
  minPrice: number;
  maxPrice: number;
};

const Filter = ({
  lang,
  searchParams,
  categories,
  brands,
  countries,
  page,
  filterCategories,
  minPrice,
  maxPrice,
}: Props) => {
  return (
    <div className="filter-container">
      <div className="title-filter">
        <div className="title-filter-text">Фільтри товарів</div>
      </div>
      {/* Додаємо компонент для додаткових фільтрів */}
      {filterCategories && filterCategories.length > 0 && (
        <FilterCategory
          lang={lang}
          filterCategories={filterCategories}
          searchParams={searchParams}
        />
      )}
      <CategoryMenu page={page} lang={lang} categories={categories} />
      <BrandsFilter lang={lang} brands={brands} searchParams={searchParams} />
      <CountryMadeFilter
        lang={lang}
        countries={countries}
        searchParams={searchParams}
      />
      <PriceFilter
        lang={lang}
        searchParams={searchParams}
        minLimit={minPrice}
        maxLimit={maxPrice}
      />
    </div>
  );
};

export default Filter;
