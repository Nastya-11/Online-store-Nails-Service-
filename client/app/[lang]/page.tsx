import { Locale } from '@/i18n.config';
import './Home.scss';
import MySlider from '../components/Home/MySlider';
import ListBrend from '../components/Home/ListBrend';
import ShowOther from '../components/Home/ShowOther';
import СurrentDiscount from '../components/Home/СurrentDiscount';
import { getDictionary } from '@/lib/dictionary';
import ListAdvantages from '../components/Home/ListAdvantages';
import ProductList from '../components/Goods/ProductList';

const timeRevalidate: number = process.env.NEXT_PUBLIC_TIME_REVALIDATE
  ? parseInt(process.env.NEXT_PUBLIC_TIME_REVALIDATE)
  : 3600;

/*const getProducts = async (searchParams: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}product/products?${searchParams}`,
      { next: { revalidate: timeRevalidate } }
    );

    if (!res.ok) {
      throw new Error(`Помилка отримання продуктів: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return { products: [], total: 0 };
  }
};*/

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { Home, currentDiscount, miniGoods } = await getDictionary(lang);
  //const novetly = (await getProducts('sort=novetly&limit=10')).products;
  //const discount = (await getProducts('sort=hit&limit=10')).products;
  //const hit = (await getProducts('sort=hit&limit=10')).products;
  return (
    <div className="home">
      <MySlider
        sliders={[
          { id: 1, img: '/images/img1.png' },
          { id: 1, img: '/images/img2.png' },
          { id: 1, img: '/images/img3.png' },
          { id: 1, img: '/images/img4.png' },
          { id: 1, img: '/images/img5.png' },
        ]}
      />
      <ListBrend />
      <div className="prod">
        <h2>{Home.novetly}</h2>
        <ShowOther
          lang={lang}
          searchParams={'sort=novetly'}
          dictrionaryMiniGoods={miniGoods}
        />
        <h2>{Home.withDiscount}</h2>
        <ShowOther
          lang={lang}
          searchParams={'sort=discount'}
          dictrionaryMiniGoods={miniGoods}
        />
        <h2>{Home.lider}</h2>
        <ShowOther
          lang={lang}
          searchParams={'sort=hit'}
          dictrionaryMiniGoods={miniGoods}
        />
      </div>
      <СurrentDiscount lang={lang} dictionary={currentDiscount} />
      <ListAdvantages lang={lang} />
    </div>
  );
}
