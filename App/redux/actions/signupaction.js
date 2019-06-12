import {FETCHING_DATA_SIGNUP, FETCHING_DATA_SUCCESS_SIGNUP, FETCHING_DATA_FAILURE_SIGNUP} from '../constants'
import AsyncStorage from '@react-native-community/async-storage';
import {PostUser,Postlogin} from '../api'
import {Toast} from 'native-base';
import NavigationService from '../../config/NavigationService.js';
import PushNotification from 'react-native-push-notification';
//idioma
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SIGNUP}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SIGNUP, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SIGNUP}
}

export const signuppost = (data) =>{   
    if (data.languaje != null) {
        I18n.locale = data.languaje
    }
    return (dispatch) => {
        //mandando detalles de presupuesto
        PostUser(data)
            .then(([response, json]) => {
                //encajonando el cod_presupuesto para el carrito
                const success = `${JSON.stringify(json.success)}`;
                if (success == 'false') {
                    if (json.data.User) {
                        if (json.data.User == "The user has already been taken.") {
                            if (data.social == true) {
                                dispatch(login({email:data.email,password:data.pass,photo:data.photo,languaje:data.languaje,user:data.user_id,token:data.token,notif:data.notif}))
                            }
                            else{
                                Toast.show({
                                    text: I18n.t('validate.login5'),
                                    buttonText: 'Ok'
                                })
                            }
                        }
                        else if (json.data.User == "The user may not be greater than 20 characters.") {
                            Toast.show({
                                text: I18n.t('validate.login5'),
                                buttonText: 'Ok'
                            })
                        }
                        else(
                            Toast.show({
                                text: I18n.t('validate.error'),
                                buttonText: 'Ok'
                            })
                        )
                    }
                    else if (json.data.email){
                        if (json.data.email == "The email has already been taken.") {
                            if (data.social == true) {
                                dispatch(login({email:data.email,password:data.pass,photo:data.photo}))
                            }
                            else{
                                Toast.show({
                                    text: I18n.t('validate.login7'),
                                    buttonText: 'Ok'
                                })
                            }
                        }
                        else if (json.data.email == "The email must be a valid email address.") {
                            Toast.show({
                                text: I18n.t('validate.login8'),
                                buttonText: 'Ok'
                            })
                        }
                        else(
                            Toast.show({
                                text: I18n.t('validate.error'),
                                buttonText: 'Ok'
                            })
                        )
                    }
                    else{
                        Toast.show({
                            text: I18n.t('validate.error'),
                            buttonText: 'Ok'
                        })
                    }
                }
                else{
                    const user = `${JSON.stringify(json.data.user_id)}`;
                    const code = json.data.activation_code;
                    //guardandolo como variable global
                    AsyncStorage.setItem('user', user);
                    AsyncStorage.setItem('token', code);
                    //validando instalacion uno
                    AsyncStorage.setItem('install', '1');
                    //guardando foto de perfil
                    if (data.photo) {
                      AsyncStorage.setItem('photo', data.photo);  
                    }
                    
                    Toast.show({
                        text: I18n.t('validate.login9'),
                        buttonText: 'Ok'
                    })
                }
                dispatch(getDataSuccess(json))
            })
            .catch((error) => console.log(error))
    }
}

export const login = (data) =>{ 
    if (data.languaje != null) {
        I18n.locale = data.languaje
    }
    return (dispatch) => {
        //mandando detalles de presupuesto
        Postlogin(data)
            .then(([response, json]) => {
                //console.log(`${JSON.stringify(json)}`)
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
                    PushNotification.localNotificationSchedule({
                      //... You can use all the options from localNotifications
                      title: I18n.t('validate.login10'),
                      message: I18n.t('validate.login11'), // (required)
                      date: new Date(Date.now())
                    });
                   NavigationService.navigate('Home_ini');
                }
            })
            .catch((error) => console.log(error))
    }
}