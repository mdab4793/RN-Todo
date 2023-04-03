import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import authSlice from "./authSlice";

//redux-persist를 사용하려면 rootReducer를 persistReducer로 감싸줘야 한다.
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  user: userReducer,
});
export default persistReducer(persistConfig, rootReducer);
