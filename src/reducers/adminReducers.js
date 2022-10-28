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
    ADMIN_SIGNOUT
} from '../constants/adminConstants';

function adminSigninReducer(state = {}, action) {
    switch (action.type) {
      case ADMIN_SIGNIN_REQUEST:
        return { loading: true }
      case ADMIN_SIGNIN_SUCCESS:
        return { loading: false, adminInfo: action.payload }
      case ADMIN_SIGNIN_FAIL:
        return { loading: false, error: action.payload }
      case ADMIN_SIGNOUT:
        return {}
      default:
        return state
    }
  }

function adminRegisterReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_REGISTER_REQUEST:
        return { loading: true }
        case ADMIN_REGISTER_SUCCESS:
        return { loading: false, adminInfo: action.payload }
        case ADMIN_REGISTER_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

function getAdminCardsReducer(state = {}, action) {
  switch (action.type) {
    case ADMIN_GET_CARDS_REQUEST:
      return { loading: true }
    case ADMIN_GET_CARDS_SUCCESS:
      return { loading: false, adminCards: action.payload }
    case ADMIN_GET_CARDS_FAIL:
      return { loading: false, error: action.payload }
  //   case USER_LOGOUT:
  //     return {}
    default:
      return state
  }
}
function getAdminUsersReducer(state = {}, action) {
  switch (action.type) {
    case ADMIN_GET_USERS_REQUEST:
      return { loading: true }
    case ADMIN_GET_USERS_SUCCESS:
      return { loading: false, adminUsers: action.payload }
    case ADMIN_GET_USERS_FAIL:
      return { loading: false, error: action.payload }
    // case USER_LOGOUT:
    //   return {}
    default:
      return state
  }
}

export {
    adminSigninReducer,
    adminRegisterReducer,
    getAdminCardsReducer,
    getAdminUsersReducer
}