import Axios from "axios";

const SET_MY_LOCKERS = "SET_MY_LOCKERS";
const SET_SHARED_LOCKERS = "SET_SHARED_LOCKERS";
const SET_USER = "SET_USER";

export const fetchUserProfile = () => async dispatch => {
  try {
    const res = await Axios.get("/user/profile");
    dispatch(setUserProfile(res.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fetchMyLockers = () => async dispatch => {
  try {
    const res = await Axios.get("/locker-instance/myLocker");
    dispatch(setMyLockers(res.data.lockerInstances));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchSharedLockers = () => async dispatch => {
  try {
    const res = await Axios.get("/locker-instance/sharedLockerInstances");
    dispatch(setSharedLockers(res.data.lockerInstances));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const setUserProfile = userProfile => ({
  type: SET_USER,
  payload: userProfile
});
const setSharedLockers = lockerInstances => ({
  type: SET_SHARED_LOCKERS,
  payload: lockerInstances
});

const setMyLockers = lockerInstances => ({
  type: SET_MY_LOCKERS,
  payload: lockerInstances
});

const initialState = {
  myLockersInstances: [],
  sharedLockersInstances: [],
  userProfile: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MY_LOCKERS: {
      return { ...state, myLockersInstances: payload };
    }
    case SET_SHARED_LOCKERS: {
      return {
        ...state,
        sharedLockersInstances: payload
      };
    }
    case SET_USER: {
      return { ...state, userProfile: payload };
    }
    default:
      return state;
  }
};
