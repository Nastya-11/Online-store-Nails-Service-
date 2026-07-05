import { Locale } from '@/i18n.config';
import Link from 'next/link';
import React from 'react';
import './BreadCrumbs.scss';

type Props = {
  listUrls: {
    url: string;
    name: string;
  }[];
  lang: Locale;
};

const BreadCrumbs = ({ listUrls, lang }: Props) => {
  return (
    <div className="bread-crumbs-container">
      <Link href={`/${lang}`}>{lang == 'ru' ? 'Main ' : 'Головна '}</Link>
      {listUrls.map((x) => (
        <Link key={x.url} href={`/${lang}/${x.url}`}>
          {' '}
          / {x.name}
        </Link>
      ))}
    </div>
  );
};

export default BreadCrumbs;
