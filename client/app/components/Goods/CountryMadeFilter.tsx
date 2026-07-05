'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './CountryMadeFilter.scss';
import { Locale } from '@/i18n.config';

type Country = {
  id: number;
  nameuk: string;
  nameru: string;
};

type Props = {
  countries: Country[];
  searchParams: { countryMadeId?: string };
  lang: Locale;
};

const CountryMadeFilter = ({ countries, searchParams, lang }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentCountries = searchParams.countryMadeId
    ? searchParams.countryMadeId.split(',')
    : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [showFullList, setShowFullList] = useState(false);

  const toggleCountry = (countryId: string) => {
    const params = new URLSearchParams(searchParams as any);
    let updatedCountries = [...currentCountries];

    if (updatedCountries.includes(countryId)) {
      updatedCountries = updatedCountries.filter((id) => id !== countryId);
    } else {
      updatedCountries.push(countryId);
    }

    if (updatedCountries.length > 0) {
      params.set('countryMadeId', updatedCountries.join(','));
    } else {
      params.delete('countryMadeId');
    }

    // Оновлення посилання
    router.push(`/${lang}/goods/1?${decodeURIComponent(params.toString())}`, {
      scroll: false,
    });
  };

  // Фільтрація країн за введеним текстом (з урахуванням двох мов)
  const filteredCountries = countries.filter((country) => {
    const searchRegex = new RegExp(searchTerm, 'i'); // Регулярка для нечутливого до регістру пошуку
    return searchRegex.test(country.nameuk) || searchRegex.test(country.nameru);
  });

  // Відображати лише перші 10 країн, якщо `showFullList === false`
  const visibleCountries = showFullList
    ? filteredCountries
    : filteredCountries.slice(0, 10);

  // Автовідкриття, якщо є обрані країни
  useEffect(() => {
    setShowAll(!!searchParams.countryMadeId);
  }, [searchParams]);

  return (
    <div className="countries-filter">
      <div className="countries-header">
        <h4>Країна виробник</h4>
        <button
          className="toggle-button"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? '−' : '+'}
        </button>
      </div>

      {showAll && (
        <div className="show-all-container">
          <input
            type="text"
            className="country-search"
            placeholder="Пошук"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="countries-list">
            {visibleCountries.map((country) => (
              <label key={country.id} className="country-item">
                <input
                  type="checkbox"
                  checked={currentCountries.includes(String(country.id))}
                  onChange={() => toggleCountry(String(country.id))}
                />
                {lang === 'ru' ? country.nameru : country.nameuk}
              </label>
            ))}
          </div>

          {filteredCountries.length > 10 && (
            <button
              className="show-all-btn"
              onClick={() => setShowFullList((prev) => !prev)}
            >
              {showFullList
                ? 'Сховати країни'
                : `Показати всі (${filteredCountries.length - 10})`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryMadeFilter;
