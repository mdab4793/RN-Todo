import { configureStore, createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  //useState에서 state
  name: "user",
  //useState에서 괄호안의 값
  initialState: "kim",
});
//configureStore에서 state등록
export default configureStore({
  reducer: {
    user: user.reducer,
  },
});
