import React from 'react';
import '../GiftCertificates.scss';
import { Locale } from '@/i18n.config';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';
import { getDictionary } from '@/lib/dictionary';
import Discount from '@/app/components/Home/Discount';
import Pagination from '@/app/components/utils/Pagination';

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

type Props = {
  params: {
    lang: Locale;
    page: string;
  };
};

const page = async ({ params: { lang, page } }: Props) => {
  const { giftCertificate, currentDiscount, pagination } =
    await getDictionary(lang);
  return (
    <div className="gift-certificates-container">
      <BreadCrumbs
        lang={lang}
        listUrls={[{ name: giftCertificate.title, url: 'gift-certificates/1' }]}
      />
      <h2>{giftCertificate.title}</h2>
      <div className="list-discount">
        {listDiscount.map((x) => (
          <Discount
            key={x.id}
            dictionary={currentDiscount}
            discount={x}
            itemWidth={null}
          />
        ))}
      </div>
      <br /><br />
    </div>
  );
};

export default page;
