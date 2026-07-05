'use client';
import getCategories from '@/app/functions/getCategories';
import getSubcategory from '@/app/functions/getSubcategories';
import getSubcategoryTitles from '@/app/functions/getTittleSubcategories';
import React, { useEffect, useState } from 'react';
import './AddProduct.scss';
import getBrend from '@/app/functions/getBrend';
import getCountryMade from '@/app/functions/getCountryMade';
import { $authHost } from '@/app/http';
import getCategoryFilter from '@/app/functions/getFilter';

const Page = () => {
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
  const [categoryId, setCategoryId] = useState('0');
  const [subcategoryTitleId, setSubcategoryTitleId] = useState('0');
  const [subcategoryId, setSubcategoryId] = useState('0');
  const [listBrends, setListBrends] = useState<
    { id: number; nameuk: string; nameru: string }[]
  >([]);
  const [brendId, setBrendId] = useState('0');
  const [listCountryMade, setListCountryMade] = useState<
    { id: number; nameuk: string; nameru: string }[]
  >([]);
  const [countryMadeId, setCountryMadeId] = useState('0');
  //const [listFilterCategor]
  const [listFiltersCategory, setListFilterCategories] = useState<
    { id: number; nameuk: string; nameru: string; categoryId: number }[]
  >([]);
  const [listCategory, setListCategory] = useState<
    { id: number; nameuk: string; nameru: string }[]
  >([]);
  const [listSubcategoryTitle, setListSubcategoryTitle] = useState<
    { id: number; nameuk: string; nameru: string; categoryId: number }[]
  >([]);
  const [listSubcategory, setListSubcategory] = useState<
    {
      id: number;
      nameuk: string;
      nameru: string;
      categoryId: number;
      subcategoryTitleId: number;
    }[]
  >([]);
  const [imgs, setImgs] = useState<File[]>([]);
  const getListCategory = async () => {
    setListCategory(await getCategories());
  };
  const getListBrends = async () => {
    setListBrends(await getBrend());
  };
  const getListCountryMade = async () => {
    setListCountryMade(await getCountryMade());
  };
  useEffect(() => {
    getListCategory();
    getListBrends();
    getListCountryMade();
  }, []);
  const getListSubcategoryTitle = async () =>
    setListSubcategoryTitle(await getSubcategoryTitles(categoryId));
  const getListCategoryFilter = async () => {
    setListFilterCategories(await getCategoryFilter(categoryId));
  };
  useEffect(() => {
    if (categoryId != '0') {
      getListSubcategoryTitle();
      getListCategoryFilter();
    } else {
      setListSubcategoryTitle([]);
      setListFilterCategories([]);
    }
  }, [categoryId]);

  const getListSubcategory = async () =>
    setListSubcategory(await getSubcategory(subcategoryTitleId));
  useEffect(() => {
    if (subcategoryTitleId != '0') {
      getListSubcategory();
    } else setListSubcategory([]);
  }, [subcategoryTitleId]);

  const setDiscountAndToCountPriceWithDiscount = (value: number) => {
    setDiscount(value);
    setPriceWithDiscount(price - (price * value) / 100);
  };

  const setPriceWithDiscountAndToCountDiscount = (value: number) => {
    if (price === 0) return; // Запобігаємо діленню на 0

    const calculatedDiscount = ((price - value) / price) * 100;

    setPriceWithDiscount(value);
    setDiscount(calculatedDiscount);
  };

  const [filtersValues, setFiltersValues] = useState<
    { id: number; valueuk: string; valueru: string }[]
  >([]);

  // Оновлення значень фільтрів при введенні
  const handleFilterChange = (
    id: number,
    field: 'valueuk' | 'valueru',
    value: string
  ) => {
    setFiltersValues((prev) =>
      prev.some((f) => f.id === id)
        ? prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
        : [...prev, { id, valueuk: '', valueru: '', [field]: value }]

    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(4345, subcategoryId, subcategoryTitleId);

    const formData = new FormData();
    formData.append('nameuk', nameuk);
    formData.append('nameru', nameru);
    formData.append('descriptionuk', descriptionuk);
    formData.append('descriptionru', descriptionru);
    formData.append('price', String(price));
    formData.append('discount', String(discount));
    formData.append('priceWithDiscount', String(priceWithDiscount));
    formData.append('isAvaibility', String(isAvaibility));
    formData.append('isHit', String(isHit));
    formData.append('isNovetly', String(isNovetly));
    formData.append('cod', cod);
    formData.append('categoryId', categoryId);
    formData.append('subcategoryTitleId', subcategoryTitleId);
    formData.append('subcategoryId', subcategoryId);
    formData.append('brendId', brendId);
    formData.append('countryMadeId', countryMadeId);

    // Додаємо всі зображення
    imgs.forEach((img, index) => {
      formData.append(`imgs[${index}]`, img);
    });

    // Додаємо фільтри у вигляді JSON
    console.log(filtersValues);
    formData.append('filters', JSON.stringify(filtersValues));
    console.log(34, filtersValues);

    try {
      const res = await $authHost.post('product/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);
      alert('Успішно додано');

      
    } catch (err) {
      console.log('Помилка: ', err);
      alert('Помилка при додаванні товару');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImgs((prevImgs) => [...prevImgs, ...filesArray]); 
    }
  };
  console.log(subcategoryTitleId, subcategoryId);

  return (
    <div className="add-product">
      <h1>Додати товар</h1>
      <form onSubmit={submit}>
        <label>Виберіть категорію</label>
        <select
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubcategoryTitleId('0');
            setSubcategoryId('0');
          }}
        >
          <option value={'0'}>категорія</option>
          {listCategory.map((x) => (
            <option key={x.id} value={x.id}>
              {x.nameuk} / {x.nameru}
            </option>
          ))}
        </select>
        {listSubcategoryTitle.length > 0 && (
          <>
            <label>Виберіть заголовок підкатегорії</label>
            <select
              onChange={(e) => {
                setSubcategoryTitleId(e.target.value);
                setSubcategoryId('0');
              }}
            >
              <option value={'0'}>заголовок підкатегорії</option>
              {listSubcategoryTitle.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.nameuk} / {x.nameru}
                </option>
              ))}
            </select>
          </>
        )}
        {listSubcategory.length > 0 && (
          <>
            <label>Виберіть підкатегорію</label>
            <select onChange={(e) => setSubcategoryId(e.target.value)}>
              <option value={'0'}>підкатегорія</option>
              {listSubcategory.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.nameuk} / {x.nameru}
                </option>
              ))}
            </select>
          </>
        )}
        <label>Виберіть бренд</label>
        <select onChange={(e) => setBrendId(e.target.value)}>
          <option value={'0'}>бренд</option>
          {listBrends.map((x) => (
            <option key={x.id} value={x.id}>
              {x.nameuk} / {x.nameru}
            </option>
          ))}
        </select>
        <label>Країна виробник</label>
        <select onChange={(e) => setCountryMadeId(e.target.value)}>
          <option value={'0'}>країна виробник</option>
          {listCountryMade.map((x) => (
            <option key={x.id} value={x.id}>
              {x.nameuk} / {x.nameru}
            </option>
          ))}
        </select>
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
          type="text"
          value={Number(price)}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <label>Знижка (%)</label>
        <input
          type="text"
          value={Number(discount)}
          onChange={(e) =>
            setDiscountAndToCountPriceWithDiscount(Number(e.target.value))
          }
        />
        <label>Фактична ціна</label>
        <input
          type="text"
          value={priceWithDiscount}
          onChange={(e) =>
            setPriceWithDiscountAndToCountDiscount(Number(e.target.value))
          }
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
        <label>Виберіть зображення</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {/* Відображення обраних зображень */}
        <div className="image-preview">
          {imgs.map((img, index) => (
            <div key={index} className="image-item">
              <img
                src={URL.createObjectURL(img)}
                alt={`preview-${index}`}
                width={100}
              />
              <button
                type="button"
                onClick={() => setImgs(imgs.filter((_, i) => i !== index))}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
        
        <p>Фільтри категорії:</p>
        {listFiltersCategory.map((x) => (
          <div key={x.id}>
            <label>{x.nameuk}</label>
            <input
              type="text"
              value={filtersValues.find((f) => f.id === x.id)?.valueuk || ''}
              onChange={(e) =>
                handleFilterChange(x.id, 'valueuk', e.target.value)
              }
            />
            <br /><br />
            <label>{x.nameru}</label>
            <input
              type="text"
              value={filtersValues.find((f) => f.id === x.id)?.valueru || ''}
              onChange={(e) =>
                handleFilterChange(x.id, 'valueru', e.target.value)
              }
            />
            <br /><br /><br />
          </div>
        ))}
        <button>Додати</button>
      </form>
    </div>
  );
};

export default Page;
