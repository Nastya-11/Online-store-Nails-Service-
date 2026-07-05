import { $authHost } from '../http';

const getSubcategory = async (subcategoryTitle: string) => {
  if (!subcategoryTitle) return [];
  try {
    const { data } = await $authHost.get(
      `product/getSubcategories?subcategoryTitleId=${subcategoryTitle}`
    );
    return data.res;
  } catch (error) {
    console.error('Помилка отримання заголовків підкатегорій:', error);
    return [];
  }
};

export default getSubcategory;

//getSubcategories
