import {FETCHING_DATA_LOGIN, FETCHING_DATA_SUCCESS_LOGIN, FETCHING_DATA_FAILURE_LOGIN} from '../constants'
import AsyncStorage from '@react-native-community/async-storage';
import {Postlogin} from '../api'
import {Toast} from 'native-base';
import NavigationService from '../../config/NavigationService.js';
//idioma
import I18n from '../../config/LanguageService';

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
        //mandando detalles de presupuesto
        Postlogin(data)
            .then(([response, json]) => {
                const success = `${JSON.stringify(json.success)}`;
                 
                if (success == 'false') {
                    if (json.message == 'No existe la cuenta') {
                        Toast.show({
                            text: I18n.t('validate.login1'),
                            buttonText: 'Ok'
                        })
                    }
                    else{
                        Toast.show({
                            text: I18n.t('validate.login2'),
                            buttonText: 'Ok'
                        })
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
                    Toast.show({
                        text: I18n.t('validate.login3'),
                        buttonText: 'Ok'
                    })
                    //NavigationService.navigate('Home');
                }
                dispatch(getDataSuccess(json))
            })
            .catch((error) => {
                Toast.show({
                    text: I18n.t('validate.error2'),
                    buttonText: 'Ok'
                })
            })
    }
}
