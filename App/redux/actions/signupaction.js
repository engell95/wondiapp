import React from 'react';
import {FETCHING_DATA_SIGNUP, FETCHING_DATA_SUCCESS_SIGNUP, FETCHING_DATA_FAILURE_SIGNUP,
        FETCHING_DATA_LOGIN, FETCHING_DATA_SUCCESS_LOGIN, FETCHING_DATA_FAILURE_LOGIN} from '../constants'
import AsyncStorage from '@react-native-community/async-storage';
import {PostUser,Postlogin,Postsesiones,ResetSocial} from '../api'
//import {Toast} from 'native-base';
import {Alert} from 'react-native';
import NavigationService from '../../config/services/NavigationService.js';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';
//idioma
//import I18n from '../../config/LanguageService';
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {
    return {type: FETCHING_DATA_SIGNUP}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SIGNUP, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SIGNUP}
}

//Registrando un usuario
export const signuppost = (data) =>{ 
    //detectando lenguaje para los mensajes
    /*if (data.languaje != null) {
        I18n.locale = data.languaje
    }*/
    return (dispatch) => {
        //enviando informacion del usuario
        PostUser(data)
            .then(([response, json]) => {
                const success = `${JSON.stringify(json.success)}`;
                if (success == 'false') {
                    if (json.data.User) {
                        if (json.data.User == "The user has already been taken.") {
                            if (data.social == true) {
                                 dispatch(resets({email:data.email,password:data.pass,photo:data.photo}))
                                //dispatch(login({email:data.email,password:data.pass,photo:data.photo,languaje:data.languaje,user:data.user_id,token:data.token,notif:data.notif}))
                            }
                            else{
                                dispatch(ToastActionsCreators.displayError('El usuario ya existe en Wondi App.'));
                            }
                        }
                        else if (json.data.User == "The user may not be greater than 20 characters.") {
                            dispatch(ToastActionsCreators.displayWarning('El usuario no puede tener más de 20 caracteres.'));
                        }
                        else{
                            dispatch(ToastActionsCreators.displayError('Error desconocido.'));
                        }
                    }
                    else if (json.data.email){
                        if (json.data.email == "The email has already been taken.") {
                            if (data.social == true) {
                                dispatch(resets({email:data.email,password:data.pass,photo:data.photo}))
                            }
                            else{
                                dispatch(ToastActionsCreators.displayWarning('El correo ya existe en Wondi App.'));
                            }
                        }
                        else if (json.data.email == "The email must be a valid email address.") {
                            dispatch(ToastActionsCreators.displayWarning('El correo no es valido.'));
                        }
                        else{
                            dispatch(ToastActionsCreators.displayError('Error desconocido.'));
                        }
                    }
                    else{
                       dispatch(ToastActionsCreators.displayError('Error desconocido.'));
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

                    try{
                        //datos del dispositivo
                        var isTablet = DeviceInfo.isTablet();
                        if (isTablet == 'true') {
                            var tdisp = '0'
                        }
                        else{
                            var tdisp = '1'
                        }
                        var disp = DeviceInfo.getSystemName();
                        if (disp == 'Android') {
                            var system = '1'
                        }
                        else{
                            var system = '0'
                        }
                        var so = DeviceInfo.getSystemVersion();
                        var deviceId = DeviceInfo.getDeviceId();
                        var model = DeviceInfo.getManufacturer();
                        dispatch(ToastActionsCreators.displayInfo('Usuario creado.'));
                        dispatch(getDataSuccess(json));
                        dispatch(PostDatasession2({user_id:user,Tip_Disp:tdisp,Dispositivo:system,OS:so,Id_dispositivo:deviceId,Nombre_dispositivo:model}));
                      
                    }
                    catch(e){
                        dispatch(ToastActionsCreators.displayError('Credenciales invalidas.'));
                    }
                }
            })
            .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

//reset contraseña
export const resets = (data) =>{
    return (dispatch) => {
     ResetSocial(data)
        .then(([response, json]) => {
            const success = `${JSON.stringify(json.success)}`;
            if (success == 'true') {
                dispatch(login({email:data.email,password:data.password,photo:data.photo}))
            }
            else{
                dispatch(ToastActionsCreators.displayError('Credenciales invalidas.'));
            }
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

export const getDatalogin = () => {
    return {type: FETCHING_DATA_LOGIN}
}

export const getDataSuccesslogin = (data) => {
    return {type: FETCHING_DATA_SUCCESS_LOGIN, data}
}

export const getDataFailurelogin = (data) => {
    return {type: FETCHING_DATA_FAILURE_LOGIN}
}

//Iniciando session
export const login = (data) =>{ 
    //detectando lenguaje para los mensajes
    //if (data.languaje != null) {
    //    I18n.locale = data.languaje
    //}
    return (dispatch) => {
        dispatch(getDatalogin())
        //enviando informacion del usuario
        Postlogin(data)
            .then(([response, json]) => {

                const success = `${JSON.stringify(json.success)}`;
                if (success == 'false') {
                    if (json.message == 'No existe la cuenta') {
                        dispatch(ToastActionsCreators.displayWarning('No existe la cuenta.'));
                    }
                    else{
                        dispatch(ToastActionsCreators.displayError('Credenciales invalidas.'));
                    }
                }
                else if (success == 'true') {            
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
                    try{
                        //datos del dispositivo
                        var isTablet = DeviceInfo.isTablet();
                        if (isTablet == 'true') {
                          var tdisp = '0'
                        }
                        else{
                          var tdisp = '1'
                        }
                        var disp = DeviceInfo.getSystemName();
                        if (disp == 'Android') {
                          var system = '1'
                        }
                        else{
                          var system = '0'
                        }
                        var so = DeviceInfo.getSystemVersion();
                        var deviceId = DeviceInfo.getDeviceId();
                        var model = DeviceInfo.getManufacturer();
                        dispatch(getDataSuccesslogin(json))
                        dispatch(PostDatasession({user_id:user,Tip_Disp:tdisp,Dispositivo:system,OS:so,Id_dispositivo:deviceId,Nombre_dispositivo:model}))
                    }
                    catch(e){
                        dispatch(ToastActionsCreators.displayError('Credenciales invalidas.'));
                    }
                }
                else{
                    dispatch(ToastActionsCreators.displayError('Credenciales invalidas.'));
                }
            })
            .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

//guardando datos de sessiones
export const PostDatasession = (data) => {
    return (dispatch) => {
    
        Postsesiones(data)
        .then(([response, json]) => {
            const success = `${JSON.stringify(json.success)}`;
            //enviando a pantalla de home
            dispatch(ToastActionsCreators.displayInfo('Acceso concedido.'));
            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                largeIcon: "ic_stat_name",
                smallIcon: "ic_stat_name",
                title: 'Sessión iniciada',
                message: 'Ahorremos todos juntos!', // (required)
                date: new Date(Date.now()),
                vibrate: true, // (optional) default: true
                vibration: 300,
                tag: 'some_tag', // (optional) add tag to message
                group: "group", // (optional) add group to message
                ongoing: false,
            });
            //NavigationService.reset('Home_ini');
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

//guardando datos de sessiones 1 uso
export const PostDatasession2 = (data) => {
    return (dispatch) => {
    
        Postsesiones(data)
        .then(([response, json]) => {
            const success = `${JSON.stringify(json.success)}`;
            //enviando a pantalla de home
            dispatch(ToastActionsCreators.displayInfo('Acceso concedido.'));
            PushNotification.localNotificationSchedule({
                //... You can use all the options from localNotifications
                largeIcon: "ic_stat_name",
                smallIcon: "ic_stat_name",
                title: 'Sessión iniciada',
                message: 'Ahorremos todos juntos!', // (required)
                date: new Date(Date.now()),
                vibrate: true, // (optional) default: true
                vibration: 300,
                tag: 'some_tag', // (optional) add tag to message
                group: "group", // (optional) add group to message
                ongoing: false,
            });
            NavigationService.reset('Beforestarting');
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}