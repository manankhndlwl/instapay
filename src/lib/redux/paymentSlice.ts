import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Product interface
export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// Define initial state
interface PaymentState {
  total: number;
  paymentMethods: string[];
}

const initialState: PaymentState = {
  total: 0,
  paymentMethods: [],
};

// Create slice
export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    addPaymentMethod: (state, action: PayloadAction<string[]>) => {
      state.paymentMethods = [...action.payload];
    },
  },
});

// Export actions and reducer
export const { setTotal, addPaymentMethod } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
