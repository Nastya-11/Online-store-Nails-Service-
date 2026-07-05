export type  = {
  id: number;
  img: string;
};

export type ProductCategoryFilter = {
  id: number;
  valueuk: string;
  valueru: string;
  filterCategoryId: number;
};

export type Product = {
  id: number;
  nameuk: string;
  nameru: string;
  descriptionuk: string;
  descriptionru: string;
  price: number;
  discount: number;
  priceWithDiscount: number;
  timeDiscount: string | null;
  isAvaibility: boolean;
  isHit: boolean;
  isNovetly: boolean;
  cod: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  subcategoryTitleId: number;
  subcategoryId: number;
  brendId: number;
  countryMadeId: number;
  review: number;
  imgs: Img[];
  productCategoryFilters: ProductCategoryFilter[];
};

export type ProductBasketType = {
  id: number;
  nameuk: string;
  nameru: string;
  price: number;
  discount: number;
  priceWithDiscount: number;
  timeDiscount: string | null;
  isAvaibility: boolean;
  isHit: boolean;
  isNovetly: boolean;
  cod: string;
  review: number;
  imgs: Img[];
  count: number;
};
export type ProductLikeType = {
  id: number;
  nameuk: string;
  nameru: string;
  price: number;
  discount: number;
  priceWithDiscount: number;
  timeDiscount: string | null;
  isAvaibility: boolean;
  isHit: boolean;
  isNovetly: boolean;
  cod: string;
  review: number;
  imgs: Img[];
};

export type ProductResponse = {
  products: Product[];
  total: number;
};

export type FilterCategoryType = {
  id: number;
  nameuk: string;
  nameru: string;
  productCategoryFilters: {
    valueuk: string;
    valueru: string;
    filterCategoryId?: number; // Додаємо "?" бо в JSON його може не бути
  }[];
};

export type Country = {
  id: number;
  nameuk: string;
  nameru: string;
};

export type Brand = {
  id: number;
  nameuk: string;
  nameru: string;
};

export type Category = {
  id: number;
  nameuk: string;
  nameru: string;
  svg: string;
  subcategoryTitles: {
    id: number;
    nameuk: string;
    nameru: string;
    subcategories: {
      id: number;
      nameuk: string;
      nameru: string;
    }[];
  }[];
};

export type SubcategoryTitle = {
  id: number;
  nameuk: string;
  nameru: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

export type SubcategoryType = {
  id: number;
  nameuk: string;
  nameru: string;
  categoryId: number;
  subcategoryTitleId: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductType = {
  id: number;
  nameuk: string;
  nameru: string;
  descriptionuk: string;
  descriptionru: string;
  price: number;
  discount: number;
  priceWithDiscount: number;
  timeDiscount: string | null;
  isAvaibility: boolean;
  isHit: boolean;
  isNovetly: boolean;
  cod: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  subcategoryTitleId: number | null;
  subcategoryId: number | null;
  brendId: number;
  countryMadeId: number;
  imgs: Img[];
  brend: Brand;
  countryMade: Country;
  category: Category;
  subcategoryTitle: SubcategoryTitle | null;
  subcategory: SubcategoryType | null;
  productCategoryFilters: ProductCategoryFilterType[];
  review: number;
};

export type ProductCategoryFilterType = {
  id: number;
  valueuk: string;
  valueru: string;
  filterCategoryId: number;
};

export type RelatedProductType = Omit<
  ProductType,
  | 'brend'
  | 'countryMade'
  | 'category'
  | 'subcategoryTitle'
  | 'subcategory'
  | 'productCategoryFilters'
>;

export type ReviewType = {
  id: number;
  title: string;
  text: string;
  valueForMoneyRating: number;
  overallQualityRating: number;
  nameUser: string;
  surnameUser: string;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  user: null | {
    id: number;
    name: string;
    surname: string;
  };
};

export type ProductPageResponseType = {
  product: ProductType;
  filterCategories: FilterCategoryType[];
  relatedProducts: RelatedProductType[];
  reviews: ReviewType[];
};

export type CategoryType = {
  id: number;
  nameuk: string;
  nameru: string;
  svg: string;
};

// Тип для масиву категорій
export type CategoriesList = Category[];
