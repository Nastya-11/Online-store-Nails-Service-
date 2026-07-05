import { $authHost } from '../http';

const getBrend = async () => {
  try {
    const { data } = await $authHost.get('product/getBrend');
    return data.res;
  } catch (error) {
    console.error('Помилка отримання категорій:', error);
    return [];
  }
};

export default getBrend;
