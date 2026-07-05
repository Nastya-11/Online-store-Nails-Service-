'use client';

import { Locale } from '@/i18n.config';
import React, { useEffect, useState } from 'react';
import { $authHost } from '@/app/http';
import { useRouter } from 'next/navigation';
import './EditProduct.scss';

type Props = {
  params: { lang: Locale; id: string };
};

const UpdateProductPage = ({ params: { id } }: Props) => {
  // Стан для форми
  const [nameuk, setNameuk] = useState('');
  const [nameru, setNameru] = useState('');
  const [descriptionuk, setDescriptionuk] = useState('');
  const [descriptionru, setDescriptionru] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [isAvaibility, setIsAvaibility] = useState(true);
  const [isHit, setIsHit] = useState(false);
  const [isNovetly, setIsNovetly] = useState(false);
  const [cod, setCod] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryTitleId, setSubcategoryTitleId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [brendId, setBrendId] = useState('');
  const [countryMadeId, setCountryMadeId] = useState('');
  const [filtersValues, setFiltersValues] = useState<
    { id: number; valueuk: string; valueru: string; filterCategoryId: number }[]
  >([]);
  const [filterCategories, setFilterCategories] = useState<
    { id: number; nameuk: string; nameru: string }[]
  >([]);

  // Завантажуємо всі фільтри категорії при відкритті сторінки
  useEffect(() => {
    if (categoryId) {
      const fetchFilterCategories = async () => {
        try {
          const { data } = await $authHost.get(
            'product/getCategoryFilter?categoryId=' + categoryId
          ); // Запит до API
          setFilterCategories(data.res);
        } catch (err) {
          console.error('Помилка завантаження категорій фільтрів:', err);
        }
      };

      fetchFilterCategories();
    }
  }, [categoryId]);

  // Завантаження даних про товар при відкритті сторінки
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await $authHost.get(`product/getProduct?id=${id}`);
        setNameuk(data.nameuk);
        setNameru(data.nameru);
        setDescriptionuk(data.descriptionuk);
        setDescriptionru(data.descriptionru);
        setPrice(data.price);
        setDiscount(data.discount);
        setPriceWithDiscount(data.priceWithDiscount);
        setIsAvaibility(data.isAvaibility);
        setIsHit(data.isHit);
        setIsNovetly(data.isNovetly);
        setCod(data.cod);
        setCategoryId(String(data.categoryId));
        setSubcategoryTitleId(String(data.subcategoryTitleId));
        setSubcategoryId(String(data.subcategoryId));
        setBrendId(String(data.brendId));
        setCountryMadeId(String(data.countryMadeId));
        setFiltersValues(data.productCategoryFilters || []);
      } catch (err) {
        console.error('Помилка завантаження товару:', err);
      }
    };

    fetchProduct();
  }, [id]);

  // Оновлення значень фільтрів при введенні
  const handleFilterChange = (
    id: number,
    field: 'valueuk' | 'valueru',
    value: string
  ) => {
    setFiltersValues((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  // Відправка оновлених даних на сервер
  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await $authHost.put('product/updateProduct', {
        id,
        nameuk,
        nameru,
        descriptionuk,
        descriptionru,
        price,
        discount,
        priceWithDiscount,
        isAvaibility,
        isHit,
        isNovetly,
        cod,
        categoryId,
        subcategoryTitleId,
        subcategoryId,
        brendId,
        countryMadeId,
        filters: JSON.stringify(filtersValues),
      });

      alert('Товар успішно оновлено');
    } catch (err) {
      console.error('Помилка оновлення товару:', err);
      alert('Помилка оновлення товару');
    }
  };

  return (
    <div className="update-product">
      <h1>Оновити товар</h1>
      <form onSubmit={updateProduct}>
        <label>Назва товару ua</label>
        <input
          type="text"
          value={nameuk}
          onChange={(e) => setNameuk(e.target.value)}
        />

        <label>Назва товару en</label>
        <input
          type="text"
          value={nameru}
          onChange={(e) => setNameru(e.target.value)}
        />

        <label>Опис товару ua</label>
        <textarea
          value={descriptionuk}
          onChange={(e) => setDescriptionuk(e.target.value)}
        />

        <label>Опис товару en</label>
        <textarea
          value={descriptionru}
          onChange={(e) => setDescriptionru(e.target.value)}
        />

        <label>Ціна</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Знижка (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />

        <label>Фактична ціна</label>
        <input
          type="number"
          value={priceWithDiscount}
          onChange={(e) => setPriceWithDiscount(Number(e.target.value))}
        />

        <label>Є в наявності?</label>
        <input
          type="checkbox"
          checked={isAvaibility}
          onChange={(e) => setIsAvaibility(e.target.checked)}
        />

        <label>Це хіт?</label>
        <input
          type="checkbox"
          checked={isHit}
          onChange={(e) => setIsHit(e.target.checked)}
        />

        <label>Це новинка?</label>
        <input
          type="checkbox"
          checked={isNovetly}
          onChange={(e) => setIsNovetly(e.target.checked)}
        />

        <label>Код</label>
        <input
          type="text"
          value={cod}
          onChange={(e) => setCod(e.target.value)}
        />
        <h3>Фільтри товару</h3>
        {filterCategories.length > 0 &&
          filtersValues.map((filter) => {
            const filterCategory = filterCategories.find(
              (cat) => cat.id === filter.filterCategoryId
            );

            return (
              <div key={filter.id}>
                <label>
                  {filterCategory ? filterCategory.nameuk : 'Невідомий фільтр'}
                </label>
                <input
                  type="text"
                  value={filter.valueuk}
                  onChange={(e) =>
                    handleFilterChange(filter.id, 'valueuk', e.target.value)
                  }
                />
                <br /><br />
                <label>
                  {filterCategory ? filterCategory.nameru : 'Невідомий фільтр'}
                </label>
                <input
                  type="text"
                  value={filter.valueru}
                  onChange={(e) =>
                    handleFilterChange(filter.id, 'valueru', e.target.value)
                  }
                />
                <br /><br />
              </div>
            );
          })}

        <button type="submit">Оновити товар</button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
