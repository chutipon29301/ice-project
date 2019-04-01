const SET_AUTHENTICATION = "SET_AUTHENTICATION";
const SET_TOKEN_AND_EXPIRATION = "SET_TOKEN_AND_EXPIRATION";

export const setAuthentication = isAuthenticate => {
  return {
    type: SET_AUTHENTICATION,
    payload: isAuthenticate
  };
};

export const setTokenAndExpiration = (idToken, expireIn) => {
  return {
    type: SET_TOKEN_AND_EXPIRATION,
    payload: { idToken, expireIn }
  };
};

const initialState = {
  isAuthenticate: false,
  idToken: "",
  expireIn: 0
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTHENTICATION: {
      return {
        ...state,
        isAuthenticate: payload
      };
    }
    case SET_TOKEN_AND_EXPIRATION: {
      const { idToken, expireIn } = payload;
      return {
        ...state,
        idToken,
        expireIn
      };
    }
    default:
      return state;
  }
};
