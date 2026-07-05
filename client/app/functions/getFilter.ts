import { $authHost } from '../http';

const getCategoryFilter = async (categoryId: string) => {
  try {
    const { data } = await $authHost.get(
      'product/getCategoryFilter?categoryId=' + categoryId
    );
    return data.res;
  } catch (error) {
    console.error('Помилка отримання категорій:', error);
    return [];
  }
};

export default getCategoryFilter;
