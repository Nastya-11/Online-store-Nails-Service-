'use client';
import { Locale } from '@/i18n.config';
import React, { useEffect, useState } from 'react';
import './MakeOrder.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import PhoneInputComponent from './PhoneInputComponent';
import CallSVG from '../../assest/MakeOrder/Call.svg';
import Link from 'next/link';
import ProductMakeOrder from './ProductMakeOrder';
import SelectLocality from './SelectLocality';
import TypeDelivery from './TypeDelivery';
import NewPostSVG from '../../assest/MakeOrder/newPost.svg';
import UkrPostSVG from '../../assest/MakeOrder/ukrPost.svg';
import SelfPickupSVG from '../../assest/MakeOrder/selfPickup.svg';
import DeliveryDepartment from './DeliveryDepartment';
import DeliveryPostomat from './DeliveryPostomat';
import UkrPostDelivery from './UkrPostDelivery';
import SelfPickup from './SelfPickup';
import NoSelectLocality from './NoSelectLocality';
import TypePay from './TypePay';
import ImposedSVG from '../../assest/MakeOrder/Imposed.svg';
import OnlineSVG from '../../assest/MakeOrder/Online.svg';
import { setIsLoginOpen } from '@/app/store/reducers/authSlice';

type Props = {
  lang: Locale;
};

