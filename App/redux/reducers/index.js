import {combineReducers} from 'redux';
import CategoryReducer from './categoryreducer';
import ShopReducer from './shopreducer';
import ShopDReducer from './shopdreducer';
import ProductShopReducer from './productshopreducer';
import BudgetReducer from './budgetreducer';
import BudgetDReducer from './budgetdreducer';
import SuggestionsReducer from './suggestionsreducer';
import ProductsReducer from './productsreducer';
import HomeReducer from './homereducer';
import SearchReducer from './searchreducer';
import ResultReducer from './resultreducer';
//*************************Post***************************************************************
import MainReducers from './mainreducers';
import UserReducers from './userreducer';
import LoginReducers from './loginreducer';
import SignupReducers from './signupreducer';

export default combineReducers({
    category: CategoryReducer,
    shop:ShopReducer,
    shopd: ShopDReducer,
    productSp:ProductShopReducer,
    budget:BudgetReducer,
    budgetd:BudgetDReducer,
    suggestions:SuggestionsReducer,
    products:ProductsReducer,
    search:SearchReducer,
    result:ResultReducer,
    home:HomeReducer,
//***********************Post*****************************************************************
    main:MainReducers ,
    user:UserReducers,
    login:LoginReducers,
    signup:SignupReducers
})