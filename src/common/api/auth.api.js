import { loadingStatus, getProfileData, addNewAddress, removeAddress } from '../actions/auth.actions';
import { setFeedAddresses, updateFeedAddresses } from '../actions/feed.actions';
import { successToast } from '../../util/toasts/toasts';
import { post, deleteRequest } from './api';

export function signUpAPI(data, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await post(`/user/auth/sign-up`, data, false, {400:'Email already in use'});
        if(response.status === 200){
            dispatch(loadingStatus(false));
            message(`Signed up successfully! Please check your email: ${data.email} to verify your account`, true);
            localStorage.clear();
        }else{
            dispatch(loadingStatus(false));
            message(response);
        }
    };
};

export function logInAPI(data, loginSuccess, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await post(`/user/auth/login`, data, false, {401:'Wrong email or password',403:'Please verify your account'});
        if(response.status === 200){
            localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
            localStorage.setItem("USER_ID", response.data.userId);
            dispatch(getProfileData({email: response.data.email, phone: response.data.phone, addresses: response.data.addresses}));
            dispatch(setFeedAddresses(response.data.addresses));
            loginSuccess();
        }else{
            dispatch(loadingStatus(false));
            message(response);
        }
    };
};

export function verifyAccountAPI(hashedUserId) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await post(`/user/auth/verify-account`,{hashedUserId:hashedUserId}, false, {401:'Unauthorized'});
        if(response.status === 200){
            dispatch(loadingStatus(false));
        }else{
            dispatch(loadingStatus(false));
            alert(response);
        }
    };
};

export function forgottenPasswordAPI(data, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await post(`/user/auth/forgotten-password`,data, false, {401:"Email doesn't exist", 400:'We already sent you a link'});
        if(response.status === 200){
            dispatch(loadingStatus(false));
            message("We sent you a link for changing password on your email !", true);
        }else{
            dispatch(loadingStatus(false));
            message(response);
        }
    };
};

export function newPasswordAPI(data, userId, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await post(`/user/auth/new-password`,{newPassword: data.newPassword, userId: userId},false,{401:'Unauthorized'});
        if(response.status === 200){
            dispatch(loadingStatus(false));
            message("Successfuly created new password", true);
        }else{
            dispatch(loadingStatus(false));
            alert(response);
        }
    };
};

export function addNewAddressAPI(data) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        data.position = JSON.parse(localStorage.getItem('POSITION'));
        data.address = localStorage.getItem('ADDRESS');
        data.userId = localStorage.getItem("USER_ID");
        localStorage.removeItem('POSITION');
        localStorage.removeItem('ADDRESS');
        let response = await post(`/user/auth/add-new-address`, data, true, {401:'Unauthorized'});
        if(response.status === 200){
            dispatch(addNewAddress(response.data));
            dispatch(updateFeedAddresses({type: "ADD", address: response.data}));
            document.getElementById('search-google-maps').value = ''; //clear autocomplete input
            successToast('Successfully added!');
        }else{
            dispatch(loadingStatus(false));
            alert(response);
        }
    };
};

export function removeAddressAPI(addressId, closeModal) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await deleteRequest(`/user/auth/remove-address/${addressId}`, true, {401:'Unauthorized'});
        if(response.status === 200){
            dispatch(removeAddress(response.data));
            dispatch(updateFeedAddresses({type: "REMOVE", addressId: response.data}));
            closeModal();
            successToast('Successfully deleted!');
        }else{
            dispatch(loadingStatus(false));
            alert(response);
        }
    };
};

export function changePasswordAPI(data, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await post(`/user/auth/change-password`, {oldPassword: data.oldPassword, newPassword: data.newPassword}, true, {400:'Old password is incorrect',401:'Unauthorized'}); 
        if(response.status === 200){
            dispatch(loadingStatus(false));
            message("Sucessfully changed your password", true);
        }else{
            dispatch(loadingStatus(false));
            message(response);
        }
    };
};