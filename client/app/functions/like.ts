import { $authHost } from '../http';
import { ProductLikeType } from '../interfaces/Goods';

export const AddToLike = async (
  isAuthenticated: boolean,
  product: ProductLikeType
) => {
  try {
    if (isAuthenticated) {
      const res = await $authHost.post('basketAndLike/addToLike', {
        productId: product.id,
      });

      return res.status === 200;
    } else {
      // Отримуємо кошик з localStorage
      let like: ProductLikeType[] = JSON.parse(
        localStorage.getItem('like') || '[]'
      );

      // Перевіряємо, чи вже є цей товар у кошику
      const existingProduct = like.find((item) => item.id === product.id);

      if (existingProduct) {
        // Якщо товар вже є – повертаємо false
        return false;
      } else {
        // Якщо товару ще немає – додаємо
        like.push(product);
      }

      // Зберігаємо оновлений кошик у localStorage
      localStorage.setItem('like', JSON.stringify(like));

      return true;
    }
  } catch (err) {
    return false;
  }
};

export const GetLike = async (
  isAuthenticated: boolean
): Promise<ProductLikeType[]> => {
  if (isAuthenticated) {
    try {
      const res = await $authHost.get('basketAndLike/getLike');
      return res.data.res; // Повертаємо кошик із сервера
    } catch (err) {
      console.log('Не вдалося отримати кошик:', err);
      return [];
    }
  } else {
    try {
      // Отримуємо кошик з localStorage
      const like: ProductLikeType[] = JSON.parse(
        localStorage.getItem('like') || '[]'
      );
      return like;
    } catch (err) {
      console.log('Помилка отримання кошика з localStorage:', err);
      return [];
    }
  }
};

export const delProductInLike = async (
  isAuthenticated: boolean, // Має бути boolean, а не number
  productId: number
) => {
  if (isAuthenticated) {
    try {
      const res = await $authHost.post('basketAndLike/delLike', { productId });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  } else {
    try {
      // Отримуємо кошик з localStorage
      let like: ProductLikeType[] = JSON.parse(
        localStorage.getItem('like') || '[]'
      );

      // Видаляємо товар з кошика
      like = like.filter((item) => item.id !== productId);

      // Оновлюємо localStorage
      localStorage.setItem('like', JSON.stringify(like));

      return true;
    } catch (err) {
      console.log('Помилка видалення товару з localStorage:', err);
      return false;
    }
  }
};
