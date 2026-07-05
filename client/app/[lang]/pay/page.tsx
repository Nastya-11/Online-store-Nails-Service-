import { Locale } from '@/i18n.config';
import React from 'react';
import '../delivery/Delivery.scss';
import { getDictionary } from '@/lib/dictionary';
import PaySVG from '../../assest/DeliveryCookiesAndOther/Pay.svg';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';

const Page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { pay } = await getDictionary(lang);
  return (
    <div className="delivery-container">
      <BreadCrumbs lang={lang} listUrls={[{ name: pay.title, url: 'pay' }]} />
      <div className="delivery-main">
        <div className="main-title">
          <h1>{pay.title}</h1>
          <div className="line" />
        </div>
        <h2
          style={{
            textAlign: 'center',
            margin: '30px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {pay.typePay}
        </h2>
        <div className="block">
          <h3>{pay.miniTitle2}</h3>
          <p dangerouslySetInnerHTML={{ __html: pay.description2 }} />{' '}
        </div>
        <div className="block">
          <h3>{pay.miniTitle3}</h3>
          <p dangerouslySetInnerHTML={{ __html: pay.description3 }} />{' '}
        </div>
        <div className="block">
          <h3>{pay.miniTitle4}</h3>
          <p dangerouslySetInnerHTML={{ __html: pay.description4 }} />
        </div>
      </div>
    </div>
  );
};

export default Page;
