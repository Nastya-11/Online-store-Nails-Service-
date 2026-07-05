import FormUpdateAddress from '@/app/components/User/FormUpdateAddress';
import UserPanelNavigation from '@/app/components/User/UserPanelNavigation';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import './Address.scss';

type Props = {
  params: {
    lang: Locale;
  };
};

type Dictionary = {
  address: {
    title: string;
  };
};


const page = async ({ params: { lang } }: Props) => {
  const { address } = await getDictionary(lang) as Dictionary;

  return (
    <div className="my-cabinet-container">
      <UserPanelNavigation lang={lang} selectUrl="/user/address" />
      <div className="my-cabinet">
        <h2>{address.title}</h2>
        <FormUpdateAddress />
      </div>
    </div>
  );
};

export default page;
