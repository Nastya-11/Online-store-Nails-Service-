'use client';
import getCategories from '@/app/functions/getCategories';
import { CategoryType } from '@/app/interfaces/Goods';
import React, { useEffect, useState } from 'react';
import { $authHost } from '@/app/http';
import './UpdateCategory.scss';

const Page = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [formData, setFormData] = useState({
    nameuk: '',
    nameru: '',
    svg: '',
  });

  const getCategory = async () => {
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (err) {
      console.error('Помилка при отриманні категорій:', err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSelectChange = (id: string) => {
    const selected = categories.find((cat) => cat.id === +id);
    if (selected) {
      setSelectedCategory(selected);
      setFormData({
        nameuk: selected.nameuk,
        nameru: selected.nameru,
        svg: selected.svg,
      });
    } else {
      setSelectedCategory(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    console.log(selectedCategory);
    if (!selectedCategory) return;
    try {
      await $authHost.post('product/updateCategory', {
        id: selectedCategory.id,
        ...formData,
      });
      alert('Категорію оновлено');
      getCategory(); // оновити список після редагування
    } catch (err) {
      alert('Помилка при оновленні категорії');
      console.error(err);
    }
  };

  return (
    <div className="category-update-container">
      <h2>Оновлення категорії</h2>

      <select
        onChange={(e) => handleSelectChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          категорія
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nameuk} / {cat.nameru}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <div className="form-section">
          <label>ua</label>
          <input
            type="text"
            name="nameuk"
            value={formData.nameuk}
            onChange={handleInputChange}
            placeholder="Назва ua"
          />
          <label>en</label>
          <input
            type="text"
            name="nameru"
            value={formData.nameru}
            onChange={handleInputChange}
            placeholder="Назва en"
          />
          <input
            type="file"
            accept=".svg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (event) => {
                const text = event.target?.result as string;
                setFormData((prev) => ({ ...prev, svg: text }));
              };
              reader.readAsText(file);
            }}
          />
          <button onClick={handleUpdate}>Оновити</button>
        </div>
      )}
    </div>
  );
};
export default Page;
