import Axios from "axios";

const SET_MY_LOCKERS = "SET_MY_LOCKERS";
const SET_SHARED_LOCKERS = "SET_SHARED_LOCKERS";
const SET_USER = "SET_USER";
const REMOVE_LOCKER_BY_ID = "REMOVE_LOCKER_BY_ID";

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

export const removeLockerByID = lockerID => {
  return {
    type: REMOVE_LOCKER_BY_ID,
    payload: lockerID
  };
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
    case REMOVE_LOCKER_BY_ID: {
      state.myLockersInstances.forEach(element => console.log(element));
      const index = state.myLockersInstances.findIndex(
        element => element.lockerID === payload
      );
      const updatedLockerInstances = [...state.myLockersInstances].filter(
        (element, idx) => idx !== index
      );
      return {
        ...state,
        myLockersInstances: updatedLockerInstances
      };
    }
    case SET_USER: {
      return { ...state, userProfile: payload };
    }
    default:
      return state;
  }
};