const MakeOrder = ({ lang }: Props) => {
  const dispatch = useDispatch();
  const [nameAndSurname, setNameAndSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { listBasket } = useSelector((state: RootState) => state.basket);
  const user = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (user.isAuthenticated) {
      setEmail(user.email);
      setPhone(user.phone);
      setNameAndSurname(user.name + ' ' + user.surname);
    }
  }, [user]);
  const [localityId, setLocalityId] = useState<undefined | string>(undefined);
  const [localityName, setLocalityName] = useState('');
  const [typeDelivery, setTypeDelivery] = useState(0);
  const [infoDelivery, setInfoDelivery] = useState({ isTrue: false });

  const [typePay, setTypePay] = useState(0);

  const [coment, setComent] = useState('');

  const [sumCount, setSumCount] = useState(0);
  const [sumGrn, setSumGrn] = useState(0);

  const [isAllTrue, setIsAllTrue] = useState(false);

  useEffect(() => {
    let resCount = 0;
    listBasket.forEach((x) => (resCount += x.count));
    setSumCount(resCount);
    let resSum = 0;
    listBasket.forEach((x) => (resSum += x.count * x.priceWithDiscount));

    setSumGrn(Math.floor(resSum * 100) / 100);
  }, [listBasket]);
  useEffect(() => {
    const nameRegex =
      /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ’']{2,}([ -]+[A-Za-zА-Яа-яЁёЇїІіЄєҐґ’']{2,})+$/;

    const phoneUkraineRegex = /^380\d{9}$/;

    const phoneInternationalRegex = /^\d{7,15}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const isNameValid = nameRegex.test(nameAndSurname);
    let isPhoneValid = phone.startsWith('380')
      ? phoneUkraineRegex.test(phone)
      : phoneInternationalRegex.test(phone);
    const isEmailValid = emailRegex.test(email);
    const isDeliveryValid = infoDelivery.isTrue;
    const isPaymentValid = typePay !== 0;

    
    setIsAllTrue(
      isNameValid &&
        isPhoneValid &&
        isEmailValid &&
        isDeliveryValid &&
        isPaymentValid
    );
  }, [nameAndSurname, phone, email, infoDelivery, typePay]);

  const makeOrder = async () => {
  const res = await fetch('http://localhost:4444/api/sendTelegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameAndSurname,
      phone,
      email,
      comment: coment,
      products: listBasket,
      totalPrice: sumGrn,
      deliveryType: typeDelivery,
      deliveryInfo: infoDelivery,
      paymentType: typePay,
    }),
  });

  if (res.ok) {
    alert('Замовлення відправлено!');
  } else {
    alert('Помилка надсилання замовлення.');
  }
};


  return (
    <div className="make-order">
      <div className="date-order">
        <div className="user">
          <div className="title">
            <div className="number-cont">
              <div className="number">1</div>
              <span>Покупець</span>
            </div>
            <div className="login">
              {!user.isAuthenticated && (
                <button
                  onClick={() => dispatch(setIsLoginOpen({ isOpen: true }))}
                >
                  Увійти
                </button>
              )}
            </div>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Прізвище та Ім’я *"
              value={nameAndSurname}
              onChange={(e) => setNameAndSurname(e.target.value)}
            />
            <PhoneInputComponent value={phone} onChange={setPhone} />
            <input
              type="text"
              placeholder="Електронна пошта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="line-mobile" />
        </div>
        <div className="your-order-cont">
          <div className="your-order-header">
            <div className="title">Ваше замовлення</div>
            <Link href={'tel:380939873151'} className="edit">
              <CallSVG />
              Редагувати
            </Link>
          </div>
        </div>
        <div className="list-bask-cont">
          <div className="list-bask-header">
            <div className="product">Товар</div>
            <div className="price-one">Ціна одиниці</div>
            <div className="count">Кількість</div>
            <div className="all-sum">Загальна ціна</div>
          </div>
          <div className="list-bask">
            {listBasket.map((x) => (
              <ProductMakeOrder product={x} key={x.id} lang={lang} />
            ))}
          </div>
        </div>
        <br />
        <div className="number-cont">
          <div className="number">2</div>
          <span>Доставка</span>
        </div>

        <SelectLocality
          localityId={localityId}
          setLocalityId={setLocalityId}
          localityName={localityName}
          setLocalityName={setLocalityName}
          lang={lang}
        />
        <div className="list-type-delivery">
          <TypeDelivery
            Svg={NewPostSVG}
            title="Відділення Нова Пошта (безкоштовно від 1500 грн)"
            description="Термін доставки 1-3 дні | Накладений платіж або Повна оплата"
            isSelect={typeDelivery == 1}
            setSelect={setTypeDelivery}
            id={1}
          >
            {localityId == undefined ? (
              <NoSelectLocality
                text="Спочатку виберіть населений пункт"
                setInfoDelivery={setInfoDelivery}
              />
            ) : (
              <DeliveryDepartment
                localityId={localityId}
                infoDelivery={infoDelivery}
                setInfoDelivery={setInfoDelivery}
                lang={lang}
              />
            )}
          </TypeDelivery>
          <TypeDelivery
            Svg={NewPostSVG}
            title="Поштомат Нова Пошта (безкоштовно від 1000 грн)"
            description="Термін доставки 1-3 дні | Накладений платіж або Повна оплата"
            isSelect={typeDelivery == 2}
            setSelect={setTypeDelivery}
            id={2}
          >
            {localityId == undefined ? (
              <NoSelectLocality
                text="Спочатку виберіть населений пункт"
                setInfoDelivery={setInfoDelivery}
              />
            ) : (
              <DeliveryPostomat
                localityId={localityId}
                infoDelivery={infoDelivery}
                setInfoDelivery={setInfoDelivery}
                lang={lang}
              />
            )}
          </TypeDelivery>
          <TypeDelivery
            Svg={UkrPostSVG}
            title="Відділення Укрпошта (безкоштовно від 1000 грн)"
            description="Термін доставки 3-5 днів | Повна оплата"
            isSelect={typeDelivery == 3}
            setSelect={setTypeDelivery}
            id={3}
          >
            {localityId == undefined ? (
              <NoSelectLocality
                text="Спочатку виберіть населений пункт"
                setInfoDelivery={setInfoDelivery}
              />
            ) : (
              <UkrPostDelivery
                  infoDelivery={infoDelivery}
                  setInfoDelivery={setInfoDelivery}
                  lang={lang}
                  text="Введіть поштовий індекс відділення Укрпошти"
                />
            )}
          </TypeDelivery>
          <TypeDelivery
            Svg={SelfPickupSVG}
            title="Самовивіз"
            description="Заздалегіть домовлятися про зустріч із продавцем"
            isSelect={typeDelivery == 4}
            setSelect={setTypeDelivery}
            id={4}
          >
            <SelfPickup
              setInfoDelivery={setInfoDelivery}
              text="З вами зв'яжеться менеджер"
            />
          </TypeDelivery>
        </div>
        <br />
        <div className="number-cont">
          <div className="number">3</div>
          <span>Оплата</span>
        </div>
        <div className="list-type-pay">
          <TypePay
            id={1}
            setId={setTypePay}
            text="Накладений платіж"
            isSelect={typePay == 1}
            SVG={ImposedSVG}
          />
          <TypePay
            id={2}
            setId={setTypePay}
            text="Повна оплата на рахунок ФОП"
            isSelect={typePay == 2}
            SVG={OnlineSVG}
          />
        </div>
        <div className="coment">
          <h2>Примітка покупця</h2>
          <textarea
            value={coment}
            onChange={(e) => setComent(e.target.value)}
            rows={4}
          />
        </div>
      </div>
      <div className="sum-cont">
        <div className="sum">
          <h2>Сума замовлення</h2>
          <div className="row">
            <p>Кількість товару:</p>
            <span>{sumCount} шт.</span>
          </div>
          <div className="row">
            <p>Сума:</p>
            <span>{sumGrn} грн.</span>
          </div>
          <div className="line-sum" />
          <div className="row">
            <p>Вартість замовлення</p>
            <h3>{sumGrn} грн.</h3>
          </div>
          <button onClick={makeOrder} disabled={!isAllTrue}>
            Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeOrder;
