import { $authHost } from '../http';

const getCountryMade = async () => {
  try {
    const { data } = await $authHost.get('product/getCountryMade');
    return data.res;
  } catch (error) {
    console.error('Помилка отримання категорій:', error);
    return [];
  }
};

export default getCountryMade;
