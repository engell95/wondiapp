import {FETCHING_DATA_PROMO_PROD, FETCHING_DATA_SUCCESS_PROMO_PROD, FETCHING_DATA_FAILURE_PROMO_PROD} from '../constants';
import {fetchPromoprod} from '../api';
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {return {type: FETCHING_DATA_PROMO_PROD}}

export const getDataSuccess = (data) => {return {type: FETCHING_DATA_SUCCESS_PROMO_PROD, data}}

export const getDataFailure = (data) => {return {type: FETCHING_DATA_FAILURE_PROMO_PROD}}

export const fetchDataPromox = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchPromoprod(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}