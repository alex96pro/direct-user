import './feed.page.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealsAPI } from '../../common/api/feed.api';
import { clearMeals, changeAddress, changeRange, changeTag, addDelivery, bottomOfPage } from '../../common/actions/feed.actions';
import { useForm } from 'react-hook-form';
import { DISTANCE, MEAL_TAGS } from '../../util/consts';
import MealModal from './meal.modal';
import NavBar from '../../components/nav-bar/nav-bar';
import Loader from '../../components/common/loader';
import Meals from '../../components/meals/meals.component';

export default function Feed() {

    const dispatch = useDispatch();
    const {meals, addresses, loadingStatus, message, endOfResultsFlag} = useSelector(state => state.feed);
    const {currentAddress, range, tags, delivery, scrollCount} = useSelector(state => state.feed);
    const [modal, setModal] = useState({show:false, selectedMeal:{}});
    const {register, handleSubmit, errors} = useForm();

    const showModal = (meal) => {
        setModal({show: true, selectedMeal: meal});
    };

    const closeModal = () => {
        setModal({show: false, selectedMeal: {}});
    };

    const handleChangeAddress = (event) => {
        if(event.target.value === "currentLocation"){
            window.navigator.geolocation.getCurrentPosition((position) => {
            dispatch(changeAddress({address:'Current location', lat: position.coords.latitude, lon: position.coords.longitude}));
            }, console.log);
        }else{
            let adr = JSON.parse(event.target.value);
            dispatch(changeAddress(adr));
        }
    };

    const handleChangeRange = (data) => {
        dispatch(changeRange(data.range));
    };

    const handleChangeTag = (event) => {
        if(event.target.checked){
            dispatch(changeTag({tag: event.target.value, checked: true}));
        }else{
            dispatch(changeTag({tag: event.target.value, checked: false}));
        }
    };

    const addDeliveryOption = (event) => {
        if(event.target.checked){
            dispatch(addDelivery(true));
        }else{
            dispatch(addDelivery(false));
        }
    };

    const bottomOfPageHandler = () => { //FUNCTION THAT NEEDS TO USE stateRef
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
            dispatch(bottomOfPage());
        }
    };
    
    useEffect(() => { // ON MOUNT AND UNMOUNT
        window.addEventListener('scroll', bottomOfPageHandler);
        return () => {
            window.removeEventListener('scroll', bottomOfPageHandler);
            dispatch(clearMeals());
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if(currentAddress.address && !endOfResultsFlag){ // store loaded into component and not end of results
            dispatch(getMealsAPI(currentAddress, range, tags, delivery, scrollCount));
        }
    },[currentAddress, range, tags, delivery, scrollCount, endOfResultsFlag, dispatch]);


    return(
        <div className="feed">
            <NavBar loggedIn={true}/>
                <div className="meal-filters">
                        <div className="label-accent-color">Current address</div>
                            <select onChange={handleChangeAddress}>
                                {addresses.map(a =>
                                <option value={JSON.stringify(a)}>
                                    {a.address}
                                </option>)}
                                <option value="currentLocation">
                                    Current Location
                                </option>
                            </select>
                    <div className="meal-range">
                        <form onSubmit={handleSubmit(handleChangeRange)}>
                            <div className="label-accent-color">Range</div>
                            <input type="number" defaultValue={range} ref={register({required: true})} name="range"/>
                            <label className="label-accent-color">{DISTANCE}</label>
                            {errors.range && <p className="message-danger">Range is required</p>}
                            <button type="submit" className="button-small">Apply</button>
                        </form>
                    </div>
                    <div className="meal-filter-tags">
                        <div className="feed-filter-heading">Nutrition filters</div>
                        {MEAL_TAGS.map((tag, index) => 
                        <div className="feed-nutrition-filter" key={index}>
                            <input type="checkbox" onChange={handleChangeTag} value={tag.value}/>
                            <label className="label-accent-color">{tag.name}</label>
                        </div>
                        )}
                    </div>
                    <div className="meal-filter-tags">
                        <div className="feed-filter-heading">Delivery options</div>
                        <input type="checkbox" value="delivery" onChange={addDeliveryOption}/>
                        <label className="label-accent-color">Delivery</label>
                    </div>
                </div>
                
                <div className="meals-container">
                    <Meals meals={meals} showModal={showModal} feed={true}/>
                    {loadingStatus && <Loader/>}
                    {message && !loadingStatus && 
                    <div className="feed-bottom"><p className="message-success">{message}</p>
                    {scrollCount > 2 && <button onClick={() => window.scroll(0,0)} className="button-small">Go top</button>}</div>}
                    {modal.show && <MealModal closeModal={closeModal} meal={modal.selectedMeal}/>}
                </div>
        </div>
    );
};