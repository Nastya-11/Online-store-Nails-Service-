'use client';
import React, { useState, useEffect } from 'react';
import { $authHost } from '@/app/http';
import './AddSubcategory.scss';

const Page = () => {
  const [ukrName, setUkrName] = useState('');
  const [rusName, setRusName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryTitleId, setSubcategoryTitleId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategoryTitles, setSubcategoryTitles] = useState([]);
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

  useEffect(() => {
    const fetchSubcategoryTitles = async () => {
      if (!categoryId) return;
      try {
        const { data } = await $authHost.get(
          `product/getTitleSubcategories?categoryId=${categoryId}`
        );
        setSubcategoryTitles(data.res);
      } catch (error) {
        console.error('Помилка отримання заголовків підкатегорій:', error);
      }
    };
    fetchSubcategoryTitles();
  }, [categoryId]);

  const addSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !ukrName.trim() ||
      !rusName.trim() ||
      !categoryId.trim() ||
      !subcategoryTitleId.trim()
    ) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      setLoading(true);
      const res = await $authHost.post('product/addSubcategory', {
        nameuk: ukrName,
        nameru: rusName,
        categoryId,
        subcategoryTitleId,
      });
      alert('Підкатегорію успішно додано!');
      setUkrName('');
      setRusName('');
      setCategoryId('');
      setSubcategoryTitleId('');
    } catch (error) {
      console.error('Помилка додавання підкатегорії:', error);
      alert('Не вдалося додати підкатегорію');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-subcategory">
      <h1>Додати підкатегорію</h1>
      <form onSubmit={addSubcategory}>
        <label>Назва підкатегорії ua</label>
        <input
          type="text"
          value={ukrName}
          onChange={(e) => setUkrName(e.target.value)}
        />
        <label>Назва підкатегорії en</label>
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
        <label>Виберіть заголовок підкатегорії</label>
        <select
          value={subcategoryTitleId}
          onChange={(e) => setSubcategoryTitleId(e.target.value)}
        >
          <option value="">заголовок підкатегорії</option>
          {subcategoryTitles.map((title: any) => (
            <option key={title.id} value={title.id}>
              {title.nameuk} / {title.nameru}
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
