'use client';

import { logout } from '@/app/store/reducers/authSlice';
import { Locale } from '@/i18n.config';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ExitPage = ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout());
    router.push(`/${lang}`);
  }, [dispatch, router, lang]);

  return <div></div>;
};

export default ExitPage;
