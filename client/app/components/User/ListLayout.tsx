'use client';
import { RootState } from '@/app/store';
import React from 'react';
import { useSelector } from 'react-redux';
import './ListLayout.scss';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import OrdersSVG from '../../assest/User/Order.svg';
import LikeSVG from '../../assest/User/Like.svg';
import Img from '../../assest/User/image.png';

type Props = {
  dictionary: any;
  lang: Locale;
};


const ListLayout = ({ dictionary, lang }: Props) => {
  const user = useSelector((state: RootState) => state).auth;

  return (
    <div className="list-layout-container-main">
      <div className="list-layout-container">
        <div className="user">
          <div className="img-cont">
            <div className="img" />
            <div className="name">{user.name[0]}</div>
          </div>
          <div className="text">
            <div className="name">{user.name}</div>
            <Link href={`/${lang}/user/my-cabinet`}>{dictionary.cabinet}</Link>
          </div>
        </div>
        <div
          className="text-info"
          dangerouslySetInnerHTML={{ __html: dictionary.textInfo }}
        />
      </div>
      <div className="text-info-mobile">
        <p dangerouslySetInnerHTML={{ __html: dictionary.textInfo }} />
      </div>
    </div>
  );
};

export default ListLayout;
