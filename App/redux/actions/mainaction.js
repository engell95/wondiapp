import AsyncStorage from '@react-native-community/async-storage';
import {PostBudget,PostBudgetD,DeleteBudget,Destroybudget,EditBudget,AmountBudget,Postcheck} from '../api';
//import {Toast} from 'native-base';
import { ToastActionsCreators } from 'react-native-redux-toast';
import NavigationService from '../../config/services/NavigationService.js';
//idioma
//import I18n from '../../config/LanguageService';

export const exituser = () =>{
    return (dispatch) => {
    // try {
         AsyncStorage.removeItem('user');
         AsyncStorage.removeItem('token');
         AsyncStorage.removeItem('id_shopping');
         AsyncStorage.removeItem('name_shopping');
         AsyncStorage.removeItem('search');
         AsyncStorage.removeItem('install');
         AsyncStorage.removeItem('photo');
   // } catch (error) {
     //   console.log(error)
        //dispatch(ToastActionsCreators.displayError(error))
    //}
    dispatch(ToastActionsCreators.displayWarning('Session expirada!'));
    NavigationService.navigate('Welcome');
    }
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
                        dispatch(ToastActionsCreators.displayError('Presupuesto no creado!'))
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
                                dispatch(ToastActionsCreators.displayError('Producto no guardado!'))
                            }
                            else{
                                dispatch(ToastActionsCreators.displayInfo('Producto guardado!'))
                            }
                        })
                        .catch((error) => {
                            dispatch(ToastActionsCreators.displayError(error.toString()))
                        })
                    }
                })
                .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
            }
            else{
                dispatch(exituser())
            }
        })
       .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    } 
}

//Nuevo presupuesto
export const newbudgetacces = (data) =>{   
    //I18n.locale = data.languaje
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
                        dispatch(ToastActionsCreators.displayError('Presupuesto no creado!'))
                    }
                    else{
                        const id_shopping = `${JSON.stringify(json.data.Cod_Presupuesto)}`;
                        let name_shopping = `${JSON.stringify(json.data.N_Presupuesto)}`;
                        AsyncStorage.setItem('id_shopping', id_shopping);
                        AsyncStorage.setItem('name_shopping', name_shopping);
                        dispatch(ToastActionsCreators.displayInfo('Presupuesto creado!'))
                        //NavigationService.navigate('Welcome');
                    }
                })
                .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    } 
}

//Agregar detalles a presupuesto
export const addbudget = (data) =>{ 
    //I18n.locale = data.languaje
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
                        dispatch(ToastActionsCreators.displayError('Producto no guardado!'))
                    }
                    else{  
                        dispatch(ToastActionsCreators.displayInfo('Producto guardado!'))
                    }
                })
                .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
            }
            else{
               dispatch(exituser())
            }
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

//Eliminar detalles a presupuesto
export const delbudget = (data) =>{
    //I18n.locale = data.languaje   
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
                .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

//Eliminar presupuesto
export const destroybudget = (data) =>{
    //I18n.locale = data.languaje   
    return (dispatch) => {
       Postcheck(data)
       .then(([response, json]) => 
        {
            const success = `${JSON.stringify(json.success)}`;
            if (json.success) {
                Destroybudget(data.id)
                .then(([response, json]) => {
                    dispatch(ToastActionsCreators.displayInfo('Presupuesto eliminado!'))
                    NavigationService.navigate('Budget_ini');
                })
                .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

//Edita datos de prosupuesto
export const editbudget = (data) =>{
    console.log(data)
    return (dispatch) => {
        Postcheck(data)
        .then(([response, json]) => 
        {  
            const success = `${JSON.stringify(json.success)}`;
            console.log(json);
            if (json.success) {
                const id_budget = data.id;
                EditBudget(data,id_budget)
                .then(([response, json]) => {
                    dispatch(ToastActionsCreators.displayInfo('Presupuesto Editado!'))
                })
            }
            else{
               dispatch(exituser())
            }
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
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
                .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
            }
            else{
                dispatch(exituser())
            }
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}