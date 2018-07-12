/* Constants */
import {BASEURL, AUTH, failure, success, checkTimeout} from './actions.js';

export const UPDATE_CREDENTIALS = {REQUEST: 'UPDATE_CREDENTIALS', SUCCESS: 'UPDATE_CREDENTIALS_SUCCESS', FAIL: 'UPDATE_CREDENTIALS_FAIL'};
export const PUT_USER_DATA = {SUCCESS: 'PUT_USER_DATA_SUCCESS', FAIL: 'PUT_USER_DATA_FAIL'};
export const GET_USER_DATA = {SUCCESS: 'GET_USER_DATA_SUCCESS', FAIL: 'GET_USER_DATA_FAIL'};
export const GET_USERS = {SUCCESS: 'GET_USERS_SUCCESS', FAIL: 'GET_USERS_FAIL'};
export const GET_SETTINGS = {SUCCESS: 'GET_SETTINGS_SUCCESS', FAIL: 'GET_SETTINGS_FAIL'};
export const PUT_SETTINGS = {SUCCESS: 'PUT_SETTINGS_SUCCESS', FAIL: 'PUT_SETTINGS_FAIL'};
export const UNSUBSCRIBE = {REQUEST: 'UNSUBSCRIBE', SUCCESS: 'UNSUBSCRIBE_SUCCESS', FAIL: 'UNSUBSCRIBE_FAIL'};


/* Retrieves user personal data from the database */
export function getUserData(token){
    return (dispatch) => {
        return fetch(BASEURL+'user', { 
            headers: {
                [AUTH]: 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(success(GET_USER_DATA.SUCCESS, json)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_USER_DATA.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Retrieves a list of users from the database */
export function getUsers(token){
    return (dispatch) => {
        return fetch(BASEURL+'users', { 
            headers: {
                [AUTH]: 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(success(GET_USERS.SUCCESS, json)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_USERS.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Updates the user personal data in the database */
export function putUserData(data, token){
    return (dispatch) => {
        return fetch(BASEURL+'details', { 
            method: 'PUT',
            headers: {
                [AUTH]: 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(PUT_USER_DATA.SUCCESS));
                    dispatch(getUserData(token));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(PUT_USER_DATA.FAIL, response));
                    dispatch(getUserData(token));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Updates user credentials (username, email, password) in the database */
export function updateUserCredentials(data, token){
    return (dispatch) => {
        dispatch({type: UPDATE_CREDENTIALS.REQUEST});
        
        if(Object.keys(data).length < 1){return;}
        
        return fetch(BASEURL+'credentials', { 
            method: 'PUT',
            headers: {
                [AUTH]: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(UPDATE_CREDENTIALS.SUCCESS,{token: response.headers.get('Token')}));
                    dispatch(getUserData(response.headers.get('Token')));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(UPDATE_CREDENTIALS.FAIL, response));
                    dispatch(getUserData(token));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Retrieves user app settings from the database */
export function getSettings(token){
    return (dispatch) => {
        return fetch(BASEURL+'settings', { 
            headers: {
                [AUTH]: 'Bearer ' + token
            }
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    response.json()
                    .then((json) => dispatch(success(GET_SETTINGS.SUCCESS, json)));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(GET_SETTINGS.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Updates the user settings in the database */
export function putSettings(data, token){
    return (dispatch) => {
        return fetch(BASEURL+'settings', { 
            method: 'PUT',
            headers: {
                [AUTH]: 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            switch(response.status) {
                case 200:
                    dispatch(success(PUT_SETTINGS.SUCCESS));
                    dispatch(getSettings(token));
                    break;
                default:
                    checkTimeout(response, dispatch);
                    dispatch(failure(PUT_SETTINGS.FAIL, response));
                    dispatch(getSettings(token));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}

/* Unsubscribes the user from new lesson response emails */
export function unsubscribe(uid, kid){
    return (dispatch) => {
        dispatch({type: UNSUBSCRIBE.REQUEST});

        return fetch(BASEURL+'unsubscribe?uid='+uid+'&kid='+kid)
        .then((response) => {
            switch(response.status){
                case 200:
                    dispatch(success(UNSUBSCRIBE.SUCCESS));
                    break;
                default:
                    dispatch(failure(UNSUBSCRIBE.FAIL, response));
                    break;
            }
        })
        .catch((error) => console.error(error));
    }
}