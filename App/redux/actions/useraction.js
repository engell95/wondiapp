import {FETCHING_DATA_USER, FETCHING_DATA_SUCCESS_USER, FETCHING_DATA_FAILURE_USER} from '../constants'
import {fetchuserdet,Postsesiones,Postvisprod} from '../api'
//import {Toast} from 'native-base';
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {
    return {type: FETCHING_DATA_USER}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_USER, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_USER}
}

export const PostDatasession = (data) => {
    //console.log(data)
    return (dispatch) => {
    
        Postsesiones(data)
        .then(([response, json]) => {
        
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

export const PostDataprod = (data) => {
    return (dispatch) => {
    
        Postvisprod(data)
        .then(([response, json]) => {
            //console.log(json)
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

export const fetchDataUser = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchuserdet(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString())))
    }
}

/*export const Postcatg = (data) =>{
    return (dispatch) => {
       PostUserCatg(data)
       .then(([response, json]) => 
        {
            console.log('yes')
        })
        .catch((error) => dispatch(ToastActionsCreators.displayError(error.toString()))) 
    }
}*/