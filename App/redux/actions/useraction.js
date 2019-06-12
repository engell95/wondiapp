import {FETCHING_DATA_USER, FETCHING_DATA_SUCCESS_USER, FETCHING_DATA_FAILURE_USER} from '../constants'
import {fetchuserdet,PostUserCatg} from '../api'
import {Toast} from 'native-base';

export const getData = () => {
    return {type: FETCHING_DATA_USER}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_USER, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_USER}
}

export const fetchDataUser = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchuserdet(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            Toast.show({
                text: I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })
    }
}

export const Postcatg = (data) =>{
    return (dispatch) => {
       PostUserCatg(data)
       .then(([response, json]) => 
        {
            console.log('yes')
        })
        .catch((error) => {
             Toast.show({
                text: I18n.t('validate.error'),
                buttonText: 'Ok'
            })
        })  
    }
}