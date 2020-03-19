import {FETCHING_DATA_LOGIN, FETCHING_DATA_SUCCESS_LOGIN, FETCHING_DATA_FAILURE_LOGIN} from '../constants'
import AsyncStorage from '@react-native-community/async-storage';
import {Postlogin} from '../api'
//import {Toast} from 'native-base';
import { ToastActionsCreators } from 'react-native-redux-toast';
import NavigationService from '../../config/services/NavigationService.js';
//idioma
//import I18n from '../../config/services/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_LOGIN}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_LOGIN, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_LOGIN}
}

export const loginpost = (data) =>{   
    return (dispatch) => {
        Postlogin(data)
            .then(([response, json]) => {
                const success = `${JSON.stringify(json.success)}`;
                if (success == 'false') {
                    if (json.message == 'No existe la cuenta') {
                         //console.log(json.message)
                        dispatch(ToastActionsCreators.displayError('No existe la cuenta.'));
                        dispatch(getDataSuccess(json))
                    }
                    else{
                        dispatch(ToastActionsCreators.displayError('Credenciales invalidas.'));
                        dispatch(getDataSuccess(json))
                    }
                }
                else{
                    const user = `${JSON.stringify(json.data.id)}`;
                    const code = json.data.validation_code;
                    //guardandolo como variable global
                    AsyncStorage.setItem('user', user);
                    AsyncStorage.setItem('token', code);
                    //validando instalacion uno
                    AsyncStorage.setItem('install', '1');
                    if (data.photo) {
                      AsyncStorage.setItem('photo', data.photo);  
                    }
                    dispatch(getDataSuccess(json))
                    dispatch(ToastActionsCreators.displayInfo('Acceso concedido.'));
                    NavigationService.navigate('Home');
                }
                dispatch(getDataSuccess(json))
            })
            .catch((error) => {
                dispatch(ToastActionsCreators.displayError(error.toString()))
            })
    }
}
