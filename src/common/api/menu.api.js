import { get } from './api';
import { loadingStatus, getMealsFromMenu, noMealsInMenu } from '../actions/menu.actions';
import { getClientDay, getClientTime } from '../../util/functions';

export function getMealsFromMenuAPI(id) {
    return async (dispatch) => {
        dispatch(loadingStatus(true));
        let time = getClientTime();
        let day = getClientDay();
        let response = await get(`/user/menu/meals/${id}/${day}/${time}`, false);
        if(response.data.meals && response.data.meals.length > 0){
            dispatch(getMealsFromMenu({meals: response.data.meals, restaurant: response.data.restaurant}));
        }else{
            dispatch(noMealsInMenu('This restaurant has no meals in menu'));
        }
    };
};