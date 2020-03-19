import {FETCHING_DATA_BUDGET_D, FETCHING_DATA_SUCCESS_BUDGET_D, FETCHING_DATA_FAILURE_BUDGET_D} from '../constants'
import {fetchBudgetD} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_BUDGET_D}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_BUDGET_D, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_BUDGET_D}
}

export const fetchDataBudgetDet = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchBudgetD(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}