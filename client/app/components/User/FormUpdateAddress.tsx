'use client';
import React, { useState } from 'react';
import './FormUpdateAddress.scss';

const FormUpdateAddress = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
    postalCode: '',
    phoneNumber: '',
    novaPoshta: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <form className="form-update-address" onSubmit={handleSubmit}>
      <div className="row">
        <div className="input-group">
          <label>
            Ім&apos;я<span className="required">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>
            Прізвище<span className="required">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="input-group">
          <label>
            Країна<span className="required">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>
            Місто<span className="required">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="input-group">
          <label>Вулиця</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Будинок</label>
          <input
            type="text"
            name="house"
            value={formData.house}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Кв./Офіс</label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="input-group">
          <label>Поштовий індекс</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>
            Номер телефону<span className="required">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <p className="info-text">
        Поля, позначені зірочками (*), обов&apos;язкові для заповнення.
      </p>

      <button type="submit">Зберегти адресу</button>
    </form>
  );
};

export default FormUpdateAddress;
