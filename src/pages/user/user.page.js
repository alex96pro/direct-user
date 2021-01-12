import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDailySpecialsAPI } from '../../common/api/user.api';
import { changeRangeForDailySpecials } from '../../common/actions/user.actions';
import NavBar from '../../components/nav-bar/nav-bar';
import Loader from '../../images/loader.gif';
import { CURRENCY, DISTANCE, DEFAULT_RANGE, MEAL_FILTERS } from '../../util/consts';
import MealModal from './meal.modal';
import { useForm } from 'react-hook-form';
import './user.page.scss';

var scrollCount = 1;
var range = DEFAULT_RANGE;

export default function User() {

    const dispatch = useDispatch();
    const {meals, loadingStatus, message, endOfResultsFlag} = useSelector(state => state.user);
    const [modal, setModal] = useState({show:false, selectedMeal:{}});
    const {register, handleSubmit, errors} = useForm();
    const [tags, setTags] = useState([]);

    const bottomOfPage = () => {
        if ((window.innerHeight + window.scrollY) === document.body.offsetHeight) {
            if(!endOfResultsFlag){
                dispatch(getDailySpecialsAPI(++scrollCount, range));
                console.log(tags);
            }
        }
    };

    const changeRange = (data) => {
        scrollCount = 1;
        range = data.range;
        dispatch(changeRangeForDailySpecials());
        dispatch(getDailySpecialsAPI(1, data.range));
    }

    const addTag = (event) => {
        let newTags = [];
        if(event.target.checked){
            newTags = [...tags, event.target.value];
        }else{
            newTags = tags.filter(tag => tag !== event.target.value);
        }
        setTags(newTags);
    }
    useEffect(() => {
        scrollCount = 1;
        range = 5;
        window.navigator.geolocation.getCurrentPosition((position) => {
            localStorage.setItem("LATITUDE",position.coords.latitude);
            localStorage.setItem("LONGITUDE",position.coords.longitude);
            dispatch(getDailySpecialsAPI(1));
        }, console.log);
    }, [dispatch]);
 
    useEffect(() => {
        window.addEventListener('scroll', bottomOfPage);
        return () => {
            window.removeEventListener('scroll', bottomOfPage);
        }
        // eslint-disable-next-line
    },[dispatch, endOfResultsFlag]);

    const showModal = (meal) => {
        setModal({show: true, selectedMeal: meal});
    };

    const closeModal = () => {
        setModal({show: false, selectedMeal: {}});
    }

    return(
        <div className="user">
            <NavBar loggedIn={true}/>
                <div className="meal-filters">
                    <form onSubmit={handleSubmit(changeRange)}>
                        <div className="label-accent-color">Range</div>
                        <input type="number" defaultValue='5' ref={register({required: true})} name="range"/>
                        <label className="label-accent-color">{DISTANCE}</label>
                        {errors.range && <p className="message-danger">Range is required</p>}
                        <button type="submit" className="button-small">Apply</button>
                    </form>
                    <div className="meal-tags">
                        <div className="label-accent-color">Filters</div>
                        {MEAL_FILTERS.map((tag, index) => 
                        <div className="label-accent-color" key={index}>
                            <input type="checkbox" onChange={addTag} value={tag}/>{tag}
                        </div>
                        )}
                    </div>
                </div>
                <div className="meals-container">
                    {meals.map((meal, index) => 
                    <div className="meal-container" key={index} onClick={() => showModal(meal)}>
                        <div className="meal-header">
                            <div className="meal-name">{meal.mealName}</div>
                            <div className="meal-price">{meal.price}{CURRENCY}</div>
                        </div>
                        <img src={meal.photo} alt="meal" width="300px" height="300px"/>
                    </div>)}
                    {loadingStatus && <img src={Loader} alt="Loading..." className="loader"/>}
                    {message && <div className="message-success">{message}</div>}
                    {modal.show && <MealModal closeModal={closeModal} meal={modal.selectedMeal}/>}
                </div>
        </div>
    );
}