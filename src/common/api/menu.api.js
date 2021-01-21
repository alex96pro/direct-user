
import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { loadingStatus, getMealsFromMenu } from '../actions/menu.actions';

export function getMealsFromMenuAPI(id) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let response = await axios.get(`${BACKEND_API}/user/menu/${id}`);
            dispatch(getMealsFromMenu(response.data));

        }catch(err){
            console.log(err);
        }
    };
};