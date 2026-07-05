'use client';
import { $authHost } from '@/app/http';
import React, { useState } from 'react';
import './AddCategory.scss';

const Page = () => {
  const [ukrName, setUkrName] = useState('');
  const [rusName, setRusName] = useState('');
  const [loading, setLoading] = useState(false);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSvgContent(event.target?.result as string);
      };
      reader.readAsText(file);
    } else {
      alert('Будь ласка, виберіть файл у форматі SVG');
    }
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ukrName.trim() || !rusName.trim() || !svgContent) {
      alert('Будь ласка, заповніть всі поля та завантажте SVG файл');
      return;
    }

    try {
      console.log(svgContent);
      setLoading(true);
      await $authHost.post('product/addCategory', {
        nameuk: ukrName,
        nameru: rusName,
        svg: svgContent, // Відправляємо SVG як рядок
      });

      alert('Категорію додано успішно!');
      setUkrName('');
      setRusName('');
      setSvgContent(null);
    } catch (error) {
      console.error('Помилка додавання категорії:', error);
      alert('Не вдалося додати категорію');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-category">
      <h1>Додати категорію</h1>
      <form onSubmit={add}>
        <label>Назва категорії ua</label>
        <input
          type="text"
          value={ukrName}
          onChange={(e) => setUkrName(e.target.value)}
        />

        <label>Назва категорії en</label>
        <input
          type="text"
          value={rusName}
          onChange={(e) => setRusName(e.target.value)}
        />

        <label>Завантажити SVG</label>
        <input type="file" accept=".svg" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? 'Завантаження...' : 'Додати'}
        </button>
      </form>
    </div>
  );
};

export default Page;
