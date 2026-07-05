import { $authHost } from '../http';

const getSubcategoryTitles = async (categoryId: string) => {
  if (!categoryId) return;
  try {
    const { data } = await $authHost.get(
      `product/getTitleSubcategories?categoryId=${categoryId}`
    );
    return data.res;
  } catch (error) {
    console.error('Помилка отримання заголовків підкатегорій:', error);
    return [];
  }
};

export default getSubcategoryTitles;
