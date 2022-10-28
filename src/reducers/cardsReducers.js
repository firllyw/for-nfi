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
    USER_GENERATE_CARD_FAIL,
} from '../constants/cardConstants';

function getCardsReducer(state = {}, action) {
    switch (action.type) {
      case USER_GET_CARDS_REQUEST:
        return { loading: true }
      case USER_GET_CARDS_SUCCESS:
        return { loading: false, cards: action.payload }
      case USER_GET_CARDS_FAIL:
        return { loading: false, error: action.payload }
    //   case USER_LOGOUT:
    //     return {}
      default:
        return state
    }
}

function getMyCardsReducer(state = {}, action) {
  switch (action.type) {
    case USER_GET_MY_CARDS_REQUEST:
      return { loading: true }
    case USER_GET_MY_CARDS_SUCCESS:
      return { loading: false, myCards: action.payload }
    case USER_GET_MY_CARDS_FAIL:
      return { loading: false, error: action.payload }
  //   case USER_LOGOUT:
  //     return {}
    default:
      return state
  }
}

function addCardReducer(state = {}, action) {
  switch (action.type) {
    case USER_ADD_CARD_REQUEST:
      return { loading: true }
    case USER_ADD_CARD_SUCCESS:
      return { loading: false, card: action.payload }
    case USER_ADD_CARD_FAIL:
      return { loading: false, error: action.payload }
  //   case USER_LOGOUT:
  //     return {}
    default:
      return state
  }
}

function generateCardReducer(state = {}, action) {
  switch (action.type) {
    case USER_GENERATE_CARD_REQUEST:
      return { loading: true }
    case USER_GENERATE_CARD_SUCCESS:
      return { loading: false, gCard: action.payload }
    case USER_GENERATE_CARD_FAIL:
      return { loading: false, error: action.payload }
  //   case USER_LOGOUT:
  //     return {}
    default:
      return state
  }
}

export {
    getCardsReducer,
    getMyCardsReducer,
    addCardReducer,
    generateCardReducer,
}