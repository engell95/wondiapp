import {FETCHING_DATA_PROMOFULL, FETCHING_DATA_SUCCESS_PROMOFULL, FETCHING_DATA_FAILURE_PROMOFULL} from '../constants';
import {fetchPromofull} from '../api';
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {return {type: FETCHING_DATA_PROMOFULL}}

export const getDataSuccess = (data) => {return {type: FETCHING_DATA_SUCCESS_PROMOFULL, data}}

export const getDataFailure = (data) => {return {type: FETCHING_DATA_FAILURE_PROMOFULL}}

export const fetchDataPromofull = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchPromofull(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}