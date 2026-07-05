'use client';
import React, { useState, useEffect } from 'react';
import { $authHost } from '@/app/http';
import './AddTitleSubcategory.scss';

const Page = () => {
  const [ukrName, setUkrName] = useState('');
  const [rusName, setRusName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await $authHost.get('product/getCategories');
        setCategories(data.res);
      } catch (error) {
        console.error('Помилка отримання категорій:', error);
      }
    };
    fetchCategories();
  }, []);

  const addTitleSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ukrName.trim() || !rusName.trim() || !categoryId.trim()) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      setLoading(true);
      const res = await $authHost.post('product/addTitleSubcategories', {
        nameuk: ukrName,
        nameru: rusName,
        categoryId,
      });
      alert('Підкатегорію успішно додано!');
      setUkrName('');
      setRusName('');
      setCategoryId('');
    } catch (error) {
      console.error('Помилка додавання підкатегорії:', error);
      alert('Не вдалося додати підкатегорію');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-title-subcategory">
      <h1>Додати заголовок підкатегорії</h1>
      <form onSubmit={addTitleSubcategory}>
        <label>Назва ua</label>
        <input
          type="text"
          value={ukrName}
          onChange={(e) => setUkrName(e.target.value)}
        />
        <label>Назва en</label>
        <input
          type="text"
          value={rusName}
          onChange={(e) => setRusName(e.target.value)}
        />
        <label>Виберіть категорію</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">категорія</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.nameuk} / {category.nameru}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Завантаження...' : 'Додати'}
        </button>
      </form>
    </div>
  );
};

export default Page;
