import { Locale } from '@/i18n.config';
import React from 'react';
import '../SelectGoods.scss';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';
import { notFound } from 'next/navigation';
import { ProductPageResponseType } from '@/app/interfaces/Goods';
import Galery from '@/app/components/SelectGoods/Galery';
import PriceAndBasket from '@/app/components/SelectGoods/PriceAndBasket';
import AdditionallInfo from '@/app/components/SelectGoods/AdditionallInfo';
import ListCategoriesProducts from '@/app/components/SelectGoods/ListCategoriesProducts';
import InBasket from '@/app/components/SelectGoods/InBasket';
import DescriptionOrReviews from '@/app/components/SelectGoods/DescriptionOrReviews';
import RelatedProducts from '@/app/components/SelectGoods/RelatedProducts';
import { getDictionary } from '@/lib/dictionary';
import ListAdvantages from '@/app/components/Home/ListAdvantages';

const timeRevalidate: number = process.env.NEXT_PUBLIC_TIME_REVALIDATE
  ? parseInt(process.env.NEXT_PUBLIC_TIME_REVALIDATE)
  : 3600;

type Props = {
  params: { lang: Locale; id: string };
};

const getData = async (id: number) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_SERVER + `product/getProduct/${id}`,
      { next: { revalidate: timeRevalidate } }
    );
    if (!res.ok) {
      throw new Error(`Помилка отримання товара: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    return notFound();
  }
};

const page = async ({ params }: Props) => {
  let id;
  if (isNaN(parseInt(params.id))) return notFound();
  else id = parseInt(params.id);
  const {
    product,
    relatedProducts,
    filterCategories,
    reviews,
  }: ProductPageResponseType = await getData(id);

  const { miniGoods } = await getDictionary(params.lang);

  return (
    <>
      <div className="select-goods-container">
        <BreadCrumbs
          lang={params.lang}
          listUrls={[
            {
              name: product.category[`name${params.lang}`],
              url: `/goods/1?categoryId=${product.categoryId}`,
            },
            ...(product.subcategoryTitle
              ? [
                  {
                    name: product.subcategoryTitle[`name${params.lang}`],
                    url: `/goods/1?categoryId=${product.categoryId}
                    &subcategoryTitleId=${product.subcategoryTitle.id}`,
                  },
                ]
              : []),
            ...(product.subcategory
              ? [
                  {
                    name: product.subcategory[`name${params.lang}`],
                    url: `/goods/1?categoryId=${product.categoryId}
                    &subcategoryTitleId=${product.subcategoryTitle?.id}
                    &subcategoryId=${product.subcategory.id}`,
                  },
                ]
              : []),
            {
              name: product[`name${params.lang}`],
              url: `#`,
            },
          ]}
        />
        <div className="line" />
        <div className="product-page">
          <div className="product-name">
            <h1>{product[`name${params.lang}`]}</h1>
            <div className="cod-and-avability">
              <div className="cod">Код: {product.cod}</div>
              <div
                className="avability"
                style={{ color: product.isAvaibility ? 'green' : 'red' }}
              >
                {product.isAvaibility ? 'В наявності' : 'Немає в наявності'}
              </div>
            </div>
          </div>
          <div className="product-gallery">
            <Galery name={product[`name${params.lang}`]} imgs={product.imgs} />
          </div>
          <div className="product-info">
            <div className="product-price-actions">
              <PriceAndBasket lang={params.lang} product={product} />
            </div>
            <div className="product-details">
              <AdditionallInfo />
            </div>
            <div className="in-basket-mob">
              <InBasket product={product} lang={params.lang} />
            </div>
            <div className="product-advantages">
              <ListCategoriesProducts
                lang={params.lang}
                brendName={product.brend[`name${params.lang}`]}
                countryMade={product.countryMade[`name${params.lang}`]}
                filter={filterCategories}
              />
            </div>
          </div>
          <div className="product-description-or-reviews">
            <DescriptionOrReviews
              productId={product.id}
              productName={product[`name${params.lang}`]}
              description={product[`description${params.lang}`]}
              reviews={reviews}
            />
          </div>
        </div>
        <RelatedProducts
          lang={params.lang}
          miniGoods={miniGoods}
          relatedProducts={relatedProducts}
        />
      </div>{' '}
      <ListAdvantages lang={params.lang} />
    </>
  );
};

export default page;

