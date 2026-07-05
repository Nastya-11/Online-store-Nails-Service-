'use client';
import React, { useEffect, useState } from 'react';
import './PersonalDiscount.scss';
import DiamondSVG from '../../assest/user/Diamond.svg';
import { $authHost } from '@/app/http';

const PersonalDiscount = () => {
  const maxAmount = 10000;
  const [currentAmount, setCurrentAmount] = useState(0);
  const [toProcent, setToProcent] = useState('3%');
  const [youHave, setYouHave] = useState(0);
  const progressPercent = Math.min((currentAmount / maxAmount) * 100, 100);

  const getPeronalDiscount = async () => {
    /* const res = await $authHost.get('user/getPersonalDiscount');
    const sum = res.data.res;
    setCurrentAmount(sum);*/
    const sum = 7500; //тимчасово
    if (3000 > sum) {
      setToProcent('3%');
      setYouHave(3000 - sum);
    } else if (5000 > sum) {
      setToProcent('5%');
      setYouHave(5000 - sum);
    } else if (10000 >= sum) {
      setToProcent('10%');
      setYouHave(10000 - sum);
    }
    setCurrentAmount(sum);
  };

  useEffect(() => {
    getPeronalDiscount();
  }, []);

  return (
    <div className="personal-discount">
      <h2>Персональна знижка</h2>
      <p>
        {currentAmount > 10000 ? (
          <>
            Ви отримуєте максимальну знижку <span>10%</span> загальна сума ваших
            замовлення <span>{currentAmount}</span>
          </>
        ) : (
          <>
            До отримання знижки <span>{toProcent}</span> Вам залишилось:
            <span> {youHave} ₴</span>
          </>
        )}
      </p>

      {/* Контейнер прогресу */}
      <div className="progress-container">
        <div className="levels">
          <div className="level">
            <DiamondSVG />
            <span>3%</span>
            <p>3 000,00 ₴</p>
          </div>
          <div className="level">
            <DiamondSVG />
            <span>5%</span>
            <p>5 000,00 ₴</p>
          </div>
          <div className="level">
            <DiamondSVG />
            <span>10%</span>
            <p>10 000,00 ₴</p>
          </div>
        </div>

        {/* Лінія прогресу */}
        <div className="progress-line">
          <div
            className={`line-point ${currentAmount >= 3000 ? 'active' : ''}`}
            style={{ left: '33%' }}
          ></div>
          <div
            className={`line-point ${currentAmount >= 5000 ? 'active' : ''}`}
            style={{ left: '66%' }}
          ></div>
          <div
            className={`line-point ${currentAmount >= 10000 ? 'active' : ''}`}
            style={{ left: '100%' }}
          ></div>
          <div
            className="current-progress"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDiscount;
