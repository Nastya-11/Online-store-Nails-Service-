import React from 'react';
import './UserPanelNavigation.scss';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';
import CabinetSVG from '../../assest/User/user.svg';
import AddressSVG from '../../assest/User/address.svg';
import OrdersSVG from '../../assest/User/orders.svg';
import PersonalDiscountSVG from '../../assest/User/personalDiscount.svg';
import ExitSVG from '../../assest/User/exit.svg';

type Props = {
  selectUrl: string;
  lang: Locale;
};

const UserPanelNavigation = async ({ selectUrl, lang }: Props) => {
  const { userUrls } = await getDictionary(lang);
  const urls = [
    {
      url: `/user/my-cabinet`,
      svg: CabinetSVG,
    },
    {
      url: '/user/address',
      svg: AddressSVG,
    },
    {
      url: '/user/exit',
      svg: ExitSVG,
    },
  ];
  return (
    <div className="user-panel-navigation-containe">
      <div className="user-panel-navigation">
        {urls.map((x, idx) => (
          <Link
            key={idx}
            className={selectUrl == x.url ? 'active' : ''}
            href={'/' + lang + x.url}
          >
            <p>
              <x.svg />
            </p>
            <span>{x.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPanelNavigation;
