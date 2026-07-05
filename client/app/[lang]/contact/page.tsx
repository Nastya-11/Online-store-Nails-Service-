import React from 'react';
import './Contact.scss';
import WriteUs from '@/app/components/Contact/WriteUs';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import PhoneSVG from '../../assest/Contact/Phone.svg';
import Link from 'next/link';
import {
  email,
  emailUrl,
  facebookUrl,
  instagramUrl,
  number1Footer,
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
import MapSVG from '../../assest/Contact/Map.svg';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { contact } = await getDictionary(lang);
  return (
    <div className="contact-container">
      <div className="bread-crum">
        <BreadCrumbs
          lang={lang}
          listUrls={[
            {
              name:
                contact.contact.title[0] +
                contact.contact.title.slice(1).toLocaleLowerCase(),
              url: 'contact',
            },
          ]}
        />
      </div>
      <div className="map">
        <iframe 
          src= {'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82352.68481597453!2d23.929835256241514!3d49.83265984439919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7c09109a57%3A0x4223c517012378e2!2z0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1suk!2sua!4v1748250662476!5m2!1suk!2sua'}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      <div className="write-us-and-contact">
        <WriteUs dictionary={contact.WriteUs} />
        <div className="contact">
          <div className="title">
            <h2>{contact.contact.title}</h2>
            <div className="line" />
          </div>
          <div className="card">
            <PhoneSVG />
            <div className="text">
              <div className="row">
                <p>{contact.contact.phone}</p>
                <Link href={numberUrl}>{number1Footer}</Link>
              </div>
              <div className="row">
                <p>Email: </p>
                <Link href={emailUrl}>{email}</Link>
              </div>
            </div>
          </div>
          <div className="social">
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
          <div className="line" />
          <div className="card">
            <MapSVG />
            <div className="text">
              <p>{contact.contact.internetShop}</p>
              <p>{contact.contact.schedule}</p>
              <span
                dangerouslySetInnerHTML={{
                  __html: contact.contact.scheduleDescription,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
