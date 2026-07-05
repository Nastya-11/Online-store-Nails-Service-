import React from 'react';
import './Footer.scss';
import { Locale } from '@/i18n.config';
import LogoSVG from '../../assest/Logo.svg';
import Link from 'next/link';
import {
  facebookUrl,
  instagramUrl,
  number1Footer,
  number2Footer,
  number2UrlFooter,
  numberUrl,
  telegramUrl,
  vatcapUrl,
  viberUrl,
} from '@/app/assest/info';
import ViberSVG from '../../assest/Footer/Viber.svg';
import TelegramSVG from '../../assest/Footer/Telegram.svg';
import VatcapSVG from '../../assest/Footer/Vatcap.svg';
import FacebookSVG from '../../assest/Footer/Facebook.svg';
import InstagramSVG from '../../assest/Footer/Instagram.svg';
import NewPostSVG from '../../assest/Footer/NewPost.svg';
import UkrPostSVG from '../../assest/Footer/UkrPost.svg';
import FooterCabinet from './FooterCabinet';
import { getDictionary } from '@/lib/dictionary';

type Props = {
  lang: Locale;
};

const Footer = async ({ lang }: Props) => {
  const { footer, login, register } = await getDictionary(lang);
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-up">
          <div className="logo-numbers-socialcs">
            <div className="logo">
              <Link href={`/${lang}`}>
                <LogoSVG />
              </Link>
            </div>
            <div className="numbers">
              <Link href={numberUrl}>{number1Footer}</Link>
              <Link href={number2UrlFooter}>{number2Footer}</Link>
            </div>
            <div className="socials">
              <Link href={viberUrl}>
                <ViberSVG />
              </Link>
              <Link href={telegramUrl}>
                <TelegramSVG />
              </Link>
              <Link href={vatcapUrl}>
                <VatcapSVG />
              </Link>
              <Link href={facebookUrl}>
                <FacebookSVG />
              </Link>
              <Link href={instagramUrl}>
                <InstagramSVG />
              </Link>
            </div>
          </div>
          <div className="languages">
            <Link className={lang != 'ru' ? 'active' : ''} href={'/uk'}>
              Українська
            </Link>
            <Link className={lang == 'ru' ? 'active' : ''} href={'/ru'}>
              English
            </Link>
          </div>
        </div>
        <FooterCabinet
          registerDictionary={register}
          loginDictionary={login}
          lang={lang}
          dictionary={footer.cabinet}
        />
        <div className="info">
          <div className="title">
            <p>{footer.info.title}</p>
            <div className="line" />
          </div>
          <div className="list-urls">
            {Object.entries(footer.info.url).map(([path, label]) => (
              <Link key={path} href={`/${lang}${path}`}>
                {label}
              </Link>
            ))}
          </div>
          <div className="line-opacity" />
        </div>
        <details className="details">
          <summary>
            <div className="title">
              <p>{footer.info.title}</p>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.34353 0.27151H6.80051L6.80051 6.79956L0.272463 6.79956L0.272464 7.34258L6.80051 7.34258L6.80051 13.8706H7.34353L7.34353 7.34258L13.8716 7.34258L13.8716 6.79956L7.34353 6.79956L7.34353 0.27151Z"
                  fill="#3960FF"
                  stroke="black"
                  stroke-width="0.44"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </summary>
          <div className="list-urls">
            {Object.entries(footer.info.url).map(([path, label]) => (
              <Link key={path} href={`/${lang}${path}`}>
                {label}
              </Link>
            ))}
          </div>
          <div className="line-opacity" />
        </details>
        <details className="details">
          <summary>
            <div className="title">
              <p>{footer.contact}</p>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.34353 0.27151H6.80051L6.80051 6.79956L0.272463 6.79956L0.272464 7.34258L6.80051 7.34258L6.80051 13.8706H7.34353L7.34353 7.34258L13.8716 7.34258L13.8716 6.79956L7.34353 6.79956L7.34353 0.27151Z"
                  fill="#3960FF"
                  stroke="black"
                  stroke-width="0.44"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </summary>
          <div className="socials">
            <Link href={viberUrl}>
              <ViberSVG />
            </Link>
            <Link href={telegramUrl}>
              <TelegramSVG />
            </Link>
            <Link href={vatcapUrl}>
              <VatcapSVG />
            </Link>
            <Link href={facebookUrl}>
              <FacebookSVG />
            </Link>
            <Link className="insta" href={instagramUrl}>
              <InstagramSVG />
            </Link>
          </div>
        </details>
      </div>
      <div className="footer-down">
        
        
        <div className="footer-down-url">
          <Link href={`/${lang}/pay`}>{footer.pay}</Link>
          <Link href={`/${lang}/politicy`}>{footer.politicyConfedent}</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
