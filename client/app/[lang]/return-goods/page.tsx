import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import '../delivery/Delivery.scss';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';
import SadSVG from '../../assest/DeliveryCookiesAndOther/sad.svg';
import ReturnSVG from '../../assest/DeliveryCookiesAndOther/Return.svg';
import ProcedurSVG from '../../assest/DeliveryCookiesAndOther/Procedur.svg';

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const { returnGoods } = await getDictionary(lang);
  return (
    <div className="delivery-container">
      <BreadCrumbs
        lang={lang}
        listUrls={[{ name: returnGoods.title, url: 'return-goods' }]}
      />
      <div className="delivery-main">
        <div className="main-title">
          <h1>{returnGoods.title}</h1>
          <div className="line" />
        </div>
        <div className="title">
          <SadSVG /> <h2>{returnGoods.title2}</h2>
        </div>
        <div className="block">
          <p
            dangerouslySetInnerHTML={{ __html: returnGoods.returnPolicyDesc }}
          />
        </div>
        <div className="block">
          <p
            dangerouslySetInnerHTML={{ __html: returnGoods.returnPolicyDesc2 }}
          />
        </div>
        <ul className="list-number">
          {returnGoods.ul.map((x, key) => (
            <li key={key}>{x}</li>
          ))}
        </ul>
        <div className="title">
          <ReturnSVG /> <h2>{returnGoods.title3}</h2>
        </div>
        <div className="block">
          <p dangerouslySetInnerHTML={{ __html: returnGoods.returnRules }} />
        </div>
        <div className="title">
          <ProcedurSVG /> <h2>{returnGoods.title4}</h2>
        </div>
        <div className="block">
          <p
            dangerouslySetInnerHTML={{ __html: returnGoods.returnPolicyDesc3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
