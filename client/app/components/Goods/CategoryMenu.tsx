'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import RightSVG from '../../assest/Header/Right.svg';
import './CategoryMenu.scss';
import { Locale } from '@/i18n.config';

type Category = {
  id: number;
  nameuk: string;
  nameru: string;
  svg: string;
  subcategoryTitles: {
    id: number;
    nameuk: string;
    nameru: string;
    subcategories: {
      id: number;
      nameuk: string;
      nameru: string;
    }[];
  }[];
};

type Props = {
  categories: Category[];
  lang: Locale;
  page: string; // Додаємо page до Props
};

const CategoryMenu = ({ categories, lang, page }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedCategoryId = searchParams.get('categoryId');
  const selectedTitleId = searchParams.get('subcategoryTitleId');
  const selectedSubcategoryId = searchParams.get('subcategoryId');

  // Оновлення URL при виборі категорії, тайтлу або підкатегорії
  const updateParams = (
    key: string,
    value: string | null,
    clearKeys: string[] = []
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Видаляємо додаткові ключі, якщо вони вказані
    clearKeys.forEach((clearKey) => params.delete(clearKey));

    // Оновлюємо посилання повністю
    router.push(`/${lang}/goods/1?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="category-menu">
      {categories.map((category) => {
        const isCategorySelected = selectedCategoryId === String(category.id);

        return (
          <div key={category.id} className="category">
            <button
              className={`category-btn ${isCategorySelected ? 'active' : ''}`}
              onClick={() => {
                updateParams(
                  'categoryId',
                  isCategorySelected ? null : String(category.id),
                  ['subcategoryTitleId', 'subcategoryId', 'filters'] // При виборі категорії очищаємо інші фільтри
                );
              }}
            >
              <div
                className="svg"
                dangerouslySetInnerHTML={{ __html: category.svg }}
              />
              {lang === 'ru' ? category.nameru : category.nameuk}
              {category.subcategoryTitles.length > 0 ? (
                <RightSVG className="icon" />
              ) : (
                <div style={{ marginLeft: 'auto' }}>&nbsp; </div>
              )}
            </button>

            {/* Тайтли підкатегорій (відкриваються якщо вибрана категорія) */}
            {isCategorySelected &&
              category.subcategoryTitles.map((title) => {
                const isTitleSelected = selectedTitleId === String(title.id);

                return (
                  <div key={title.id} className="subcategory-title">
                    <button
                      className={`title-btn ${isTitleSelected ? 'active' : ''}`}
                      onClick={() =>
                        updateParams(
                          'subcategoryTitleId',
                          isTitleSelected ? null : String(title.id),
                          ['subcategoryId'] // При виборі тайтлу очищаємо підкатегорію
                        )
                      }
                    >
                      {lang === 'ru' ? title.nameru : title.nameuk}
                      {title.subcategories.length > 0 && (
                        <RightSVG className="icon" />
                      )}
                    </button>

                    {/* Підкатегорії (відкриваються якщо вибраний тайтл) */}
                    {isTitleSelected &&
                      title.subcategories.map((sub) => {
                        const isSubcategorySelected =
                          selectedSubcategoryId === String(sub.id);

                        return (
                          <button
                            key={sub.id}
                            className={`subcategory-btn ${
                              isSubcategorySelected ? 'active' : ''
                            }`}
                            onClick={() =>
                              updateParams(
                                'subcategoryId',
                                isSubcategorySelected ? null : String(sub.id)
                              )
                            }
                          >
                            {lang === 'ru' ? sub.nameru : sub.nameuk}
                          </button>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryMenu;
