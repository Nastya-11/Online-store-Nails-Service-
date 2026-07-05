'use client';
import React, { useEffect, useState } from 'react';
import './Login.scss';
import GoogleSVG from '../../assest/Auth/GoogleSVG.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {
  setIsLoginOpen,
  setIsRegisterOpen,
  setUser,
} from '@/app/store/reducers/authSlice';
import { $host } from '@/app/http';

type Props = {
  dictionary: any;
};

const Login = ({ dictionary }: Props) => {
  const { isLoginOpen } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  // Функція відправки форми
  const submit = async () => {
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      console.log(2, 323);
      setError('Некоректний email');
      return;
    }

    if (!password.trim()) {
      setError('Пароль не може бути порожнім');
      return;
    }

    try {
      const res = await $host.post('user/login', {
        email,
        password,
        rememberMe,
      });
      const token = res.data.token;
      dispatch(setUser({ token }));
      dispatch(setIsLoginOpen({ isOpen: false }));
    } catch (err: any) {
      console.log(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.message.text
      )
        setError(err.response.data.message.text);
      else setError('Сталася помиилка');
    }
  };

  const setisLogin = (isOpen: boolean) => {
    dispatch(setIsLoginOpen({ isOpen }));
  };

  const openRegister = () => {
    dispatch(setIsLoginOpen({ isOpen: false }));
    dispatch(setIsRegisterOpen({ isOpen: true }));
  };

  return (
    <div className="login-window-container">
      <div className="login-text" onClick={() => setisLogin(true)}>
        {dictionary.title}
      </div>
      {isLoginOpen && (
        <div onClick={() => setisLogin(false)} className="login-window">
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="login"
          >
            <h2>{dictionary.title}</h2>
            <div className="row">
              <form>
                <label>{dictionary.email}</label>
                <input
                  type="email"
                  placeholder={dictionary.enterEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" // Регулярка для email
                  title={dictionary.invalidEmail} // Повідомлення при неправильному email
                />
                <label>{dictionary.password}</label>
                <input
                  type="password"
                  placeholder={dictionary.enterPassword}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="remember-me"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setRememberMe(!rememberMe);
                  }}
                >
                  <input
                    onChange={() => {}}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRememberMe(!rememberMe);
                    }}
                    type="checkbox"
                    checked={rememberMe}
                  />
                  <span>{dictionary.rememberMe}</span>
                </div>
                <div className="line-hor" />
                <div className="for-pass-and-login">
                  <span>{dictionary.forgotPassword}</span>
                  <button onClick={submit}>{dictionary.logIn}</button>
                </div>
                {error && <div className="error">{error}</div>}
                <div onClick={openRegister} className="regist">
                  {dictionary.register}
                </div>
              </form>
              <div className="line" />
              <div className="google">
                <GoogleSVG /> <span>Google</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
