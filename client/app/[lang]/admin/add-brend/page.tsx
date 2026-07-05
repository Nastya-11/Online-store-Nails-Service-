'use client';
import { $authHost } from '@/app/http';
import React, { useState } from 'react';
import './AddCategory.scss';

const Page = () => {
  const [nameua, setNameua] = useState('');
  const [nameru, setNameru] = useState('');
  const [loading, setLoading] = useState(false);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameua.trim() || !nameru.trim()) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      setLoading(true);
      const res = await $authHost.post('product/addBrend', {
        nameuk: nameua,
        nameru,
      });
      console.log(res);
      alert('Бренд> додано успішно!');
      setNameua('');
      setNameru('');
    } catch (error) {
      console.error('Помилка додавання бренду:', error);
      alert('Не вдалося додати бренд');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-category">
      <h1>Додати бренд</h1>
      <form onSubmit={add}>
        <label>Назва бренду ua</label>
        <input
          type="text"
          value={nameua}
          onChange={(e) => setNameua(e.target.value)}
        />
        <label>Назва бренду en</label>
        <input
          type="text"
          value={nameru}
          onChange={(e) => setNameru(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Завантаження...' : 'Додати'}
        </button>
      </form>
    </div>
  );
};

export default Page;
