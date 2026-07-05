'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './SortAndLimit.scss';
import { Locale } from '@/i18n.config';

type Props = {
  lang: Locale;
  searchParams: { limit?: string; sort?: string };
};

const SortAndLimit = ({ lang, searchParams }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const sortOptions = [
    { value: 'new', label: 'Найновіші' },
    { value: 'hit', label: 'Лідери продажу' },
    { value: 'discount', label: 'Акції' },
    { value: 'low-high', label: 'Від дешевих до дорогих' },
    { value: 'high-low', label: 'Від дорогих до дешевих' },
    { value: `name-asc-${lang}`, label: 'По назві (А-Я)' },
    { value: `name-desc-${lang}`, label: 'По назві (Я-А)' },
  ];

  const limitOptions = [12, 24, 48, 96];

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as any);
    params.set(key, value);

    router.push(`/${lang}/goods/1?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="sort-limit-container">
      {/* Ліміт товарів */}
      <div className="limit-dropdown">
        <span>Показати:</span>
        <select
          value={searchParams.limit || '24'}
          onChange={(e) => updateParams('limit', e.target.value)}
        >
          {limitOptions.map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </select>
      </div>

      {/* Сортування */}
      <div className="sort-dropdown">
        <span>Сортувати за:</span>
        <select
          value={searchParams.sort || 'new'}
          onChange={(e) => updateParams('sort', e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortAndLimit;
