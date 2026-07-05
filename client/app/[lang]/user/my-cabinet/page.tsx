import UserPanelNavigation from '@/app/components/User/UserPanelNavigation';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import './MyCabinet.scss';
import FormUpdateInfo from '@/app/components/User/FormUpdateInfo';

type Props = {
  params: {
    lang: Locale;
  };
};

const page = async ({ params: { lang } }: Props) => {
  const { myCabinet } = await getDictionary(lang);
  return (
    <div className="my-cabinet-container">
      <UserPanelNavigation lang={lang} selectUrl="/user/my-cabinet" />
      <div className="my-cabinet">
        <div className="line" />
        <h2>{myCabinet.title}</h2>
        <FormUpdateInfo />
      </div>
    </div>
  );
};

export default page;
