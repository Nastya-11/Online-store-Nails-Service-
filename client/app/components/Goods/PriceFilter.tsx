'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './PriceFilter.scss';
import { Locale } from '@/i18n.config';
import Slider from '@mui/material/Slider';

type Props = {
  lang: Locale;
  searchParams: { minPrice?: string; maxPrice?: string; page?: string };
  minLimit: number;
  maxLimit: number;
};

const PriceFilter = ({ lang, searchParams, minLimit, maxLimit }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isShow, setIsShow] = useState(false);

  // Ініціалізація значень з `searchParams`
  const initialMin = searchParams.minPrice
    ? Math.max(minLimit, Number(searchParams.minPrice))
    : minLimit;
  const initialMax = searchParams.maxPrice
    ? Math.min(maxLimit, Number(searchParams.maxPrice))
    : maxLimit;

  const [value, setValue] = useState<number[]>([initialMin, initialMax]);

  // Функція для оновлення URL при зміні значення
  const updateURL = (newMinPrice: number, newMaxPrice: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set('minPrice', newMinPrice.toString());
    params.set('maxPrice', newMaxPrice.toString());

    // НЕ змінюємо `page`, якщо воно є в URL
    router.push(`/${lang}/goods/1?${decodeURIComponent(params.toString())}`, {
      scroll: false,
    });
  };

  // Обробка зміни значень у полях вводу
  const handleInputChange = (index: number, newValue: string) => {
    const numericValue = Number(newValue);
    if (isNaN(numericValue)) return;

    setValue((prev) => {
      const updated = [...prev];
      updated[index] = numericValue;
      updateURL(updated[0], updated[1]); // Оновлення URL при зміні
      return updated;
    });
  };

  // Обробка зміни значень через слайдер
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    updateURL((newValue as number[])[0], (newValue as number[])[1]); // Оновлення URL при зміні
  };

  return (
    <div className="price-filter">
      <div onClick={() => setIsShow(!isShow)} className="price-header">
        <h4>Ціна</h4>
        <button className="toggle-button">{isShow ? '−' : '+'}</button>
      </div>

      {isShow && (
        <>
          <div className="price-inputs">
            <input
              type="number"
              value={value[0]}
              min={minLimit}
              max={value[1]}
              onChange={(e) => handleInputChange(0, e.target.value)}
            />
            <span>грн - </span>
            <input
              type="number"
              value={value[1]}
              min={value[0]}
              max={maxLimit}
              onChange={(e) => handleInputChange(1, e.target.value)}
            />
            <span>грн</span>
          </div>

          <div className="price-slider">
            <Slider
              value={value}
              min={minLimit}
              max={maxLimit}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
            />
          </div>

          <div className="price-range-values">
            <span>{minLimit} грн</span>
            <span>{maxLimit} грн</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceFilter;
