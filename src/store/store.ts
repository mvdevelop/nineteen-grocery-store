import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

// Tipos para uso com useSelector e useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
