export const LIFF_INIT = "IS_INIT";
export const INITIAL_URL = "INITIAL_URL";

export const setLiff = data => ({
  type: LIFF_INIT,
  payload: data
});

export const setInitialURL = url => ({
  type: INITIAL_URL,
  payload: url
});

const initialState = {
  data: null,
  initialURL: ""
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  if (type === LIFF_INIT) return { ...state, data: payload };
  else if (type === INITIAL_URL) {
    return { ...state, initialURL: payload };
  } else return state;
};
