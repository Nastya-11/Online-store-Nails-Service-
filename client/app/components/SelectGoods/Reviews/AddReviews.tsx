'use client';
import React, { useState } from 'react';
import './AddReviews.scss';
import Pencil from '../../../assest/Reviews/Pencil.svg';
import Link from 'next/link';
import { $authHost } from '@/app/http';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect } from 'react';

const AddReviews = ({
  productId,
  productName,
  countReviews,
}: {
  productId: number;
  productName: string;
  countReviews: number;
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [valueForMoneyRating, setValueForMoneyRating] = useState('4');
  const [overallQualityRating, setOverallQualityRating] = useState('4');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');

  const addReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description) {
      setErrorMessage('Будь ласка, заповніть всі обов’язкові поля.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('valueForMoneyRating', valueForMoneyRating);
      formData.append('overallQualityRating', overallQualityRating);
      formData.append('productId', productId.toString());
      formData.append('nameUser', name);
      formData.append('surnameUser', surname);
      const resp = await $authHost.post('reviews/add', formData);
      /*
      if (resp.status === 200) {
        setTitle('');
        setDescription('');
        setValueForMoneyRating('4');
        setOverallQualityRating('4');
        setErrorMessage(
          'Відгук успішно залишено, скоро він появиться на сайті.'
        );
        setTimeout(() => setIsOpen(false), 2000);
      }*/
    } catch (err) {
      setErrorMessage(
        'Сталася помилка при надсиланні відгуку. Спробуйте ще раз.'
      );
    }
  };

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => {
        document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    window.addEventListener('open-review-form', handleOpen);

    return () => {
      window.removeEventListener('open-review-form', handleOpen);
    };
  }, []);



  return (
    <div id="review-form" className="add-reviews-container">
      <div className="add-reviews-header">
        <h2>{countReviews} Відгуків</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Pencil />
          Написати відгук
        </button>
      </div>
      {isOpen && (
        <form onSubmit={addReview} className="add-reviews">
          <h2>Написати відгук</h2>
          <div className="info-text">
            <div className="row">
              <div className="red">*</div>
              <p>Заголовок</p>
            </div>
            <input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заголовок"
              required
            />
            <div style={{ marginTop: '20px' }} className="row">
              <div className="red">*</div>
              <p>Відгук:</p>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Ваш відгук"
              required
            />
            <br />
            <p className="b">Поля, позначені зірочками (*), обов&apos;язкові для заповнення.</p>

            <h2>Що ви думаєте про якість по відношенню до вартості?</h2>
            <div className="radio-group">
              {['1', '2', '3', '4', '5'].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    value={value}
                    checked={valueForMoneyRating === value}
                    onChange={() => setValueForMoneyRating(value)}
                  />
                  <p>
                    {
                      [
                        'Дуже погано',
                        'Погано',
                        'Нормально',
                        'Добре',
                        'Дуже добре',
                      ][parseInt(value) - 1]
                    }
                  </p>
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={
                        index < parseInt(value) ? 'select' : 'no-select'
                      }
                    />
                  ))}
                </label>
              ))}
            </div>

            <h2>Як ви оцінюєте якість продукту в цілому?</h2>
            <div className="radio-group">
              {['1', '2', '3', '4', '5'].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    value={value}
                    checked={overallQualityRating === value}
                    onChange={() => setOverallQualityRating(value)}
                  />
                  <p>
                    {
                      [
                        'Дуже погано',
                        'Погано',
                        'Нормально',
                        'Добре',
                        'Дуже добре',
                      ][parseInt(value) - 1]
                    }
                  </p>
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={
                        index < parseInt(value) ? 'select' : 'no-select'
                      }
                    />
                  ))}
                </label>
              ))}
              {!isAuthenticated && (
                <>
                  <div className="colum">
                    <div className="row">
                      <div className="red">*</div>
                      <p>Введіть ваше ім&rsquo;я</p>
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="colum">
                    <div className="row">
                      <div className="red">*</div>
                      <p>Введіть прізвище:</p>
                    </div>
                    <input
                      type="text"
                      required
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="submit-button">
              Надіслати
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddReviews;
