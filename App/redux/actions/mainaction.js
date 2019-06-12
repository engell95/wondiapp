import AsyncStorage from '@react-native-community/async-storage';
import {PostBudget,PostBudgetD,DeleteBudget,Destroybudget,EditBudget,AmountBudget,Postcheck} from '../api';
import {Toast} from 'native-base';
import NavigationService from '../../config/NavigationService.js';
//idioma
import I18n from '../../config/LanguageService';

const exituser = async () =>{
     try {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id_shopping');
        await AsyncStorage.removeItem('name_shopping');
        await AsyncStorage.removeItem('search');
    } catch (error) {
        Toast.show({
            text: I18n.t('validate.error'),
            buttonText: 'Ok'
        })
    }
    Toast.show({
        text: I18n.t('validate.login4'),
        buttonText: 'Ok'
    })
    NavigationService.navigate('Welcome');
}

//Nuevo presupuesto
export const newbudget = (data) =>{
    return (dispatch) => {
        Postcheck(data)
        .then(([response, json]) => 
        {
            const success = `${JSON.stringify(json.success)}`;
            if (json.success) {
                PostBudget(data)
                .then(([response, json]) => 
                {  
                    const success = `${JSON.stringify(json.success)}`;
                    if (success == 'false') {
                        Toast.show({
                            text: I18n.t('validate.main1'),
                            buttonText: 'Ok'
                        })
                    }
                    else{
                        const id_shopping = `${JSON.stringify(json.data.Cod_Presupuesto)}`;
                        let name_shopping = `${JSON.stringify(json.data.N_Presupuesto)}`
                        AsyncStorage.setItem('id_shopping', id_shopping);
                        AsyncStorage.setItem('name_shopping', name_shopping);                            
                        //mandando detalles de presupuesto
                        PostBudgetD(data,id_shopping)
                        .then(([response, json2]) => {
                            const success2 = `${JSON.stringify(json2.success)}`;
                            if (success2 == 'false') {
                                Toast.show({
                                    text: I18n.t('validate.main2'),
                                    buttonText: 'Ok'
                                })
                            }
                            else{
                                Toast.show({
                                    text: I18n.t('validate.main3'),
                                    buttonText: 'Ok'
                                })
                            }
                        })
                        .catch((error) =>{
                            Toast.show({
                                text: I18n.t('validate.error'),
                                buttonText: 'Ok'
                            })
                        }) 
                    }
                })
                .catch((error) => {
                     Toast.show({
                        text:  I18n.t('validate.error'),
                        buttonText: 'Ok'
                    })
                })
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => {
             Toast.show({
                text:  I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })
    } 
}

//Nuevo presupuesto
export const newbudgetacces = (data) =>{   
    I18n.locale = data.languaje
    return (dispatch) => {
        Postcheck(data)
        .then(([response, json]) => 
        {
            const success = `${JSON.stringify(json.success)}`;
            if (json.success) {
                PostBudget(data)
                .then(([response, json]) => 
                {  
                    const success = `${JSON.stringify(json.success)}`;
                    if (success == 'false') {
                        Toast.show({
                            text: I18n.t('validate.main1'),
                            buttonText: 'Ok'
                        })
                    }
                    else{
                        const id_shopping = `${JSON.stringify(json.data.Cod_Presupuesto)}`;
                        let name_shopping = `${JSON.stringify(json.data.N_Presupuesto)}`;
                        AsyncStorage.setItem('id_shopping', id_shopping);
                        AsyncStorage.setItem('name_shopping', name_shopping);
                        Toast.show({
                            text: I18n.t('validate.main4'),
                            buttonText: 'Ok'
                        })
                    }
                })
                .catch((error) => {
                     Toast.show({
                        text:  I18n.t('validate.error'),
                        buttonText: 'Ok'
                    })
                })
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => {
             Toast.show({
                text:  I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })
    } 
}

//Agregar detalles a presupuesto
export const addbudget = (data) =>{ 
    I18n.locale = data.languaje
    return (dispatch) => {
       Postcheck(data)
       .then(([response, json]) => 
        {
            const success = `${JSON.stringify(json.success)}`;
            if (json.success) {
                const id_card = data.id_card;
                PostBudgetD(data,id_card)
                .then(([response, json]) => {
                    const success = `${JSON.stringify(json.success)}`;
                    if (success == 'false') {
                        Toast.show({
                            text: I18n.t('validate.main2'),
                            buttonText: 'Ok'
                        })
                    }
                    else{  
                        Toast.show({
                            text: I18n.t('validate.main3'),
                            buttonText: 'Ok'
                        })
                    }
                })
                .catch((error) => console.log(error))
            }
            else{
               dispatch(exituser())
            }
        })
        .catch((error) => {
             Toast.show({
                text: I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })
    }
}

//Eliminar detalles a presupuesto
export const delbudget = (data) =>{
    I18n.locale = data.languaje   
    return (dispatch) => {
       Postcheck(data)
        .then(([response, json]) => 
        { 
            const success = `${JSON.stringify(json.success)}`;
            if (json.success) {
                const id_card = data.id_card;
                DeleteBudget(data,id_card)
                .then(([response, json]) => {
                })
                .catch((error) => {
                    Toast.show({
                        text: I18n.t('validate.error'),
                        buttonText: 'Ok'
                    })
                })
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => {
             Toast.show({
                text: I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })
    }
}

//Eliminar presupuesto
export const destroybudget = (data) =>{
    I18n.locale = data.languaje   
    return (dispatch) => {
       Postcheck(data)
       .then(([response, json]) => 
        {
            const success = `${JSON.stringify(json.success)}`;
            if (json.success) {
                Destroybudget(data.id)
                .then(([response, json]) => {
                    Toast.show({
                        text: I18n.t('validate.main5'),
                        buttonText: 'Ok'
                    })
                })
                .catch((error) => {
                    Toast.show({
                        text: I18n.t('validate.error'),
                        buttonText: 'Ok'
                    })
                })
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => {
             Toast.show({
                text: I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })  
    }
}

//Edita datos de prosupuesto
export const editbudget = (data) =>{
    return (dispatch) => {
        Postcheck(data)
        .then(([response, json]) => 
        {  
            const success = `${JSON.stringify(json.success)}`;
            if (json.success) {
                const id_budget = data.id;
                EditBudget(data,id_budget)
                .then(([response, json]) => {
                    Toast.show({
                        text: I18n.t('validate.main6'),
                        buttonText: 'Ok'
                    })
                })
                .catch((error) => 
                    Toast.show({
                        text: error,
                        buttonText: 'Ok'
                    })
                )
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => {
            Toast.show({
                text: I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })
    }
}

//Edita datos de prosupuesto
export const amountbudget = (data) =>{
    return (dispatch) => {
         Postcheck(data)
        .then(([response, json]) => 
        {  
            const success = `${JSON.stringify(json.success)}`;
            if (json.success) {
                const id_budget = data.id;
                AmountBudget(data,id_budget)
                .then(([response, json]) => {
                })
                .catch((error) =>{ 
                    Toast.show({
                        text: I18n.t('validate.error'),
                        buttonText: 'Ok'
                    })
                })
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => {
             Toast.show({
                text: I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })
    }
}