import './feed.page.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealsAPI } from '../../common/api/feed.api';
import { changeRange, searchFeed, changeTag, addDelivery, bottomOfPage, redirectFromFeed } from '../../common/actions/feed.actions';
import { changeAddress } from '../../common/actions/feed.actions';
import { useForm } from 'react-hook-form';
import { DISTANCE, MEAL_TAGS } from '../../util/consts';
import NavBar from '../../components/nav-bar/nav-bar';
import Loader from '../../components/common/loader';
import MealsFeed from '../../components/meals-feed/meals-feed';
import MessageDanger from '../../components/common/message-danger';
import InputError from '../../components/common/input-error';

export default function Feed() {

    const dispatch = useDispatch();
    const {meals, loadingStatus, message, scrollCount, endOfResultsFlag} = useSelector(state => state.feed);
    const {addresses, currentAddress, search, range, tags, delivery, redirectedToFeed} = useSelector(state => state.feed);
    const {deliveryAddress} = useSelector(state => state.cart);
    const [messageDeliveryAddress, setMessageDeliveryAddress] = useState('');
    const [currentLocationSelected, setCurrentLocationSelected] = useState(false);
    const {register, handleSubmit, errors} = useForm({defaultValues:{search: search, range: range}});

    const handleChangeAddress = (event) => {
        let selectedAddress = event.target.value;
        if(selectedAddress === "Current location"){
            setCurrentLocationSelected(true);
            window.navigator.geolocation.getCurrentPosition((position) => {
            dispatch(changeAddress({address:'Current location', lat: position.coords.latitude, lon: position.coords.longitude}));
            }, console.log);
        }else{
            setCurrentLocationSelected(false);
            //check if user has items in cart, and prevent changing delivery address untill he clears cart
            if(deliveryAddress !== '' && deliveryAddress.address !== selectedAddress && selectedAddress !== 'Current location'){
                setMessageDeliveryAddress(`You already have meals in your cart for address "${deliveryAddress.address}"`);
            }else{
                setMessageDeliveryAddress('');
                let newAddress;
                addresses.forEach((addressItem) => { // select passes address as string, so we need to find object in addresses with that string as name
                    if(addressItem.address === selectedAddress){
                        newAddress = addressItem;
                    }
                });
                dispatch(changeAddress(newAddress)); 
            }  
        }   
    };

    const handleSearch = (data) => {
        dispatch(searchFeed(data.search));
    };

    const clearSearch = () => {
        let inputForSearch = document.getElementById('search-feed');
        if(inputForSearch){
            inputForSearch.value = '';
        }
        dispatch(searchFeed(''));
    };

    const handleChangeRange = (data) => {
        if(data.range !== range){
            dispatch(changeRange(data.range));
        }
    };

    const handleChangeTag = (event) => {
        if(event.target.checked){
            dispatch(changeTag({tag: event.target.value, checked: true}));
        }else{
            dispatch(changeTag({tag: event.target.value, checked: false}));
        }
    };

    const handleAddDelivery = (event) => {
        if(event.target.checked){
            dispatch(addDelivery(true));
        }else{
            dispatch(addDelivery(false));
        }
    };

    const handleBottomOfPage = () => {
        if((window.innerHeight + window.scrollY) > document.body.scrollHeight - 2) {
            dispatch(bottomOfPage());
        }
    };
     
    useEffect(() => { // ON MOUNT AND UNMOUNT
        window.addEventListener('scroll', handleBottomOfPage);
        return () => {
            dispatch(redirectFromFeed());
            window.removeEventListener('scroll', handleBottomOfPage);
        }
        //eslint-disable-next-line
    },[]);
    
    useEffect(() => { // ON UPDATES
        if(!endOfResultsFlag && !redirectedToFeed){
            dispatch(getMealsAPI(currentAddress, range, search, tags, delivery, scrollCount));
        }
    },[currentAddress, range, tags, delivery, scrollCount, endOfResultsFlag, redirectedToFeed, addresses, search, dispatch]);

    return(
        <div className="feed">
            <NavBar loggedIn={true}/>
                <div className="feed-filters">
                    <form onSubmit={handleSubmit(handleSearch)}>
                        <div className="label-accent-color">Search</div>
                        <input required minLength="3" type="text" id="search-feed" ref={register()} name="search" style={{width:'50%'}}/>
                        <button type="submit" className="button-small">Search</button>
                        {search && <button type="button" className="button-small" onClick={clearSearch}>Clear</button>}
                    </form>
                    <div className="label-accent-color">Current address</div>
                    <select onChange={handleChangeAddress} defaultValue={currentAddress.address}>
                        {addresses.map((addressItem, index) =>
                        <option value={addressItem.address} key={index}>
                            {addressItem.address}
                        </option>)}
                        <option value="Current location">
                            Current location
                        </option>
                    </select>
                    {currentLocationSelected && 
                    <p className="label-accent-color">Delivery is disabled when using current location</p>}
                    {messageDeliveryAddress && <MessageDanger text={messageDeliveryAddress}/>}
                
                    <form onSubmit={handleSubmit(handleChangeRange)}>
                        <div className="label-accent-color">Range</div>
                        <input type="number" ref={register({required: true, min:1, max:100})} name="range"/>
                        <label className="label-accent-color">{DISTANCE}</label>
                        <button type="submit" className="button-small">Apply</button>
                        {errors.range && errors.range.type === "required" && <InputError text={'Range is required'}/>}
                        {errors.range && errors.range.type === "max" && <InputError text={`Maximal range is 100${DISTANCE}`}/>}
                    </form>
                
                    <div className="feed-filters-container">
                        <div className="feed-filters-heading">Nutrition filters</div>
                        {MEAL_TAGS.map((tag, index) => 
                        <div className="feed-filters-nutrition" key={index}>
                            <i className={tag.icon}></i>
                            <div>
                                <input type="checkbox" onChange={handleChangeTag} value={tag.value} checked={tags.includes(tag.value)}/>
                                <label className="label-accent-color">{tag.name}</label>
                            </div>
                        </div>
                        )}
                    </div>
                    
                    <div className="feed-filters-container">
                        <div className="feed-filters-heading">Delivery options</div>
                        <i className="fas fa-truck fa-2x"></i>
                        <input type="checkbox" value="delivery" onChange={handleAddDelivery} checked={delivery}/>
                        <label className="label-accent-color">Delivery</label>
                    </div>
                </div>
                
                <div className="feed-meals-container">
                    <MealsFeed meals={meals}/>
                    {loadingStatus && <Loader/>}
                    {message && !loadingStatus && 
                    <div className="feed-bottom"><p className="message-success">{message}</p>
                    {scrollCount > 2 && <button onClick={() => window.scroll(0,0)} className="button-small">Go top</button>}</div>}
                </div>
        </div>
    );
};