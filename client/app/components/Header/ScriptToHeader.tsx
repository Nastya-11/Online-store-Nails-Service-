'use client';
import React, { useEffect } from 'react';

type Props = {};

const ScriptToHeader = (props: Props) => {
  useEffect(() => {
    const handleScroll = () => {
      const target = document.getElementById('headerToScroll');

      if (!target) return;
      if (window.innerWidth < 1024 || window.scrollY > 33) {
        // Наприклад, змінюємо фон і додаємо тінь
        target.style.position = 'fixed';
        target.style.top = '0';
        target.style.left = '0';
        target.style.minWidth = '100%';
        target.style.background = '#ffffff';
        target.style.padding = '7.5px 0';
      } else {
        // Повертаємо початкові стилі
        target.style.position = 'unset';
        target.style.padding = '0';
        target.style.top = '0';
        target.style.left = '0';
        target.style.minWidth = '100%';
        target.style.background = '#ffffff';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScriptToHeader;
