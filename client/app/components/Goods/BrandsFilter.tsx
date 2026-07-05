'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import './BrandsFilter.scss';
import { Locale } from '@/i18n.config';

type Brand = {
  id: number;
  nameuk: string;
  nameru: string;
};

type Props = {
  brands: Brand[];
  searchParams: { brendId?: string };
  lang: Locale;
};

const BrandsFilter = ({ brands, searchParams, lang }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentBrends = searchParams.brendId
    ? searchParams.brendId.split(',')
    : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [showFullList, setShowFullList] = useState(false); // Стан для розгортання брендів

  const toggleBrand = (brandId: string) => {
    const params = new URLSearchParams(searchParams as any);
    let updatedBrends = [...currentBrends];

    if (updatedBrends.includes(brandId)) {
      updatedBrends = updatedBrends.filter((id) => id !== brandId);
    } else {
      updatedBrends.push(brandId);
    }

    if (updatedBrends.length > 0) {
      params.set('brendId', updatedBrends.join(',')); // Використовуємо `,` як роздільник
    } else {
      params.delete('brendId');
    }

    router.push(`/${lang}/goods/1?${decodeURIComponent(params.toString())}`, {
      scroll: false,
    });
  };

  // Фільтрація брендів за введеним текстом (з урахуванням обох мов)
  const filteredBrands = brands.filter((brand) => {
    const searchRegex = new RegExp(searchTerm, 'i'); // Регулярка для нечутливого до регістру пошуку
    return searchRegex.test(brand.nameuk) || searchRegex.test(brand.nameru);
  });

  // Відображати лише перші 10 брендів, якщо `showFullList === false`
  const visibleBrands = showFullList
    ? filteredBrands
    : filteredBrands.slice(0, 10);
  useEffect(() => {
    if (searchParams.brendId) setShowAll(true);
    else setShowAll(false);
  }, [searchParams]);

  return (
    <div className="brands-filter">
      {/* Заголовок брендів */}
      <div className="brands-header">
        <h4>Бренд</h4>
        <button
          className="toggle-button"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? '−' : '+'}
        </button>
      </div>

      {/* Якщо showAll === false, весь контент прихований */}
      {showAll && (
        <div className="show-all-container">
          {/* Поле пошуку */}
          <input
            type="text"
            className="brand-search"
            placeholder="Пошук"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Список брендів */}
          <div className="brands-list">
            {visibleBrands.map((brand) => (
              <label key={brand.id} className="brand-item">
                <input
                  type="checkbox"
                  checked={currentBrends.includes(String(brand.id))}
                  onChange={() => toggleBrand(String(brand.id))}
                />
                {lang === 'ru' ? brand.nameru : brand.nameuk}
              </label>
            ))}
          </div>

          {/* Кнопка для показу всіх брендів або згортання списку */}
          {filteredBrands.length > 10 && (
            <button
              className="show-all-btn"
              onClick={() => setShowFullList((prev) => !prev)}
            >
              {showFullList
                ? 'Сховати бренди'
                : `Показати всі (${filteredBrands.length - 10})`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandsFilter;
