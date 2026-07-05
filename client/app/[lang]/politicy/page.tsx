import React from 'react';
import '../delivery/Delivery.scss';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { politicy } = await getDictionary(lang);

  return (
    <div className="delivery-container">
      <BreadCrumbs
        lang={lang}
        listUrls={[{ name: politicy.title, url: 'politicy' }]}
      />
      <div className="delivery-main">
        <div className="main-title">
          <h1>{politicy.title}</h1>
          <div className="line" />
        </div>

        <div className="block">
          <h2
            style={{
              textAlign: 'center',
              margin: '30px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {politicy.miniTitle1}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: politicy.description1 }} />
        </div>

        <div className="block">
          <h3>{politicy.miniTitle2}</h3>
          <p dangerouslySetInnerHTML={{ __html: politicy.description2 }} />
        </div>

        <div className="block">
          <h3>{politicy.miniTitle3}</h3>
          <ul>
            {politicy.ul1.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
