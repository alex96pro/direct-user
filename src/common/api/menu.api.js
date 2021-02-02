import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { loadingStatus, getMealsFromMenu, noMealsInMenu } from '../actions/menu.actions';

export function getMealsFromMenuAPI(id) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.get(`${BACKEND_API}/user/menu/${id}`);
            if(response.data.meals && response.data.meals.length > 0){
                dispatch(getMealsFromMenu({meals: response.data.meals, restaurant: response.data.restaurant}));
            }else{
                dispatch(noMealsInMenu('This restaurant has no meals in menu'));
            }
        }catch(err){
            dispatch(loadingStatus(false));
            console.log(err);
        }
    };
};