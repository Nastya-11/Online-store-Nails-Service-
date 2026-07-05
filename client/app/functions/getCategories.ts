import { $authHost } from '../http';

const getCategories = async () => {
  try {
    const { data } = await $authHost.get('product/getCategories');
    return data.res;
  } catch (error) {
    console.error('Помилка отримання категорій:', error);
    return [];
  }
};

export default getCategories;
