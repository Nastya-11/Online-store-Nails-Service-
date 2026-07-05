'use client';
import { Locale } from '@/i18n.config';
import React, { useState } from 'react';
import './Catalog.scss';
import RightSVG from '../../assest/Header/Right.svg';
import CatalogSVG from '../../assest/Header/Catalog.svg';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { CategoriesList } from '@/app/interfaces/Goods';
import { useRouter } from 'next/navigation';

type Props = {
  lang: Locale;
  dictionary: any;
  catalog: CategoriesList;
};

const Catalog = ({ lang, dictionary, catalog }: Props) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false); // Змінна для збереження стану

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSelectCategory(0);
    setIsHovered(false);
  };

  const [selectCategory, setSelectCategory] = useState<number>(1);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="catalog-container"
    >
      <div className="title">
        <CatalogSVG />
        {dictionary.title}
        <svg
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.29248 0.53125L4.22998 3.57812L1.16748 0.53125L0.22998 1.46875L4.22998 5.46875L8.22998 1.46875L7.29248 0.53125Z"
            fill="white"
          />
        </svg>
      </div>
      {isHovered && (
        <div className="dropdown-container">
          <div className="dropdown">
            <div className="list-category">
              {catalog.map((x) => (
                <div
                  key={x.id} // Додаємо унікальний key для списку
                  className={`category ${
                    selectCategory === x.id ? 'active' : ''
                  }`}
                  onMouseEnter={() => setSelectCategory(x.id)}
                  onClick={() => {
                    setIsHovered(false);
                    router.push(`/${lang}/goods/1?categoryId=${x.id}`);
                  }} // Оновлюємо стан підкатегорії при кліку
                >
                  <div className="svg-with-name">
                    <div
                      className="svg"
                      dangerouslySetInnerHTML={{ __html: x.svg }}
                      style={
                        {
                          //maxHeight: '30px',
                          //overflow: 'hidden',
                          //maxWidth: '30px',
                        }
                      }
                    />
                    <p>{x[`name${lang}`]}</p>
                  </div>
                  {x.subcategoryTitles.length > 0 && (
                    <div className="right">
                      <RightSVG />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {selectCategory !== 0 && (
              <div className="subcategory-details-container">
                <div className="subcategory-details">
                  {catalog.find((x) => x.id == selectCategory)
                    ?.subcategoryTitles &&
                    catalog
                      .find((x) => x.id == selectCategory)
                      ?.subcategoryTitles.map((categoryTitle) => (
                        <div
                          className="list-category-title"
                          key={`title-${categoryTitle.id}`} // Додаємо унікальний ключ для заголовка підкатегорії
                        >
                          <div
                            onClick={() => {
                              setIsHovered(false);
                              router.push(
                                `/${lang}/goods/1?categoryId=${selectCategory}&subcategoryTitleId=${categoryTitle.id}`
                              );
                            }}
                            className="title-list-category-title"
                          >
                            <span>{categoryTitle[`name${lang}`]}</span>
                          </div>
                          <div className="list-subcategories">
                            {categoryTitle.subcategories.map((subcategory) => (
                              <div className="subcategory" key={subcategory.id}>
                                <Link
                                  onClick={() => setIsHovered(false)}
                                  href={`/${lang}/goods/1?categoryId=${selectCategory}&subcategoryTitleId=${categoryTitle.id}&subcategoryId=${subcategory.id}`}
                                >
                                  {subcategory[`name${lang}`]}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
