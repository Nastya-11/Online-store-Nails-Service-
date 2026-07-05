'use client';
import { Locale } from '@/i18n.config';
import React, { useState } from 'react';
import './GiftCertificates.scss';
import BasketSVG from '../../assest/Goods/Basket.svg';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';

type Props = {
  params: { lang: Locale };
};

const Page = ({ params: { lang } }: Props) => {
  const [amount, setAmount] = useState(200);
  const [deliveryMethod, setDeliveryMethod] = useState('email');

  return (
    <div className="gift-certificates-cont">
      <BreadCrumbs
        lang={lang}
        listUrls={[
          { name: 'Подарункові сертифікати', url: 'gift-certificates' },
        ]}
      />
      <h1>Придбати подарунковий сертифікат</h1>
      <form className="gift-certificates-form">
        {/* Поля вводу */}
        <label>
          <div className="row">
            Кому <span>*</span>
          </div>
          <input type="text" required />
        </label>

        <label>
          <div className="row">
            Від <span>*</span>
          </div>{' '}
          <input type="text" required />
        </label>

        <label className="amount-field">
          <div className="row">
            Сума <span>*</span>
          </div>
          <div className="amount-input">
            <input
              type="number"
              value={amount}
              min="200"
              max="20000"
              required
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <span>грн</span>
          </div>
          <small>Значення повинно бути між 200 грн і 20000 грн</small>
        </label>

        <label>
          Повідомлення
          <textarea rows={3}></textarea>
        </label>

        {/* Спосіб надсилання */}
        <label className="delivery-method">
          Як надіслати?
          <div className="delivery-options">
            <label>
              <input
                type="radio"
                value="email"
                checked={deliveryMethod === 'email'}
                onChange={() => setDeliveryMethod('email')}
              />
              Відправити по електронній пошті
            </label>
            <label>
              <input
                type="radio"
                value="mail"
                checked={deliveryMethod === 'mail'}
                onChange={() => setDeliveryMethod('mail')}
              />
              Відправити поштою
            </label>
          </div>
        </label>

        <label>
          <div className="row">
            Телефон <span>*</span>
          </div>{' '}
          <input type="tel" required />
        </label>

        {/* Кнопка покупки */}
        <button type="submit" className="buy-button">
          <BasketSVG />
          Придбати
        </button>
      </form>
    </div>
  );
};

export default Page;
