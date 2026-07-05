import { ProductLikeType } from '@/app/interfaces/Goods';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface likeState {
  listLike: ProductLikeType[];
}

const initialState: likeState = {
  listLike: [],
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addProductInLike: (
      state,
      action: PayloadAction<{ productLike: ProductLikeType }>
    ) => {
      const exists = state.listLike.some(
        (item) => item.id === action.payload.productLike.id
      );
      if (!exists) {
        state.listLike.push(action.payload.productLike);
      }
    },
    setLikeList: (state, action: PayloadAction<ProductLikeType[]>) => {
      state.listLike = action.payload;
    },
    removeProductFromLike: (state, action: PayloadAction<{ id: number }>) => {
      state.listLike = state.listLike.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addProductInLike, removeProductFromLike, setLikeList } =
  likeSlice.actions;
export default likeSlice.reducer;
