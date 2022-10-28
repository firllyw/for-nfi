import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { getUserInfo } from './utils/userInfo';

import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { adminRegisterReducer, adminSigninReducer, getAdminCardsReducer, getAdminUsersReducer } from './reducers/adminReducers';
import { getCardsReducer, getMyCardsReducer, addCardReducer, generateCardReducer } from './reducers/cardsReducers';

const userInfo = getUserInfo("userInfo");
const adminInfo = getUserInfo("adminInfo");
const initialState = { userSignin: { userInfo }, adminSignin: {adminInfo} }

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    adminSignin: adminSigninReducer,
    adminRegister: adminRegisterReducer,
    getAdminCards: getAdminCardsReducer,
    getAdminUsers: getAdminUsersReducer,
    getCards: getCardsReducer,
    getMyCards: getMyCardsReducer,
    addCard: addCardReducer,
    generateCard: generateCardReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
)
export default store