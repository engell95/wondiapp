import {FETCHING_DATA_PASS, FETCHING_DATA_SUCCESS_PASS, FETCHING_DATA_FAILURE_PASS} from '../constants'
import {passwordreset} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {
    return {type: FETCHING_DATA_PASS}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_PASS, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_PASS}
}

export const fetchDataPass = (data) => {
    return (dispatch) => {
        
        dispatch(getData())

        passwordreset(data)
        .then(([response, json]) => {

            const success = `${JSON.stringify(json.success)}`;
            dispatch(getDataSuccess(json))
            if (success == 'true') {
                dispatch(ToastActionsCreators.displayInfo('Contraseña actualizada'))
            }
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}