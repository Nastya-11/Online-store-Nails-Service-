'use client';
import { Locale } from '@/i18n.config';
import React, { useState } from 'react';
import BurgerSVG from '../../../assest/Header/Burger.svg';
import './Burger.scss';
import LogoSVG from '../../../assest/Logo.svg';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import RightSvg from '../../../assest/Header/Right.svg';
import {
  setIsLoginOpen,
  setIsRegisterOpen,
} from '@/app/store/reducers/authSlice';
import { CategoriesList } from '@/app/interfaces/Goods';
import { useRouter } from 'next/navigation';

type Props = {
  lang: Locale;
  dictionary: any;
  catalog: CategoriesList;
};

const Burger = ({ lang, dictionary, catalog }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const openRegister = () => {
    dispatch(setIsRegisterOpen({ isOpen: true }));
  };
  const openLogin = () => {
    dispatch(setIsLoginOpen({ isOpen: true }));
  };

  return (
    <div className="burger-container">
      {/* Кнопка відкриття */}
      <div onClick={() => setIsOpen(true)} className="burger-title">
        <BurgerSVG />
      </div>

      {/* Затемнення фону */}
      {isOpen && (
        <div className="burger-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Меню бургеру */}
      <div className={`burger-dropdown ${isOpen ? 'burger-open' : ''}`}>
        <div className="logo">
          <Link onClick={() => setIsOpen(false)} href={`/${lang}`}>
            <LogoSVG />
          </Link>
        </div>
        {!isAuthenticated && (
          <div className="login">
            {
              /*!isAuthenticated &&*/ <div className="authenticated">
                <div className="auth-logo">
                  <svg
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.480469"
                      width="40"
                      height="40"
                      rx="20"
                      fill="white"
                      fill-opacity="0.3"
                    />
                    <path
                      d="M20 8.80469C18.3958 8.80469 16.8828 9.11458 15.4609 9.73438C14.0391 10.3359 12.7995 11.1654 11.7422 12.2227C10.6849 13.2799 9.85547 14.5195 9.25391 15.9414C8.63411 17.3633 8.32422 18.8763 8.32422 20.4805C8.32422 22.0846 8.63411 23.5977 9.25391 25.0195C9.85547 26.4414 10.6849 27.681 11.7422 28.7383C12.7995 29.7956 14.0391 30.625 15.4609 31.2266C16.8828 31.8464 18.3958 32.1562 20 32.1562C21.6042 32.1562 23.1172 31.8464 24.5391 31.2266C25.9609 30.625 27.2005 29.7956 28.2578 28.7383C29.3151 27.681 30.1445 26.4414 30.7461 25.0195C31.3659 23.5977 31.6758 22.0846 31.6758 20.4805C31.6758 18.8763 31.3659 17.3633 30.7461 15.9414C30.1445 14.5195 29.3151 13.2799 28.2578 12.2227C27.2005 11.1654 25.9609 10.3359 24.5391 9.73438C23.1172 9.11458 21.6042 8.80469 20 8.80469ZM14.2578 27.8086C14.4948 27.2799 15.2376 26.8014 16.4863 26.373C17.735 25.9447 18.9062 25.7305 20 25.7305C21.0938 25.7305 22.265 25.9447 23.5137 26.373C24.7624 26.8014 25.5052 27.2799 25.7422 27.8086C24.9583 28.4466 24.0788 28.9388 23.1035 29.2852C22.1283 29.6315 21.0938 29.8047 20 29.8047C18.9062 29.8047 17.8717 29.6315 16.8965 29.2852C15.9212 28.9388 15.0417 28.4466 14.2578 27.8086ZM27.4102 26.1133C26.9909 25.6029 26.4531 25.1745 25.7969 24.8281C25.1224 24.4818 24.4297 24.2038 23.7188 23.9941C23.0078 23.7845 22.3151 23.6341 21.6406 23.543C20.9661 23.4518 20.4193 23.4062 20 23.4062C19.5807 23.4062 19.0339 23.4518 18.3594 23.543C17.6849 23.6341 16.9922 23.7845 16.2812 23.9941C15.5703 24.2038 14.8776 24.4818 14.2031 24.8281C13.5469 25.1745 13.0091 25.6029 12.5898 26.1133C11.9883 25.3294 11.5189 24.459 11.1816 23.502C10.8444 22.5449 10.6758 21.5378 10.6758 20.4805C10.6758 19.1862 10.9219 17.974 11.4141 16.8438C11.888 15.7135 12.5488 14.7246 13.3965 13.877C14.2441 13.0293 15.2331 12.3685 16.3633 11.8945C17.4935 11.4023 18.7057 11.1562 20 11.1562C21.2943 11.1562 22.5065 11.4023 23.6367 11.8945C24.7669 12.3685 25.7559 13.0293 26.6035 13.877C27.4512 14.7246 28.112 15.7135 28.5859 16.8438C29.0781 17.974 29.3242 19.1862 29.3242 20.4805C29.3242 21.5378 29.1556 22.5449 28.8184 23.502C28.4811 24.459 28.0117 25.3294 27.4102 26.1133ZM20 13.4805C18.8698 13.4805 17.9082 13.877 17.1152 14.6699C16.3223 15.4629 15.9258 16.4245 15.9258 17.5547C15.9258 18.6849 16.3223 19.651 17.1152 20.4531C17.9082 21.2552 18.8698 21.6562 20 21.6562C21.1302 21.6562 22.0918 21.2552 22.8848 20.4531C23.6777 19.651 24.0742 18.6849 24.0742 17.5547C24.0742 16.4245 23.6777 15.4629 22.8848 14.6699C22.0918 13.877 21.1302 13.4805 20 13.4805ZM20 19.3047C19.5078 19.3047 19.0931 19.1361 18.7559 18.7988C18.4186 18.4616 18.25 18.0469 18.25 17.5547C18.25 17.0807 18.4186 16.6706 18.7559 16.3242C19.0931 15.9779 19.5078 15.8047 20 15.8047C20.4922 15.8047 20.9069 15.9779 21.2441 16.3242C21.5814 16.6706 21.75 17.0807 21.75 17.5547C21.75 18.0469 21.5814 18.4616 21.2441 18.7988C20.9069 19.1361 20.4922 19.3047 20 19.3047Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="auth-text">
                  <div className="title">
                    <span onClick={openLogin}>Ввійти</span> |{' '}
                    <span onClick={openRegister}>Реєстрація</span>
                  </div>
                  <div className="info">
                    Авторизуйтесь для отримання розширених можливостей
                  </div>
                </div>
              </div>
            }{' '}
          </div>
        )}

        <div className="list-category">
          {catalog.map((x, idx) => (
            <div
              onClick={() => {
                router.push(`/${lang}/goods/1?categoryId=${x.id}`);
                setIsOpen(false);
              }}
              key={idx}
              className="category"
            >
              <div className="text">
                <div
                  className="svg"
                  dangerouslySetInnerHTML={{ __html: x.svg }}
                />
                <div className="title">{x[`name${lang}`]}</div>
              </div>
              <div className="arrow-r">
                {x.subcategoryTitles.length > 0 && <RightSvg />}
              </div>
            </div>
          ))}
        </div>
        {/* Додатковий контент можна вставити сюди */}
        <div className="links">
          <Link onClick={() => setIsOpen(false)} href={`/${lang}/gift-certificates`}>
            Подарункові сертифікати
          </Link>
          <Link onClick={() => setIsOpen(false)} href={`/${lang}/delivery`}>
            Доставка
          </Link>
          <Link onClick={() => setIsOpen(false)} href={`/${lang}/pay`}>
            Оплата
          </Link>
          <Link onClick={() => setIsOpen(false)} href={`/${lang}/return-goods`}>
            Обмін та повернення
          </Link>
          <Link onClick={() => setIsOpen(false)} href={`/${lang}/contact`}>
            Контакти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Burger;
