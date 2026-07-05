'use client';
import { RootState } from '@/app/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './FormUpdateInfo.scss';

type Props = {};

const FormUpdateInfo = ({}: Props) => {
  const onSubmit = (formData: any) => {};

  const { auth } = useSelector((state: RootState) => state);
  const [formData, setFormData] = useState({
    name: auth.name,
    surname: auth.surname,
    email: auth.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    changeEmail: false,
    changePassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form-my-cabinet" onSubmit={handleSubmit}>
      <label>Ваше ім&apos;я*</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Ваше прізвище*</label>
      <input
        type="text"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        required
      />
      <div className="checkboxs">
        <div className="checkbox">
          <input
            type="checkbox"
            name="changeEmail"
            checked={formData.changeEmail}
            onChange={handleChange}
          />
          <label>Змінити електронну пошту</label>
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            name="changePassword"
            checked={formData.changePassword}
            onChange={handleChange}
          />
          <label>Змінити поточний пароль</label>
        </div>
      </div>

      {formData.changeEmail && (
        <div className="collumn">
          <label>Ваша E-mail*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {formData.changePassword && (
        <div className="collumn">
          <label>Поточний пароль*</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <label>Новий пароль</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <label>Підтвердити новий пароль</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <button type="submit">Зберегти інформацію</button>
    </form>
  );
};

export default FormUpdateInfo;
