import Link from 'next/link';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  url: string;
  showPages?: number;
  queryParams: any;
  dictionary: any;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages = 1,
  url,
  showPages = 2, // Тепер за замовчуванням менше на 1
  queryParams,
  dictionary,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const queryParamsString = new URLSearchParams(queryParams).toString();
  const generateLink = (page: number) => {
    let truePage = page;
    if (page == 0) truePage = 1;
    if (page > totalPages) truePage = totalPages;
    return `${url}${truePage}${
      queryParamsString ? `?${queryParamsString}` : ''
    }`;
  };
  const createPageArray = () => {
    let pages: (number | string)[] = [];
    const delta = showPages - 1; // Менше на 1

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const leftBound = Math.max(2, currentPage - delta);
      const rightBound = Math.min(totalPages - 1, currentPage + delta);

      pages.push(1); // Перша сторінка

      if (leftBound > 2) {
        pages.push('...');
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }

      if (rightBound < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages); // Остання сторінка
    }

    return pages;
  };

  const pages = createPageArray();

  return (
    <div className={styles.pagination1}>
      <Link href={generateLink(currentPage - 1)} passHref>
        <div className={styles.paginationItem1}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6602 9.16016H6.52344L11.1914 4.51172L10 3.33984L3.33984 10L10 16.6602L11.1719 15.4883L6.52344 10.8398H16.6602V9.16016Z"
              fill="#777777"
            />
          </svg>
          {dictionary.step}
        </div>
      </Link>

      <div className={styles.numbers}>
        {pages.map((pageNumber, index) =>
          pageNumber === '...' ? (
            <span key={index} className={styles.paginationItem}>
              ...
            </span>
          ) : (
            <Link
              key={pageNumber}
              href={generateLink(pageNumber as number)}
              passHref
            >
              <div
                className={`${styles.paginationItem} ${
                  pageNumber === currentPage ? styles.active : ''
                }`}
              >
                {pageNumber}
              </div>
            </Link>
          )
        )}
      </div>

      <Link href={generateLink(currentPage + 1)} passHref>
        <div className={styles.paginationItem1}>
          {dictionary.next}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.129883 7.83984H10.2666L5.59863 12.4883L6.79004 13.6602L13.4502 7L6.79004 0.339844L5.61816 1.51172L10.2666 6.16016H0.129883V7.83984Z"
              fill="#646464"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default Pagination;
