
import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { loadingStatus, getMealsFromMenu, noMealsInMenu } from '../actions/menu.actions';

export function getMealsFromMenuAPI(id) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.get(`${BACKEND_API}/user/menu/${id}`);
            if(response.data && response.data.length > 0){
                dispatch(getMealsFromMenu(response.data));
            }else{
                dispatch(noMealsInMenu('This restaurant has no meals in menu'));
            }
        }catch(err){
            console.log(err);
        }
    };
};