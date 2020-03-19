import {FETCHING_DATA_USEREDIT, FETCHING_DATA_SUCCESS_USEREDIT, FETCHING_DATA_FAILURE_USEREDIT} from '../constants'
import {Useredit} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {
    return {type: FETCHING_DATA_USEREDIT}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_USEREDIT, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_USEREDIT}
}

export const fetchuseredit = (data) => {
    return (dispatch) => {
        dispatch(getData())
        Useredit(data)
        .then(([response, json]) => {
            const success = `${JSON.stringify(json.success)}`;
            dispatch(getDataSuccess(json))
            if (success == 'true') {
               dispatch(ToastActionsCreators.displayError('Usuario actualizado'));
            }
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}
