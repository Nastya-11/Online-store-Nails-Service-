import Basket from '@/app/components/Basket/Basket';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import './Like.scss';
import LikePage from './LikePage';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { like, miniGoods } = await getDictionary(lang);

  return (
    <div className="like-page-container">
      <BreadCrumbs lang={lang} listUrls={[{ name: like.title, url: 'like' }]} />
      <h1>{like.title}</h1>
      <LikePage miniGoods={miniGoods} lang={lang} />
    </div>
  );
};

export default page;
