import Link from 'next/link';
import './Admin.scss';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="admin-container">
        <div className="header-admin">
          <Link href={`/admin/add-product`}>Додати товар</Link>|
          <Link href={`/admin/add-category`}>Додати категорію</Link>|
          <Link href={`/admin/add-filter`}>Додати фільтр</Link>|
          <Link href={`/admin/add-title-subcategory`}>Додати заголовок підкатегорії</Link>|
          <Link href={`/admin/add-subcategory`}>Додати підкатегорію</Link>|
          <Link href={`/admin/add-brend`}>Додати бренд</Link>|
          <Link href={`/admin/add-country-made`}>Додати країну виробника</Link>|
          <Link href={`/admin/update-category`}>Оновити категорію</Link>|
        </div>
      </div>
      {children}
    </>
  );
}
