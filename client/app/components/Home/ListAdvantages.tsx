import { Locale } from '@/i18n.config';
import React from 'react';
import './ListAdvantages.scss';
import GuaranteedSVG from '../../assest/Guaranteed.svg';
import DeliverySVG from '../../assest/Delivery.svg';
import SendSVG from '../../assest/Send.svg';
import { getDictionary } from '@/lib/dictionary';

type Props = {
  lang: Locale;
};

const ListAdvantages = async ({ lang }: Props) => {
  const { Advantages } = await getDictionary(lang);
  return (
    <div className="list-advantager-container">
      <div className="list-advantager">
        <div className="advantager">
          <GuaranteedSVG />
          <p>{Advantages.title1}</p>
          <span>{Advantages.description1}</span>
        </div>
        <div className="advantager">
          <DeliverySVG />
          <p>{Advantages.title2}</p>
          <span>{Advantages.description2}</span>
        </div>
        <div className="advantager">
          <SendSVG />
          <p>{Advantages.title3}</p>
          <span>{Advantages.description3}</span>
        </div>
      </div>
    </div>
  );
};

export default ListAdvantages;
