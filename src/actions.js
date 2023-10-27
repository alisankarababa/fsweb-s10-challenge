import axios from "axios";

export const NOT_EKLENDI = "not eklendi"
export const NOT_SIL = "NOT_SIL"
export const GOT_ORDER_REQUIRING_API = "GOT_ORDER_REQUIRING_API"
export const GOT_ERROR = "GOT ERROR";


export function notEklendi(not) {
    return { type: NOT_EKLENDI, payload: not };
}

export function notSil(notId) {
  // ...
}

function gotError(error) {
    return { type: GOT_ERROR, payload: error};
}

export const notEkleAPI = (yeniNot) => dispatch => {

    dispatch({type: GOT_ORDER_REQUIRING_API});
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notEklendi(res.data.json));
      }
    })
    .catch((error) => {
        dispatch(gotError(error.message));
    })
}

export const notSilAPI = (id) => dispatch => {
  console.log(id)
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin 
      }
    })
    .catch((error) => console.log(error));
}