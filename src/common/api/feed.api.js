import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { loadingStatus } from '../actions/feed.actions';
import { getMeals } from '../actions/feed.actions';
import { endOfResults } from '../actions/feed.actions';
import { DEFAULT_RANGE } from '../../util/consts';

export function getMealsAPI(scrollCount = 1, range = DEFAULT_RANGE, tags = null, delivery = false) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let lat = localStorage.getItem("LATITUDE");
            let lon = localStorage.getItem("LONGITUDE");
            if(tags && tags.length === 0){
                tags = null;
            }
            let response = await axios.get(
            `${BACKEND_API}/user/feed?scrollCount=${scrollCount}&lat=${lat}&lon=${lon}&range=${range}&tags=${tags}&delivery=${delivery}`,
            {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            if(response.data.length){
                dispatch(getMeals({meals: response.data}));
            }else{
                dispatch(endOfResults("End of results"));
            }
            
        }catch(err){
            if(err.response.status === 401){
                alert("UNAUTHORIZED");
            }
            console.log(err);
        }
    };
};