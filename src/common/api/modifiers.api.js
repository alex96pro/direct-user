import { loadingStatus, getMealModifiers, getSpecialModifiers } from '../actions/modifiers.actions';
import { get } from './api';

export function getMealModifiersAPI(data, showModal) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await get(`/user/menu/modifiers/${data}`, false);
        if(response.status === 200){
            dispatch(getMealModifiers(response.data));
            showModal();
        }else{
            dispatch(loadingStatus(false));
            alert(response);
        }
    };
};

export function getSpecialModifiersAPI(data, showModal) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let response = await get(`/user/feed/modifiers/${data}`, false);
        if(response.status === 200){
            dispatch(getSpecialModifiers(response.data));
            showModal();
        }else{
            dispatch(loadingStatus(false));
            alert(response);
        }
    };
};