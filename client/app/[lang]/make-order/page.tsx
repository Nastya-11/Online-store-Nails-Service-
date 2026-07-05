import React from 'react';
import './MakeOrder.scss';
import MakeOrder from '@/app/components/MakeOrder/MakeOrder';
import { Locale } from '@/i18n.config';

type Props = {
  params: { lang: Locale };
};

const page = ({ params: { lang } }: Props) => {
  return (
    <div className="make-order-main">
      <div className="make-order-container">
        <h1>Оформлення замовлення</h1>
        <MakeOrder lang={lang} />
      </div>
    </div>
  );
};

export default page;
