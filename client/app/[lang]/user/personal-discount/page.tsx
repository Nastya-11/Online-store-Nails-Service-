import React from 'react';
import './PersonalDiscount.scss';
import UserPanelNavigation from '@/app/components/User/UserPanelNavigation';
import { Locale } from '@/i18n.config';
import PersonalDiscount from '@/app/components/User/PersonalDiscount';
import './PersonalDiscount.scss';

type Props = {
  params: { lang: Locale };
};

const page = ({ params: { lang } }: Props) => {
  return (
    <div className="user-management-container">
    </div>
  );
};

export default page;
