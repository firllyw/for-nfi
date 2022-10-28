import Axios from 'axios';
import { setUserInfo, removeUserInfo } from '../utils/userInfo';
import {
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNIN_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_GET_CARDS_REQUEST,
  ADMIN_GET_CARDS_SUCCESS,
  ADMIN_GET_CARDS_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_GET_USERS_FAIL,
  ADMIN_SIGNOUT,
} from '../constants/adminConstants';

const apiURL = process.env.REACT_APP_METASLABS_API_URL;

const adminSignin = (payload, isRemember) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: payload })
  try {
    const { data } = await Axios.post(
      `${apiURL}/admin/login`,
      payload
    );
    dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: JSON.stringify(data) });
    setUserInfo("adminInfo", JSON.stringify(data), isRemember);
  } catch (error) {
    dispatch({ type: ADMIN_SIGNIN_FAIL, payload: error.message })
  }
}

const adminSignout = () => (dispatch) => {
  dispatch({ type: ADMIN_SIGNOUT });
  removeUserInfo("adminInfo");
}

const adminRegister = ( payload ) => async (dispatch) => {
  dispatch({type: ADMIN_REGISTER_REQUEST, payload: payload});
  try {
    const { data } = await Axios.post(
      `${apiURL}/admin/register`, payload);      
    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: JSON.stringify(data) })
    setUserInfo("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: ADMIN_REGISTER_FAIL, payload: error.message })
  }
}

const getAdminCards = () => async (dispatch, getState) => {
  const {
    adminSignin: { adminInfo }
  } = getState();
  dispatch({type: ADMIN_GET_CARDS_REQUEST});
  try {
    const { data } = await Axios.get(`${apiURL}/admin/cards?size=20`, {
      headers: {
          Authorization: JSON.parse(adminInfo).token
      }
    })
    dispatch({ type: ADMIN_GET_CARDS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_GET_CARDS_FAIL, payload: error.message })
  }
}

const getAdminUsers = () => async (dispatch, getState) => {
  const {
    adminSignin: { adminInfo }
  } = getState();
  dispatch({type: ADMIN_GET_USERS_REQUEST});
  try {
    const { data } = await Axios.get(`${apiURL}/admin/users`, {
      headers: {
          Authorization: JSON.parse(adminInfo).token
      }
    })
    dispatch({ type: ADMIN_GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_GET_USERS_FAIL, payload: error.message })
  }
}

export {
    adminSignin,
    adminRegister,
    getAdminCards,
    getAdminUsers,
    adminSignout
}