import { configureStore, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    accessToken: null,
    username: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.token;
      state.username = action.payload.username;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.username = null;
    },
  },
});
const todosSlice = createSlice({
  name: "todosSlice",
  initialState: [],
  reducers: {
    setTodos(state, action) {
      console.log(action.payload, "in setTodo reducer");
      return action.payload;
    },
  },
});
const persistConfig = {
  key: "authSlice",
  storage: AsyncStorage,
};
const persistedAuthSliceReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);

export const store = configureStore({
  reducer: {
    authSlice: persistedAuthSliceReducer,
    todosSlice: todosSlice.reducer,
  },
});
export const { loginStart, loginSuccess, loginFail, logout } =
  authSlice.actions;
export const { setTodos } = todosSlice.actions;
export const persistor = persistStore(store);

export default store;
