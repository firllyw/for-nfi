import Axios from 'axios';
import {
    USER_GET_CARDS_REQUEST,
    USER_GET_CARDS_SUCCESS,
    USER_GET_CARDS_FAIL,
    USER_ADD_CARD_REQUEST,
    USER_ADD_CARD_SUCCESS,
    USER_ADD_CARD_FAIL,
    USER_GET_MY_CARDS_REQUEST,
    USER_GET_MY_CARDS_SUCCESS,
    USER_GET_MY_CARDS_FAIL,
    USER_GENERATE_CARD_REQUEST,
    USER_GENERATE_CARD_SUCCESS,
    USER_GENERATE_CARD_FAIL
} from '../constants/cardConstants';

const apiURL = process.env.REACT_APP_METASLABS_API_URL;

const getCards = () => async (dispatch) => {
  dispatch({type: USER_GET_CARDS_REQUEST});
  try {
    const { data } = await Axios.get(`${apiURL}/cards`)
    dispatch({ type: USER_GET_CARDS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_GET_CARDS_FAIL, payload: error.message })
  }
}

const getMyCards = () => async (dispatch, getState) => {
  const {
    userSignin: { userInfo }
  } = getState();
  dispatch({type: USER_GET_MY_CARDS_REQUEST});
  try {
    const { data } = await Axios.get(`${apiURL}/cards/me`, {
      headers: {
          Authorization: JSON.parse(userInfo).token
      }
    })
    dispatch({ type: USER_GET_MY_CARDS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_GET_MY_CARDS_FAIL, payload: error.message })
  }
}

const addCard = (card) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo }
  } = getState();
  dispatch({type: USER_ADD_CARD_REQUEST});
  try {
    const { data } = await Axios.post(`${apiURL}/cards`, card, {
      headers: {
          Authorization: JSON.parse(userInfo).token
      }
    })
    dispatch({ type: USER_ADD_CARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_ADD_CARD_FAIL, payload: error.message })
  }
}

const generateCard = (id, tokenId) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo }
  } = getState();
  dispatch({type: USER_GENERATE_CARD_REQUEST});
  try {
    const { data } = await Axios.post(`${apiURL}/cards/${id}/generate`, {token_id: tokenId}, {
      headers: {
          Authorization: JSON.parse(userInfo).token
      }
    })
    dispatch({ type: USER_GENERATE_CARD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_GENERATE_CARD_FAIL, payload: error.message })
  }
}

export {
    getCards,
    getMyCards,
    addCard,
    generateCard
}