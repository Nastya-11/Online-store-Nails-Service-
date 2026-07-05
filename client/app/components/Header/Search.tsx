'use client';
import React, { useEffect, useState } from 'react';
import './Search.scss';

type Props = {};

const placeholderTexts = ['гель', 'лак', 'гель-лак'];

const Search = (props: Props) => {
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = placeholderTexts[wordIndex];

    const typingInterval = setTimeout(() => {
      // Додаємо наступну букву
      setPlaceholder(currentWord.slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }, 100);

    // Коли слово надруковане — пауза, потім нове слово
    if (charIndex === currentWord.length) {
      clearTimeout(typingInterval);
      setTimeout(() => {
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % placeholderTexts.length);
        setPlaceholder('');
      }, 2000); // Пауза перед наступним словом
    }

    return () => clearTimeout(typingInterval);
  }, [charIndex, wordIndex]);

  return (
    <div className="search-container">
      <input
        value={search}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="svg">
        {/* SVG тут залишив без змін */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="18" fill="white" />
          <g clip-path="url(#clip0_9_980)">
            <path
              d="M26.4199 25.4004L22.1484 20.9355C22.6992 20.2793 23.1211 19.5527 23.4141 18.7559C23.707 17.959 23.8535 17.127 23.8535 16.2598C23.8535 15.2637 23.6602 14.3262 23.2734 13.4473C22.8867 12.5566 22.3652 11.7832 21.709 11.127C21.0527 10.4707 20.2852 9.95508 19.4063 9.58008C18.5273 9.19336 17.584 9 16.5762 9C15.5801 9 14.6367 9.19336 13.7461 9.58008C12.8672 9.95508 12.0996 10.4707 11.4434 11.127C10.7871 11.7832 10.2656 12.5566 9.87891 13.4473C9.50391 14.3262 9.31641 15.2637 9.31641 16.2598C9.31641 17.2676 9.50391 18.2109 9.87891 19.0898C10.2656 19.9688 10.7871 20.7393 11.4434 21.4014C12.0996 22.0635 12.8672 22.582 13.7461 22.957C14.6367 23.3438 15.5801 23.5371 16.5762 23.5371C17.3262 23.5371 18.0557 23.4258 18.7646 23.2031C19.4736 22.9805 20.1328 22.6523 20.7422 22.2188L25.0664 26.7012C25.1484 26.7949 25.248 26.8682 25.3652 26.9209C25.4824 26.9736 25.6055 27 25.7344 27C25.8633 27 25.9834 26.9766 26.0947 26.9297C26.2061 26.8828 26.3086 26.8184 26.4023 26.7363C26.5898 26.5488 26.6865 26.3262 26.6924 26.0684C26.6982 25.8105 26.6074 25.5879 26.4199 25.4004ZM16.5762 10.8984C17.3145 10.8984 18.0117 11.0391 18.668 11.3203C19.3242 11.6016 19.8955 11.9854 20.3818 12.4717C20.8682 12.958 21.252 13.5293 21.5332 14.1855C21.8145 14.8301 21.9551 15.5215 21.9551 16.2598C21.9551 17.0098 21.8145 17.707 21.5332 18.3516C21.252 19.0078 20.8682 19.5791 20.3818 20.0654C19.8955 20.5518 19.3242 20.9355 18.668 21.2168C18.0117 21.498 17.3145 21.6387 16.5762 21.6387C15.8379 21.6387 15.1406 21.498 14.4844 21.2168C13.8398 20.9355 13.2744 20.5518 12.7881 20.0654C12.3018 19.5791 11.918 19.0078 11.6367 18.3516C11.3555 17.707 11.2148 17.0098 11.2148 16.2598C11.2148 15.5215 11.3555 14.8301 11.6367 14.1855C11.918 13.5293 12.3018 12.958 12.7881 12.4717C13.2744 11.9854 13.8398 11.6016 14.4844 11.3203C15.1406 11.0391 15.8379 10.8984 16.5762 10.8984Z"
              fill="#1E1E1E"
            />
          </g>
          <defs>
            <clipPath id="clip0_9_980">
              <rect
                width="18"
                height="18"
                fill="white"
                transform="matrix(1 0 0 -1 9 27)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Search;
