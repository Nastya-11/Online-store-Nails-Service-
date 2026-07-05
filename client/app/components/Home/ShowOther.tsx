'use client';
import React, { useEffect, useRef, useState } from 'react';
import './ShowOther.scss';
import { Locale } from '@/i18n.config';
import { Product } from '@/app/interfaces/Goods';
import ProductList from '../Goods/ProductList';
import { $host } from '@/app/http';

type Props = {
  lang: Locale;
  dictrionaryMiniGoods: any;
  searchParams: any;
};

const ShowOther = ({ lang, dictrionaryMiniGoods, searchParams }: Props) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const showOtherRef = useRef<any>(null);

  const [itemsPerRow, setItemsPerRow] = useState(0);

  const updateItemsPerRow = () => {
    if (window.innerWidth < 500) {
      setItemsPerRow(4);
      return;
    }
    if (!showOtherRef.current) return;
    const containerWidth = showOtherRef.current.clientWidth;
    const itemWidth = 220 + 10; // ширина + gap (можна гнучко)
    const items = Math.floor(containerWidth / itemWidth);
    setItemsPerRow(items * 2 || 1);
  };

  useEffect(() => {
    if (showOtherRef != null) {
      updateItemsPerRow();
    }
    window.addEventListener('resize', updateItemsPerRow);
    return () => window.removeEventListener('resize', updateItemsPerRow);
  }, [showOtherRef]);

  const getProducts = async () => {
    try {
      const res = await $host.get(
        `product/products?${searchParams}&page=${page}&limit=${itemsPerRow}`
      );
      return res.data.products;
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    if (itemsPerRow == 0) return;
    const setStartproduct = async () => {
      if (page == 1) {
        const newProduct = await getProducts();
        if (newProduct.length != itemsPerRow) setIsFinish(true);
        setProducts(newProduct);
        setPage(2);
      }
    };
    setStartproduct();
  }, [itemsPerRow]);

  const showMore = async () => {
    const newProduct = await getProducts();
    if (newProduct.length != itemsPerRow) setIsFinish(true);
    setProducts([...products, ...newProduct]);
    setPage(page + 1);
  };

  return (
    <div ref={showOtherRef} className="show-other-container">
      {products.length > 0 && (
        <ProductList
          lang={lang}
          dictrionaryMiniGoods={dictrionaryMiniGoods}
          products={products}
        />
      )}
      {!isFinish && (
        <div onClick={showMore} className="show-other">
          {lang == 'ru' ? 'Show other' : 'Показати ще'}
        </div>
      )}
    </div>
  );
};

export default ShowOther;
