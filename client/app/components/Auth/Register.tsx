'use client';
import React, { useState } from 'react';
import './Register.scss';
import GoogleSVG from '../../assest/Auth/GoogleSVG.svg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { $host } from '@/app/http';
import { useDispatch, useSelector } from 'react-redux';
import { setIsRegisterOpen, setUser } from '@/app/store/reducers/authSlice';
import { RootState } from '@/app/store';

interface Props {
  dictionary: any;
}

const Login = ({ dictionary }: Props) => {
  const { isRegisterOpen } = useSelector((state: RootState) => state.auth);
  const dispactch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone: string) => {
    setFormData({ ...formData, phone });
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = dictionary.required;
    if (!formData.surname) newErrors.surname = dictionary.required;
    if (!formData.phone) newErrors.phone = dictionary.required;
    if (!formData.email) newErrors.email = dictionary.required;
    if (!formData.password) newErrors.password = dictionary.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      const res = await $host.post('user/register', {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      console.log(res.data.token);
      dispatch(setUser({ token: res.data.token }));
      dispactch(setIsRegisterOpen({ isOpen: false }));
    }
  };

  const setIsLogin = (isOpen: boolean) => {
    dispactch(setIsRegisterOpen({ isOpen }));
  };

  return (
    <div className="register-window-container">
      <div className="login-text" onClick={() => setIsLogin(true)}>
        {dictionary.title}
      </div>
      {isRegisterOpen && (
        <div onClick={() => setIsLogin(false)} className="login-window">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="login"
          >
            <h2>{dictionary.title}</h2>
            <div className="row">
              <form onSubmit={handleSubmit}>
                <label>
                  {dictionary.name} <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={dictionary.name}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}

                <label>
                  {dictionary.surname} <span className="red">*</span>
                </label>
                <input
                  type="text"
                  name="surname"
                  placeholder={dictionary.surname}
                  value={formData.surname}
                  onChange={handleChange}
                />
                {errors.surname && (
                  <div className="error">{errors.surname}</div>
                )}

                <label>
                  {dictionary.numberPhone} <span className="red">*</span>
                </label>
                <PhoneInput
                  country={'ua'}
                  inputClass="phone-input"
                  buttonClass="phone-dropdown"
                  placeholder="+380 (__) ___-__-__"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
                {errors.phone && <div className="error">{errors.phone}</div>}

                <label>
                  {dictionary.email} <span className="red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={dictionary.email}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}

                <label>
                  {dictionary.password} <span className="red">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder={dictionary.password}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}

                <button type="submit">{dictionary.register}</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
