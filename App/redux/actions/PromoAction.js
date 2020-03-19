import {FETCHING_DATA_PROMO, FETCHING_DATA_SUCCESS_PROMO, FETCHING_DATA_FAILURE_PROMO} from '../constants';
import {fetchPromo} from '../api';
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {return {type: FETCHING_DATA_PROMO}}

export const getDataSuccess = (data) => {return {type: FETCHING_DATA_SUCCESS_PROMO, data}}

export const getDataFailure = (data) => {return {type: FETCHING_DATA_FAILURE_PROMO}}

export const fetchDataPromo = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchPromo(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}