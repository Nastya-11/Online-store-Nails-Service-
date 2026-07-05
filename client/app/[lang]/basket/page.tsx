import Basket from '@/app/components/Basket/Basket';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import './Basket.scss';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { basket, miniGoods } = await getDictionary(lang);

  return (
    <div className="basket-page-container">
      <BreadCrumbs
        lang={lang}
        listUrls={[{ name: basket.title, url: 'basket' }]}
      />
      <h1>{basket.title}</h1>
      <Basket lang={lang} miniGoods={miniGoods} />
    </div>
  );
};

export default page;
