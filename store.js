import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
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

const user = createSlice({
  //useState에서 state
  name: "user",
  //useState에서 괄호안의 값
  initialState: "kim",
  //state변경 방법
  reducers: {
    // changeName자리에 내가원하는 이름으로 작명
    // 파라미터하나 작명하면 그건 기존 state가됨 여기선 state로 작명함
    changeName(state) {
      //최종값 "john kim" state는 안써도작동되는듯?
      return "john " + state;
    },
  },
});
//redux state가 array/object인경우 변경하려면?
let userArrayObject = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      //아래처럼 name: "kim"을 "park"으로바꾸면 된다. 리턴 오른쪽걸로 기존state를 갈아치워주니까.
      //   return { name: "park", age: 20 };
      //근데 아래처림 state를 직접 수정해도 잘된다. 왜? Immer.js 라이브러리가 state사본을 하나 더생성해준 덕분인데, 리덕스를 설치하면 딸려옴
      state.name = "park";
      //결론 array/object자료의 경우 state변경은 직접수정해도 잘되니까 직접한다.
      //(참고) 그래서 state 만들 때 문자나 숫자하나만 필요해도 redux에선 일부러 object 아니면 array에 담는 경우도 있다. 수정이 편리해져서.
    },
  },
});
let age = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    //age에 1도올리고 100도올리고 200도올리고싶을땐?
    // state 옆에 파라미터 넣는다 (보통action이라고 작명)
    // 그리고 state.age += action.payload라고 해준다.
    //그럼 예)increase(100)  100이 a.payload에 들어간다.
    //action이란 reducers안에 있는 state변경 함수들을 전부 action이라고한다
    increase(state, action) {
      state.age += action.payload;
    },
  },
});
const accessToken = createSlice({
  name: "token",
  initialState: "",
});
//configureStore에서 state등록
export default configureStore({
  reducer: {
    user: user.reducer,
    authSlice: authSlice.reducer,
  },
});
//다른곳에서 쓸수있게 export
export const { changeName } = user.actions;

export const { loginStart, loginSuccess, loginFail, logout } =
  authSlice.actions;

//Redux store에 있는 state가져다 쓰는법

// import { useSelector } from "react-redux"해주고
// function Cart(){
//   let a = useSelector((state) => { return state } )
//   console.log(a)

//   return (생략)
// }
//위 예시처럼 아무컴포넌트에서  useSelector((state) => { return state } ) 쓰면 store에 있던 모든 state가 그 자리에 남는다.
//let a = useSelector((state) => state.user )  이렇게쓰면 좀더 편함
//store.js에서 원하는 state변경함수 가져오면 되고
//useDispatch 라는 것도 라이브러리에서 가져온다.
//그리고 dispatch( state변경함수() ) 이렇게 감싸서 실행하면 state 진짜로 변경된다.
