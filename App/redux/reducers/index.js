import {combineReducers} from 'redux';
import CategoryReducer from './CategoryReducer';
import ShopReducer from './ShopReducer';
import ShopDReducer from './ShopDReducer';
import ProductShopReducer from './ProductShopReducer';
import BudgetReducer from './BudgetReducer';
import BudgetDReducer from './BudgetDReducer';
import SuggestionsReducer from './SuggestionsReducer';
import ProductsReducer from './ProductsReducer';
import SearchReducer from './SearchReducer';
import ResultReducer from './ResultReducer';
import MainReducers from './MainReducer';
import UserReducers from './UserReducer';
import LoginReducers from './LoginReducer';
import SignupReducers from './SignupReducer';
import PromoReducers from './PromoReducer';
import PromoProdReducers from './PromoProdReducer';
import SucReducers from './SucReducer';
import PassReducers from './PassworDReducer';
import UsereditReducers from './UserEditReducer';
import HistoryReducers from './HistoryReducer';
import PreferencesReducers from './PreferencesReducer';
import BestpriceReducer from './BestPriceReducer';
import BestsearchReducer from './BestSearchReducer';
import MorebudgetReducer from './MoreBudgetReducer';
import ListxuserReducer from './ListxUserReducer';
import ListxuserfullReducer from './ListxUserFullReducer';
import SimilaryReducer from './SimilaryReducer';
import PromofullReducer from './PromoFullReducer';
import ProddetReducer from './ProddetReducer';
import { toastReducer as toast } from 'react-native-redux-toast';

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
    promo:PromoReducers,
    promoprod:PromoProdReducers,
    main:MainReducers ,
    user:UserReducers,
    login:LoginReducers,
    signup:SignupReducers,
    suc:SucReducers,
    pass:PassReducers,
    useredit:UsereditReducers,
    history:HistoryReducers,
    preferences:PreferencesReducers,
    bestprice:BestpriceReducer,
    bestsearch:BestsearchReducer,
    morebudget:MorebudgetReducer,
    listxuser:ListxuserReducer,
    listxuserfull:ListxuserfullReducer,
    similary:SimilaryReducer,
    promofull:PromofullReducer,
    proddet:ProddetReducer,
    toast
})