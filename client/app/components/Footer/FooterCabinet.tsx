'use client';
import { Locale } from '@/i18n.config';
import Link from 'next/link';
import React, { useState } from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

type Props = {
  lang: Locale;
  dictionary: any;
  loginDictionary: any;
  registerDictionary: any;
};

const FooterCabinet = ({
  lang,
  dictionary,
  loginDictionary,
  registerDictionary,
}: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <div className="footer-cabinet">
        <div className="title">
          <p>{dictionary.title}</p>
          <div className="line" />
        </div>
        <div className="list-urls">
          {!isAuthenticated && (
            <>
              <Login dictionary={loginDictionary} />
              <Register dictionary={registerDictionary} />
            </>
          )}
          {Object.entries(
            isAuthenticated ? dictionary.urlAuth : dictionary.urlNoAuth
          ).map(([path, label]: any) => (
            <Link key={path} href={`/${lang}${path}`}>
              {label}
            </Link>
          ))}
        </div>
        <div className="line-opacity" />
      </div>

      <details className={'details'}>
        <summary>
          <div className="title">
            <p>{dictionary.title}</p>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.34353 0.27151H6.80051L6.80051 6.79956L0.272463 6.79956L0.272464 7.34258L6.80051 7.34258L6.80051 13.8706H7.34353L7.34353 7.34258L13.8716 7.34258L13.8716 6.79956L7.34353 6.79956L7.34353 0.27151Z"
                fill="#3960FF"
                stroke="black"
                stroke-width="0.44"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </summary>
        <div className="list-urls">
          {!isAuthenticated && (
            <>
              <Login dictionary={loginDictionary} />
              <Register dictionary={registerDictionary} />
            </>
          )}
          {Object.entries(
            isAuthenticated ? dictionary.urlAuth : dictionary.urlNoAuth
          ).map(([path, label]: any) => (
            <Link key={path} href={`/${lang}${path}`}>
              {label}
            </Link>
          ))}
        </div>
        <div className="line-opacity" />
      </details>
    </>
  );
};

export default FooterCabinet;
