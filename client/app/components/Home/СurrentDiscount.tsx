'use client';
import React, { useRef, useState, useEffect } from 'react';
import './CurrentDiscount.scss';
import ArrowLeftSVG from '../../assest/Home/ArrowLeft.svg';
import ArrowRightSVG from '../../assest/Home/ArrowRight.svg';
import Discount from './Discount';
import { Locale } from '@/i18n.config';
import Link from 'next/link';

type Props = {
  dictionary: any;
  lang: Locale;
};

const listDiscount = [
  {
    id: 1,
    name: '30% кешбек на Гель-лак Aurora Designer № 009',
    dateStart: '12.05.2025',
    dateFinish: '18.09.2025',
    img: '274.webp',
  },
  {
    id: 2,
    name: '10% кешбек на Твердосплавну фрезу кукурудза (Зелена)',
    dateStart: '06.04.2025',
    dateFinish: '15.09.2025',
    img: '373.webp',
  },
  {
    id: 3,
    name: '25% кешбек на Гель-лак 24 D Designer Magic Cat Eye "Котяче око" № 08',
    dateStart: '11.01.2025',
    dateFinish: '23.08.2025',
    img: '281.webp',
  },
  {
    id: 4,
    name: '20% кешбек на Набір для нарощення гелем №1',
    dateStart: '09.06.2025',
    dateFinish: '21.09.2025',
    img: '335.webp',
  },
  {
    id: 5,
    name: '10% кешбек на Світловідбивну втирку Designer (Фіолетова) №13',
    dateStart: '18.05.2025',
    dateFinish: '22.10.2025',
    img: '455.webp',
  },
  {
    id: 6,
    name: '5% кешбек на Базове покриття Smoothie Base №138 Designer (9 мл)',
    dateStart: '20.03.2025',
    dateFinish: '25.07.2025',
    img: '534.webp',
  },
  {
    id: 7,
    name: '15% кешбек на Молочну базу Potal milk base № 161 з пластівцями юкі',
    dateStart: '17.05.2025',
    dateFinish: '27.09.2025',
    img: '523.webp',
  },
  {
    id: 8,
    name: '5% кешбек на Фрезу Торнадо Полум\'я 023 Червона (Formula profi)',
    dateStart: '02.03.2025',
    dateFinish: '05.07.2025',
    img: '412.webp',
  },
];

const CurrentDiscount = ({ dictionary, lang }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(300);
  const gap = 15;

  useEffect(() => {
    const updateItemWidth = () => {
      if (listRef.current) {
        setItemWidth(
          window.innerWidth < 500 ? listRef.current.clientWidth : 300
        );
      }
    };
    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, []);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -(itemWidth + gap),
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
    }
  };

  return (
    <div className="current-discount-container">
      <div className="current-discount">
        <h2>{dictionary.title}</h2>
        <div className="list-discount" ref={listRef}>
          {listDiscount.map((x) => (
            <Discount
              key={x.id} // Додаємо унікальний key для React
              dictionary={dictionary}
              itemWidth={itemWidth}
              discount={x}
            />
          ))}
        </div>
        <div className="button-with-arrow">
          <div className="empty" />
          <div className="button">
            <Link href={`/${lang}/prom-discount/1`}>
              <button>{dictionary.title}</button>
            </Link>
          </div>
          <div className="arrows">
            <div className="left" onClick={scrollLeft}>
              <ArrowLeftSVG />
            </div>
            <div className="right" onClick={scrollRight}>
              <ArrowRightSVG />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDiscount;
