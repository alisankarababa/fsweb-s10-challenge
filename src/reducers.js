import { GOT_ORDER_REQUIRING_API, NOT_EKLENDI, NOT_SILINDI, GOT_ERROR} from "./actions";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
  busy: false,
  error: null,
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri
  }
}

export function reducerGratitudeJournal(state=baslangicDegerleri, action) {

    switch (action.type) {
        case NOT_EKLENDI:
            return {...state, busy: false, notlar: [ action.payload, ...state.notlar ]}

        case NOT_SILINDI:
            const idDeletedNote = action.payload;
            return { ...state, busy: false, notlar: state.notlar.filter( note  => note.id !== idDeletedNote ) };

        case GOT_ORDER_REQUIRING_API:
            return {...state, busy: true, error: null};

        case GOT_ERROR: 
            return {...state, busy: false, error: action.payload};
    
        default:
            return state;
    }



}