import './feed.page.scss';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealsAPI } from '../../common/api/feed.api';
import { clearMeals } from '../../common/actions/feed.actions';
import { useForm } from 'react-hook-form';
import { CURRENCY, DISTANCE, DEFAULT_RANGE, MEAL_FILTERS } from '../../util/consts';
import MealModal from './meal.modal';
import NavBar from '../../components/nav-bar/nav-bar';
import Loader from '../../components/common/loader';

export default function Feed() {

    const dispatch = useDispatch();
    const {meals, loadingStatus, message, endOfResultsFlag} = useSelector(state => state.user);
    const [modal, setModal] = useState({show:false, selectedMeal:{}});
    const {register, handleSubmit, errors} = useForm();
    const [state, setState] = useState({scrollCount: 1, range: DEFAULT_RANGE, tags: [], delivery: false, endOfResults: false});
    const stateRef = useRef(state);

    const setStateRef = data => {
        stateRef.current = data;
        setState(data);
    };

    const handleChangeRange = (data) => {
        setStateRef({...stateRef.current, scrollCount: 1, range: data.range});
        dispatch(clearMeals());
        dispatch(getMealsAPI(1, data.range, state.tags, state.delivery));
    };

    const addTag = (event) => {
        let newTags = [];
        if(event.target.checked){
            newTags = [...state.tags, event.target.value];
        }else{
            newTags = state.tags.filter(tag => tag !== event.target.value);
        }
        setStateRef({...stateRef.current, scrollCount: 1, tags: newTags});
        dispatch(clearMeals());
        dispatch(getMealsAPI(1, state.range, newTags, state.delivery));
    };

    const addDeliveryOption = (event) => {
        let delivery = !state.delivery;
        setStateRef({...stateRef.current, scrollCount: 1, delivery: event.target.checked ? true : false});
        dispatch(clearMeals());
        dispatch(getMealsAPI(1, state.range, state.tags, delivery));
    };

    const bottomOfPage = () => { //FUNCTION THAT NEEDS TO USE stateRef
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
            if(!stateRef.current.endOfResults){
                dispatch(getMealsAPI(stateRef.current.scrollCount + 1, stateRef.current.range, stateRef.current.tags, stateRef.current.delivery));
                setStateRef({...stateRef.current, scrollCount: stateRef.current.scrollCount + 1});
            }
        }
    };
    
    useEffect(() => { // ON MOUNT
        window.addEventListener('scroll', bottomOfPage);
        dispatch(clearMeals());
        dispatch(getMealsAPI());
        return () => {
            window.removeEventListener('scroll', bottomOfPage);
        }
        // eslint-disable-next-line
    }, []);
    
    useEffect(() => { // ON END OF RESULTS
        setStateRef({...stateRef.current, endOfResults: endOfResultsFlag});
    }, [endOfResultsFlag]);

    const showModal = (meal) => {
        setModal({show: true, selectedMeal: meal});
    };

    const closeModal = () => {
        setModal({show: false, selectedMeal: {}});
    };

    return(
        <div className="feed">
            <NavBar loggedIn={true}/>

                <div className="meal-filters">
                    <form onSubmit={handleSubmit(handleChangeRange)}>
                        <div className="label-accent-color">Range</div>
                        <input type="number" defaultValue='5' ref={register({required: true})} name="range"/>
                        <label className="label-accent-color">{DISTANCE}</label>
                        {errors.range && <p className="message-danger">Range is required</p>}
                        <button type="submit" className="button-small">Apply</button>
                    </form>
                    <div className="meal-filter-tags">
                        <div className="label-accent-color">Nutrition filters</div>
                        {MEAL_FILTERS.map((tag, index) => 
                        <div className="label-accent-color" key={index}>
                            <input type="checkbox" onChange={addTag} value={tag}/>{tag}
                        </div>
                        )}
                    </div>
                    <div className="meal-filter-tags">
                        <div className="label-accent-color">Delivery options</div>
                        <div className="label-accent-color"><input type="checkbox" value="delivery" onChange={addDeliveryOption}/>Delivery</div>
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
                        <div className="meal-bottom-container">
                            <div className="meal-tags">
                                {meal.tags.map((tag, tagIndex) => 
                                    <div className="meal-tag" key={tagIndex}>{tag}</div>
                                )}
                            </div>
                            <div className="delivery-tags">
                                <div className="meal-delivery-tag">{meal.delivery ? 'Delivery' : 'Pick up'}</div>
                            </div>
                        </div>
                    </div>)}
                    {loadingStatus && <Loader/>}
                    {message && !loadingStatus && 
                    <div className="user-bottom-page"><p className="message-success">{message}</p>
                    {state.scrollCount > 2 && <button onClick={() => window.scroll(0,0)} className="button-small">Go top</button>}</div>}
                    {modal.show && <MealModal closeModal={closeModal} meal={modal.selectedMeal}/>}
                </div>
        </div>
    );
};