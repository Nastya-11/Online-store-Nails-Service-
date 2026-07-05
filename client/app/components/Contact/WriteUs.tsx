'use client';
import React, { useState } from 'react';
import './WriteUs.scss';

type Props = {
  dictionary: {
    title: string;
    name: string;
    phone: string;
    message: string;
    send: string;
  };
};

const WriteUs = ({ dictionary }: Props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обробка відправки форми
    console.log({ name, phone, message });
  };

  return (
    <div className="write-us-container">
      <div className="write-us">
        <div className="title">
          <h2>{dictionary.title}</h2>
          <div className="line" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="name-and-phone">
            <div className="input-with-label">
              <label htmlFor="name">{dictionary.name}</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={dictionary.name}
                required
              />
            </div>
            <div className="input-with-label">
              <label htmlFor="phone">{dictionary.phone}</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={dictionary.phone}
                required
                pattern="^\+?(?:380|0)\d{9}$"
              />
            </div>
          </div>
          <div className="message">
            <label htmlFor="message">{dictionary.message}</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={dictionary.message}
              rows={7}
              required
            />
          </div>
          <div className="send">
            <button type="submit">{dictionary.send}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteUs;
