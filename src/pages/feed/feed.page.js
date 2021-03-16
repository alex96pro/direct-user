import './feed.page.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMealsAPI } from '../../common/api/feed.api';
import { changeRange, searchFeed, changeTag, addDelivery, bottomOfPage, redirectFromFeed } from '../../common/actions/feed.actions';
import { changeAddress } from '../../common/actions/feed.actions';
import { useForm } from 'react-hook-form';
import { DISTANCE, MEAL_TAGS } from '../../util/consts';
import { Checkbox, Select } from 'antd';
import NavBar from '../../components/nav-bar/nav-bar';
import Loader from '../../components/loader';
import MealsFeed from '../../components/meals-feed/meals-feed';
import MessageDanger from '../../components/message-danger';
import InputError from '../../components/input-error';

export default function Feed() {

    const dispatch = useDispatch();
    const {meals, loadingStatus, message, scrollCount, endOfResultsFlag} = useSelector(state => state.feed);
    const {addresses, currentAddress, search, range, tags, delivery, redirectedToFeed} = useSelector(state => state.feed);
    const loadingModifiers = useSelector(state => state.modifiers.loadingStatus);
    const {deliveryAddress} = useSelector(state => state.cart);
    const [messageDeliveryAddress, setMessageDeliveryAddress] = useState('');
    const [currentLocationSelected, setCurrentLocationSelected] = useState(false);
    const {register, handleSubmit, errors} = useForm({defaultValues:{search: search, range: range}});
    const [showFiltersForMobile, setShowFiltersForMobile] = useState(false);

    const handleChangeAddress = (selected) => {
        let selectedAddress = selected;
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
        if(search !== data.search){
            dispatch(searchFeed(data.search));
        }
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

    const handleChangeTag = (event, tag) => {
        if(event.target.checked){
            dispatch(changeTag({tag: tag, checked: true}));
        }else{
            dispatch(changeTag({tag: tag, checked: false}));
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

    const showOrHideFiltersForMobile = () => {
        let filters = document.getElementsByClassName('feed-filters')[0];
        if(filters){
            if(showFiltersForMobile){
                filters.style.visibility = "hidden";
                filters.style.top = '100vh';
            }else{
                filters.style.visibility = "visible";
                filters.style.top = '0';
            }
        }
        setShowFiltersForMobile(!showFiltersForMobile);
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
                        <div className="label">Search</div>
                        <div className="flex-row">
                            <input required minLength="3" type="text" id="search-feed" ref={register()} name="search" className="app-input app-input-with-icon"/>
                            {search && <span className="input-icon" onClick={clearSearch}>x</span>}
                            <button type="submit" className="button-for-input">Search</button>
                        </div>
                    </form>
                    <div className="label">Current address</div>
                    <Select onChange={handleChangeAddress} defaultValue={currentAddress.address}>
                        {addresses.map((addressItem, index) =>
                        <Select.Option value={addressItem.address} key={index} >
                            {addressItem.address}
                        </Select.Option>)}
                        <Select.Option value="Current location">
                            Current location
                        </Select.Option>
                    </Select>
                    {/* <select onChange={handleChangeAddress} defaultValue={currentAddress.address} className="app-select">
                        {addresses.map((addressItem, index) =>
                        <option value={addressItem.address} key={index} className="app-option">
                            {addressItem.address}
                        </option>)}
                        <option value="Current location" className="app-option">
                            Current location
                        </option>
                    </select> */}
                    {currentLocationSelected && 
                    <p className="label">Delivery is disabled when using current location</p>}
                    {messageDeliveryAddress && <MessageDanger text={messageDeliveryAddress}/>}
                
                    <form onSubmit={handleSubmit(handleChangeRange)}>
                        <div className="label">Range</div>
                        <div className="flex-row">
                            <input type="number" ref={register({required: true, min:1, max:100})} name="range" className="app-input app-input-with-icon"/>
                            <label className="input-icon">{DISTANCE}</label>
                            <button type="submit" className="button-for-input">Apply</button>
                        </div>
                        {errors.range && errors.range.type === "required" && <InputError text={'Range is required'}/>}
                        {errors.range && errors.range.type === "max" && <InputError text={`Maximal range is 100${DISTANCE}`}/>}
                    </form>
                    <div className="feed-filters-container">
                        <div className="feed-filters-heading">Delivery options</div>
                        <div className="feed-filter-row">
                            <i className="fas fa-truck fa-2x"></i>
                            <Checkbox onChange={handleAddDelivery} checked={delivery} id="checkbox-delivery"/>
                            <label className="feed-filter-label" htmlFor="checkbox-delivery">Delivery</label>
                        </div>
                    </div>
                    <div className="feed-filters-container">
                        <div className="feed-filters-heading">Nutrition filters</div>
                        {MEAL_TAGS.map((tag, index) => 
                        <div className="feed-filter-row" key={index}>
                            <div><i className={tag.icon}></i></div>
                            <Checkbox onChange={(event) => handleChangeTag(event, tag.value)} checked={tags.includes(tag.value)} id={`checkbox-nutrition-${index}`}/>
                            <label className="feed-filter-label" htmlFor={`checkbox-nutrition-${index}`}>{tag.name}</label>
                        </div>
                        )}
                    </div>
                </div>
                
                <div className="feed-meals-container">
                    <MealsFeed meals={meals}/>
                    {loadingStatus && <Loader/>}
                    {message && !loadingStatus && 
                    <div className="feed-bottom"><p className="message-success">{message}</p>
                    {scrollCount > 2 && <button onClick={() => window.scroll(0,0)} className="button-small">Go top</button>}</div>}
                </div>
                <button onClick={showOrHideFiltersForMobile} className="feed-footer-mobile">
                    {showFiltersForMobile ? 'Return to feed' : 'Filters'}
                </button>
                {loadingModifiers && <Loader className="loader-center" blackBackground/>}
        </div>
    );
};