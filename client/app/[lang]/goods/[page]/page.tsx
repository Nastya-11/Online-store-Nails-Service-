import { Locale } from '@/i18n.config';
import React from 'react';
import '../Goods.scss';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';
import Filter from '@/app/components/Goods/Filter';
import { FilterCategoryType, Product } from '@/app/interfaces/Goods';
import ProductList from '@/app/components/Goods/ProductList';
import { getDictionary } from '@/lib/dictionary';
import Pagination from '@/app/components/utils/Pagination';
import { notFound } from 'next/navigation';
import SortAndLimit from '@/app/components/Goods/SortAndLimit';
import ShowOther from '@/app/components/Home/ShowOther';

const timeRevalidate: number = process.env.NEXT_PUBLIC_TIME_REVALIDATE
  ? parseInt(process.env.NEXT_PUBLIC_TIME_REVALIDATE)
  : 3600;

type SearchParams = {
  categoryId?: string;
  subcategoryTitleId?: string;
  subcategoryId?: string;
  brendId?: string;
  countryMadeId?: string;
  minPrice?: string;
  maxPrice?: string;
  filters?: string;
  page?: string;
  limit?: string;
};

type Props = {
  params: { lang: Locale; page: string };
  searchParams: SearchParams;
};

const getCategoriesWithTitleAndOther = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}product/categoriesWithSubcategories`,
      { next: { revalidate: timeRevalidate } }
    );

    if (!res.ok) {
      throw new Error(`Помилка отримання категорій: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getBrends = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}product/getBrend`,
      { next: { revalidate: timeRevalidate } }
    );

    if (!res.ok) {
      throw new Error(`Помилка отримання брендів: ${res.statusText}`);
    }

    return (await res.json()).res;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCountryMade = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}product/getCountryMade`,
      { next: { revalidate: timeRevalidate } }
    );
    if (!res.ok) {
      throw new Error(`Помилка отримання країн виробника: ${res.statusText}`);
    }

    return (await res.json()).res;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getProducts = async (searchParams: SearchParams, page: string) => {
  try {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    if (!searchParams.page && page) {
      params.append('page', page);
    }

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_SERVER
      }product/products?${params.toString()}`,
      { cache: 'no-cache' }
    );

    if (!res.ok) {
      throw new Error(`Помилка отримання продуктів: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return { products: [], total: 0 };
  }
};

const page = async ({ params: { lang, page }, searchParams }: Props) => {
  let pageNumber;
  if (isNaN(parseInt(page))) return notFound();
  else pageNumber = parseInt(page);
  const { pagination } = await getDictionary(lang);
  const limit =
    searchParams.limit && !isNaN(Number(searchParams.limit))
      ? Number(searchParams.limit)
      : 24;
  const categoriesWithTitleAndOther = await getCategoriesWithTitleAndOther();
  const brends = await getBrends();
  const countryMade = await getCountryMade();
  const {
    products,
    count,
    filterCategories,
    minPrice,
    maxPrice,
  }: {
    products: Product[];
    count: number;
    filterCategories: FilterCategoryType[];
    minPrice: number;
    maxPrice: number;
  } = await getProducts(searchParams, page); 
  const { miniGoods } = await getDictionary(lang);

  return (
    <div className="products-container">
      <BreadCrumbs
        lang={lang}
        listUrls={[{ name: 'Каталог', url: `/goods/${lang}` }]}
      />
      <h1>Товари</h1>
      <div className="filter-with-product">
        <div className="filt">
          <Filter
            filterCategories={filterCategories}
            categories={categoriesWithTitleAndOther}
            lang={lang}
            searchParams={searchParams}
            brands={brends}
            countries={countryMade}
            page={page}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
        <div className="products">
          <SortAndLimit lang={lang} searchParams={searchParams} />
          <ProductList
            dictrionaryMiniGoods={miniGoods}
            lang={lang}
            products={products}
          />
          <div className="pagination">
            <Pagination
              currentPage={pageNumber}
              dictionary={pagination}
              totalPages={Math.ceil(count / limit)}
              url={`/${lang}/goods/`}
              queryParams={searchParams}
              showPages={2}
            />
          </div>
        </div>
      </div>
      <div className="lider">
        <h2>ЛІДЕР З ПРОДАЖУ</h2>
        <ShowOther
          lang={lang}
          searchParams={'sort=hit'}
          dictrionaryMiniGoods={miniGoods}
        />
      </div>
    </div>
  );
};

export default page;

