'use client';
import { Locale } from '@/i18n.config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './EmptyLikeOrBasket.scss';

type Props = {
  lang: Locale;
};

const EmptyLikeOrBasket = ({ lang }: Props) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="empty-like-or-basket">
      <div className="list-empty-block">
        <div className="empty-block"> Порожній</div>
        <div className="empty-block"> Порожній</div>
        <div className="empty-block"> Порожній</div>
        {width < 768 && <div className="empty-block">Порожній</div>}
      </div>
      <div className="empty-down-block">
        <button>
          <Link href={`/${lang}`}>Закрити</Link>
        </button>
      </div>
    </div>
  );
};

export default EmptyLikeOrBasket;
