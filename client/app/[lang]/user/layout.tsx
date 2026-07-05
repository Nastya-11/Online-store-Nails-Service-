import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import './layout.scss';
import ListLayout from '@/app/components/User/ListLayout';

type Props = {
  params: {
    lang: Locale;
  };
  children: React.ReactNode;
};

const layout = async ({ params: { lang }, children }: Props) => {
  const { userLayout } = await getDictionary(lang);
  return (
    <div className="layout-container">
      <h1>{userLayout.title}</h1>
      <ListLayout lang={lang} dictionary={userLayout.ListInfo} />
      {children}
    </div>
  );
};

export default layout;
