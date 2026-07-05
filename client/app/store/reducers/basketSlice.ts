import { Img, ProductBasketType } from '@/app/interfaces/Goods';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface basketState {
  listBasket: ProductBasketType[];
}

const initialState: basketState = {
  listBasket: [],
};

const likeSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductInBasket: (
      state,
      action: PayloadAction<{ product: ProductBasketType }>
    ) => {
      const exists = state.listBasket.some(
        (item) => item.id === action.payload.product.id
      );
      if (!exists) {
        state.listBasket.push(action.payload.product);
      }
    },
    removeProductFromBasket: (state, action: PayloadAction<{ id: number }>) => {
      state.listBasket = state.listBasket.filter(
        (product) => product.id !== action.payload.id
      );
    },
    setBasket: (
      state,
      action: PayloadAction<{ newBasket: ProductBasketType[] }>
    ) => {
      state.listBasket = action.payload.newBasket;
    },
    setCntBasket: (
      state,
      action: PayloadAction<{ productId: number; count: number }>
    ) => {
      const product = state.listBasket.find(
        (item) => item.id === action.payload.productId
      );

      if (product) {
        if (action.payload.count === 0) {
          // Видаляємо товар, якщо count = 0
          state.listBasket = state.listBasket.filter(
            (item) => item.id !== action.payload.productId
          );
        } else {
          // Оновлюємо кількість товару
          product.count = action.payload.count;
        }
      }
    },
  },
});

export const {
  addProductInBasket,
  removeProductFromBasket,
  setBasket,
  setCntBasket,
} = likeSlice.actions;
export default likeSlice.reducer;
