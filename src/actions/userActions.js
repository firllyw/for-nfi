import Axios from 'axios';
import { setUserInfo } from '../utils/userInfo';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants';

const apiURL = process.env.REACT_APP_METASLABS_API_URL;

const signin = (payload, isRemember) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: payload })
  try {
    const { data } = await Axios.post(
      `${apiURL}/login`,
      payload
    );
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: JSON.stringify(data) });
    setUserInfo("userInfo", JSON.stringify(data), isRemember);
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message })
  }
}

const register = ( payload ) => async (dispatch) => {
  dispatch({type: USER_REGISTER_REQUEST, payload: payload});
  try {
    const { data } = await Axios.post(
      `${apiURL}/register`, payload);      
    dispatch({ type: USER_REGISTER_SUCCESS, payload: JSON.stringify(data) })
    setUserInfo("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
  }
}

export {
  signin,
  register
}