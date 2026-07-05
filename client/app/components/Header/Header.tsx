import { Locale } from '@/i18n.config';
import React from 'react';
import './Header.scss';
import { headerDown, listUrlHeaderUp } from './listUrlHeader';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import LogoSVG from '../../assest/Logo.svg';
import Catalog from './Catalog';
import Search from './Search';
import NumberSVG from '../../assest/Header/Number.svg';
import { numberUrl } from '@/app/assest/info';
import SetLanguage from './SetLanguage';
import Like from './Like/Like';
import Auth from './Auth';
import Basket from './Basket/Basket';
import Burger from './Burger/Burger';
import ScriptToHeader from './ScriptToHeader';

const timeRevalidate: number = process.env.NEXT_PUBLIC_TIME_REVALIDATE
  ? parseInt(process.env.NEXT_PUBLIC_TIME_REVALIDATE)
  : 3600;

type Props = {
  lang: Locale;
};

// Функція отримання категорій з тайтлами підкатегорій
const getCategoriesWithTitleAndOther = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}product/categoriesWithSubcategories`,
      { next: { revalidate: timeRevalidate } }
    );

    if (!res.ok) {
      throw new Error(`Помилка отримання категорій: ${res.statusText}`);
    }


    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Header = async ({ lang }: Props) => {
  const header = (await getDictionary(lang)).Header;
  const { register, login } = await getDictionary(lang);
  const categoriesWithTitleAndOther = await getCategoriesWithTitleAndOther();
  const headerUp: any = header.HeaderUp;
  const HeaderDown: any = header.HeaderDown;
  return (
    <div className="header-container">
      <div className="header-up-container">
        <div className="header-up">
          {listUrlHeaderUp.map((x) => (
            <Link key={x.url} href={`/${lang}/${x.url}`}>
              {headerUp[x.name]}
            </Link>
          ))}
        </div>
      </div>
      <div className="header-app">
        <div id="headerToScroll" className="header">
          <div className="header-responsive">
            <div className="burger">
              <Burger
                catalog={categoriesWithTitleAndOther}
                lang={lang}
                dictionary={header.Burger}
              />
            </div>
            <Link className="logo" href={`/${lang}`}>
              <LogoSVG />
            </Link>
            <Catalog
              catalog={categoriesWithTitleAndOther}
              lang={lang}
              dictionary={header.Catalog}
            />
            <Search />
            <div className="number">
              <Link href={numberUrl}>
                <NumberSVG />+38 (093) 764-87-71
              </Link>
            </div>
            <SetLanguage lang={lang} />
            <div className="like-auth-basket">
              <Like lang={lang} dictionary={header.Like} />
              <Auth
                lang={lang}
                dictionary={header.Auth}
                registerDictionary={register}
                loginDictionary={login}
              />
              <Basket lang={lang} dictionary={header.Basket} />
            </div>
          </div>
        </div>
      </div>
      <div className="header-down">
        {headerDown.map((x: any, idx: any) => (
          <Link key={idx} href={`/${lang}/${x.url}`}>
            <x.svg />
            {HeaderDown[x.name]}
          </Link>
        ))}
      </div>
      <ScriptToHeader />
    </div>
  );
};

export default Header;
