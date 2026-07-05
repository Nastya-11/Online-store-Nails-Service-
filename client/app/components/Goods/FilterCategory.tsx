'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './FilterCategory.scss';
import { Locale } from '@/i18n.config';
import { FilterCategoryType } from '@/app/interfaces/Goods';

type SearchParams = {
  filters?: string;
};

type Props = {
  lang: Locale;
  filterCategories: FilterCategoryType[];
  searchParams: SearchParams;
};

const FilterCategory = ({ lang, filterCategories, searchParams }: Props) => {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  // Парсимо поточні фільтри з URL
  const currentFilters: Record<number, string[]> = searchParams.filters
    ? JSON.parse(decodeURIComponent(searchParams.filters))
    : {};

  // Функція зміни стану чекбоксів та оновлення URL
  const toggleFilter = (categoryId: number, filterValue: string) => {
    const params = new URLSearchParams(searchParams as any);
    let updatedFilters = { ...currentFilters };

    // Якщо у категорії ще немає фільтрів, додаємо новий масив
    if (!updatedFilters[categoryId]) {
      updatedFilters[categoryId] = [filterValue];
    } else {
      const index = updatedFilters[categoryId].indexOf(filterValue);
      if (index === -1) {
        updatedFilters[categoryId].push(filterValue);
      } else {
        updatedFilters[categoryId].splice(index, 1);
      }

      // Якщо після видалення масив порожній, прибираємо категорію
      if (updatedFilters[categoryId].length === 0) {
        delete updatedFilters[categoryId];
      }
    }

    // Якщо немає фільтрів — видаляємо параметр `filters`
    if (Object.keys(updatedFilters).length > 0) {
      params.set('filters', encodeURIComponent(JSON.stringify(updatedFilters)));
    } else {
      params.delete('filters');
    }

    // Оновлення URL без перезавантаження сторінки
    router.push(`/${lang}/goods/1?${decodeURIComponent(params.toString())}`, {
      scroll: false,
    });
  };

  return (
    <div className="filter-category">
      {filterCategories.map((category) => (
        <div key={category.id} className="category-section">
          <button
            className="category-title"
            onClick={() =>
              setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )
            }
          >
            <span>{lang === 'ru' ? category.nameru : category.nameuk}</span>
          </button>

          {expandedCategory === category.id && (
            <div className="category-options">
              {category.productCategoryFilters.map((filter) =>
                filter.valueuk && filter.valueru ? (
                  <label key={filter.valueuk} className="filter-option">
                    <input
                      type="checkbox"
                      checked={
                        currentFilters[category.id]?.includes(filter.valueuk) ??
                        false
                      }
                      onChange={() => toggleFilter(category.id, filter.valueuk)}
                    />
                    {lang === 'ru' ? filter.valueru : filter.valueuk}
                  </label>
                ) : null
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterCategory;
