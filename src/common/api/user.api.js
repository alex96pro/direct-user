import axios from 'axios';
import { BACKEND_API } from '../../util/consts';
import { loadingStatus } from '../actions/user.actions';
import { getDailySpecials } from '../actions/user.actions';
import { endOfResults } from '../actions/user.actions';
import { DEFAULT_RANGE } from '../../util/consts';

export function getDailySpecialsAPI(scrollCount = 1, range = DEFAULT_RANGE) {
    return async (dispatch) => {
        try{
            dispatch(loadingStatus(true));
            let lat = localStorage.getItem("LATITUDE");
            let lon = localStorage.getItem("LONGITUDE");
            let response = await axios.get(`${BACKEND_API}/user/daily-specials?scrollCount=${scrollCount}&lat=${lat}&lon=${lon}&range=${range}`,
            {headers:{'Authorization':`Basic ${localStorage.getItem("ACCESS_TOKEN")}`}});
            if(response.data.length){
                dispatch(getDailySpecials({meals: response.data}));
            }else{
                dispatch(endOfResults("End of results"));
            }
            
        }catch(err){
            console.log(err);
        }
    }
}