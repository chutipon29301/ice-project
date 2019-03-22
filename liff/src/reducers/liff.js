export const LIFF_INIT = "IS_INIT";

export const setLiff = data => ({
  type: LIFF_INIT,
  payload: data
});

const initialState = {
  data: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  if (type === LIFF_INIT) return { ...state, data: payload };
  else return state;
};
