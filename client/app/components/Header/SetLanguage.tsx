import { i18n } from '@/i18n.config';
import { Locale } from '@/i18n.config';
import React from 'react';
import './SetLanguage.scss';
import Link from 'next/link';

type Props = {
  lang: Locale;
};

const SetLanguage = ({ lang }: Props) => {
  return (
    <div className="set-language-container">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}`}
          className={lang === locale ? 'active' : ''}
        >
          {i18n.localeNames[locale]}
        </Link>
      ))}
    </div>
  );
};

export default SetLanguage;
