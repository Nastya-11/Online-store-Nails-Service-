import NovetlySVG from '../../assest/Header/HeaderDown/Novetly.svg';
import ProductWithDiscountSVG from '../../assest/Header/HeaderDown/ProductWithDiscount.svg';
import DiscountSVG from '../../assest/Header/HeaderDown/Discount.svg';
import HitSVG from '../../assest/Header/HeaderDown/Hit.svg';

export const listUrlHeaderUp = [
  { name: 'giftCertificates', url: 'gift-certificates' },
  { name: 'delivery', url: 'delivery' },
  { name: 'pay', url: 'pay' },
  { name: 'return', url: 'return-goods' },
  { name: 'contact', url: 'contact' },
];

export const headerDown = [
  {
    name: 'novetly',
    url: '/goods/1',
    svg: NovetlySVG,
  },
  {
    name: 'productWithDiscount',
    url: '/goods/1?sort=discount',
    svg: ProductWithDiscountSVG,
  },
  {
    name: 'discount',
    url: '/prom-discount/1',
    svg: DiscountSVG,
  },
  {
    name: 'hit',
    url: '/goods/1?sort=hit',
    svg: HitSVG,
  },
];
