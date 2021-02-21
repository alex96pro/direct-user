import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { loadingStatus, getProfileData, addNewAddress, removeAddress } from '../actions/auth.actions';
import { setFeedAddresses, updateFeedAddresses } from '../actions/feed.actions';
import { successToast } from '../../util/toasts/toasts';
import { get, post } from './api';

export function signUpAPI(data, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await post(`${BACKEND_API}/auth/sign-up`,data);
        if(response.status === 200){
            dispatch(loadingStatus(false));
            message(`Signed up successfully! Please check your email: ${data.email} to verify your account`, true);
            localStorage.clear();
        }else{
            dispatch(loadingStatus(false));
            message(response.data);
        }
    };
};

export function logInAPI(data, loginSuccess, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await get(`${BACKEND_API}/auth/login?email=${data.email}&password=${data.password}`,false);
        if(response.status === 200){
            localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
            localStorage.setItem("USER_ID", response.data.userId);
            dispatch(getProfileData({email: response.data.email, phone: response.data.phone, addresses: response.data.addresses}));
            dispatch(setFeedAddresses(response.data.addresses));
            loginSuccess();
        }else{
            dispatch(loadingStatus(false));
            message(response.data);
        }
    };
};

export function verifyAccountAPI(hashedUserId) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/verify-account`,{hashedUserId:hashedUserId});
            if(response.status === 200){
                dispatch(loadingStatus(false));
            }
        }catch(err){
            dispatch(loadingStatus(false));
            if(err.response.status === 401){
                alert("UNAUTHORIZED");
            }else{
                alert("SERVER ERROR");
            }
            console.log(err);
        }
    };
};

export function forgottenPasswordAPI(data, message) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/forgotten-password`,data);
            if(response.status === 200){
                dispatch(loadingStatus(false));
                message("We sent you a link for changing password on your email !", true);
            }
        }catch(err){
            dispatch(loadingStatus(false));
            switch(err.response.status){
                case 401:
                    message("Email doesn't exist");
                    break;
                case 400:
                    message('We already sent you a link');
                    break;
                default:
                    message('Server error');
            }
        }
    };
};

export function newPasswordAPI(data, userId, message) {
    return async (dispatch) => {
        dispatch(loadingStatus(false));
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/new-password`,{newPassword: data.newPassword, userId: userId});
            if(response.status === 200){
                dispatch(loadingStatus(false));
                message("Successfuly created new password", true);
            }
        }catch(err){
            dispatch(loadingStatus(false));
            if(err.response.status === 401){
                alert("UNAUTHORIZED");
            }else{
                alert("SERVER ERROR");
            }
        }
    };
};

export function addNewAddressAPI(data) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            data.position = JSON.parse(localStorage.getItem('POSITION'));
            data.address = localStorage.getItem('ADDRESS');
            data.userId = localStorage.getItem("USER_ID");
            localStorage.removeItem('POSITION');
            localStorage.removeItem('ADDRESS');
            let response = await axios.post(`${BACKEND_API}/auth/add-new-address`, data,
            {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            dispatch(addNewAddress(response.data));
            dispatch(updateFeedAddresses({type: "ADD", address: response.data}));
            document.getElementById('search-google-maps').value = ''; //clear autocomplete input
            successToast('Successfully added!');
        }catch(err){
            dispatch(loadingStatus(false));
        }
    };
};

export function removeAddressAPI(addressId, closeModal) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.delete(`${BACKEND_API}/auth/remove-address/${addressId}`,
            {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            dispatch(removeAddress(response.data));
            dispatch(updateFeedAddresses({type: "REMOVE", addressId: response.data}));
            closeModal();
            successToast('Successfully deleted!');
        }catch(err){
            dispatch(loadingStatus(false));
        }
    };
};

export function changePasswordAPI(data, message) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.post(`${BACKEND_API}/auth/change-password`, {oldPassword: data.oldPassword, newPassword: data.newPassword}, 
            {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            if(response.status === 200){
                dispatch(loadingStatus(false));
                message("Sucessfully changed your password", true);
            }
        }catch(err){
            dispatch(loadingStatus(false));
            if(err.response.status === 400){
                message("Incorrect old password");
            }
        }
    };
};