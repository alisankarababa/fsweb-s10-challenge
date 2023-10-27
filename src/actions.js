import axios from "axios";

export const NOT_EKLENDI = "not eklendi"
export const NOT_SILINDI = "not silindi"
export const GOT_ORDER_REQUIRING_API = "GOT_ORDER_REQUIRING_API"
export const GOT_ERROR = "GOT ERROR";


export function notEklendi(not) {
    return { type: NOT_EKLENDI, payload: not };
}

export function notSilindi(notId) {
  return { type: NOT_SILINDI, payload: notId };
}

function gotError(error) {
    return { type: GOT_ERROR, payload: error};
}

function gotOrderRequiringApi () {
    return {type: GOT_ORDER_REQUIRING_API};
}

export const notEkleAPI = (yeniNot, resultNotEkle) => dispatch => {

    dispatch(gotOrderRequiringApi());
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notEklendi(res.data.json));
        resultNotEkle(true);
    }
    })
    .catch((error) => {
        dispatch(gotError(error.message));
        resultNotEkle(false);
    })
}

export const notSilAPI = (id) => dispatch => {

    dispatch(gotOrderRequiringApi());
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        dispatch(notSilindi(res.data.data));
      }
    })
    .catch((error) => {
        dispatch(gotError(error.message));
    });
}