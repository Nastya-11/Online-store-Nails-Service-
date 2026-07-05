import { $authHost } from '../http';
import { ProductBasketType } from '../interfaces/Goods';

export const AddToBasket = async (
  isAuthenticated: boolean,
  product: ProductBasketType
) => {
  try {
    if (isAuthenticated) {
      const res = await $authHost.post('basketAndLike/addToBasket', {
        productId: product.id,
        count: product.count,
      });
      console.log(res);
      return res.status === 200;
    } else {
      let basket: ProductBasketType[] = JSON.parse(
        localStorage.getItem('basket') || '[]'
      );

      const existingProduct = basket.find((item) => item.id === product.id);
      if (existingProduct) {
        return false;
      } else {
        basket.push(product);
      }

      localStorage.setItem('basket', JSON.stringify(basket));
      return true;
    }
  } catch (err) {
    return false;
  }
};

export const getBasket = async (
  isAuthenticated: boolean
): Promise<ProductBasketType[]> => {
  if (isAuthenticated) {
    try {
      const res = await $authHost.get('basketAndLike/getBasket');
      return res.data.res;
    } catch (err) {
      console.log('Не вдалося отримати кошик:', err);
      return [];
    }
  } else {
    try {
      const basket: ProductBasketType[] = JSON.parse(
        localStorage.getItem('basket') || '[]'
      );
      return basket;
    } catch (err) {
      console.log('Помилка отримання кошика з localStorage:', err);
      return [];
    }
  }
};

export const setCountBasket = async (
  isAuthenticated: boolean,
  productId: number,
  count: number
) => {
  if (isAuthenticated) {
    try {
      const res = await $authHost.post('basketAndLike/setCount', {
        productId,
        count,
      });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  } else {
    try {
      let basket: ProductBasketType[] = JSON.parse(
        localStorage.getItem('basket') || '[]'
      );

      const productIndex = basket.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        if (count === 0) {
          basket.splice(productIndex, 1);
        } else {
          basket[productIndex].count = count;
        }

        localStorage.setItem('basket', JSON.stringify(basket));
        return true;
      }
      return false;
    } catch (err) {
      console.log('Помилка оновлення кошика в localStorage:', err);
      return false;
    }
  }
};

export const delProductInBasket = async (
  isAuthenticated: boolean,
  productId: number
) => {
  if (isAuthenticated) {
    try {
      const res = await $authHost.post('basketAndLike/del', { productId });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  } else {
    try {
      let basket: ProductBasketType[] = JSON.parse(
        localStorage.getItem('basket') || '[]'
      );

      basket = basket.filter((item) => item.id !== productId);
      localStorage.setItem('basket', JSON.stringify(basket));

      return true;
    } catch (err) {
      console.log('Помилка видалення товару з localStorage:', err);
      return false;
    }
  }
};
