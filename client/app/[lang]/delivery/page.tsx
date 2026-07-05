import { Locale } from '@/i18n.config';
import './Delivery.scss';
import { getDictionary } from '@/lib/dictionary';
import DeliverySVG from '../../assest/DeliveryCookiesAndOther/Delivery.svg';
import NewPostSVG from '../../assest/DeliveryCookiesAndOther/NewPost.svg';
import UkrPostSVG from '../../assest/DeliveryCookiesAndOther/UkrPost.svg';
import BreadCrumbs from '@/app/components/utils/BreadCrumbs';

type Props = {
  params: { lang: Locale };
};

const Page = async ({ params: { lang } }: Props) => {
  const { delivery } = await getDictionary(lang);
  return (
    <div className="delivery-container">
      <BreadCrumbs
        lang={lang}
        listUrls={[{ name: delivery.title, url: 'delivery' }]}
      />
      <div className="delivery-main">
        <div className="main-title">
          <h1>{delivery.title}</h1>
          <div className="line" />
        </div>
        <div className="block">
          <h2
            style={{
              textAlign: 'center',
              margin: '30px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {delivery.miniTitle1}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: delivery.description1 }} />
        </div>
        <div className="block">
          <h3>{delivery.miniTitle2}</h3>
          <ul>
            {delivery.ul1.map((x, idx) => (
              <li key={idx}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="block">
          <h3>{delivery.miniTitle3}</h3>
          <p dangerouslySetInnerHTML={{ __html: delivery.description3 }} />
        </div>
        <div className="block">
          <h3>{delivery.miniTitle4}</h3>
          <p dangerouslySetInnerHTML={{ __html: delivery.description4 }} />
        </div>
        <div className="block">
          <h3>{delivery.miniTitle5}</h3>
          <p dangerouslySetInnerHTML={{ __html: delivery.description5 }} />
        </div>
        <div className="block">
          <h3>{delivery.miniTitle6}</h3>
          <ul>
            {delivery.ul2.map((x, idx) => (
              <li key={idx}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="block">
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '30px 0',
            }}
          >
            {delivery.ukrPost}
          </h2>
          <p dangerouslySetInnerHTML={{ __html: delivery.description7 }} />
        </div>
        <div className="block">
          <h3>{delivery.miniTitle8}</h3>
          <p dangerouslySetInnerHTML={{ __html: delivery.description8 }} />
        </div>
        <div className="block">
          <h3>{delivery.titleMini9}</h3>
          <ul>
            {delivery.description9.map((x, idx) => (
              <li key={idx}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
