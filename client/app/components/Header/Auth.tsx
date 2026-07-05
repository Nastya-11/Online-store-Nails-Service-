'use client';
import React, { useState, useEffect, useRef } from 'react';
import AuthSVG from '../../assest/Header/Auth.svg';
import './Auth.scss';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/app/store/reducers/authSlice';
import { jwtDecode } from 'jwt-decode';

type Props = {
  dictionary: any;
  lang: Locale;
  loginDictionary: any;
  registerDictionary: any;
};

const Auth = ({
  dictionary,
  lang,
  loginDictionary,
  registerDictionary,
}: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const authRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // Закриття при кліці поза auth-container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authRef.current && !authRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {}, [isAuthenticated]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decoded: { exp: number } = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000); // Час у секундах

          if (decoded.exp > currentTime) {
            dispatch(setUser({ token }));
          } else {
            console.log('Токен протермінований');
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Невірний токен', error);
          localStorage.removeItem('token');
        }
      }
    }
  }, [dispatch]);

  return (
    <div
      className="auth-container"
      ref={authRef}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="title" onMouseEnter={() => setIsOpen(true)}>
        <AuthSVG />
      </div>
      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
        <div className="logined" onClick={() => setIsOpen(false)}>
          {!isAuthenticated ? (
            <>
              <Login dictionary={loginDictionary} />
              <Register dictionary={registerDictionary} />
            </>
          ) : (
            <>
              <Link href={`/${lang}/user/my-cabinet`}>
                {dictionary.myCabinet}
              </Link>
              <Link href={`/${lang}/user/exit`}>{dictionary.exit}</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
