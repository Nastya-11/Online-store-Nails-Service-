import React, { useEffect, useState } from 'react';
import './UkrPostDelivery.scss';
import { Locale } from '@/i18n.config';

type Props = {
  infoDelivery: any;
  setInfoDelivery: (info: any) => void;
  lang: Locale;
  text?: string;
};

const UkrPostDelivery = ({ infoDelivery, setInfoDelivery, lang, text }: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      setInfoDelivery({ isTrue: true, res: { postIdx: value } });
    } else {
      setInfoDelivery({ isTrue: false });
    }
  }, [value]);

  return (
    <div className="ukr-post-delivery-cont">
      {text && <p className="info-text">{text}</p>}
      <input
        type="text"
        placeholder="Введіть поштовий індекс"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};


export default UkrPostDelivery;
