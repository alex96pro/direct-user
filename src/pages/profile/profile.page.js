import './profile.page.scss';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddressAPI } from '../../common/api/auth.api';
import ConfirmModal from './confirm.modal';
import NavBar from '../../components/nav-bar/nav-bar';
import ChangePasswordModal from './change-password.modal';
import InputError from '../../components/input-error';
import GoogleAutocomplete from '../../components/google-autocomplete';
import SubmitButton from '../../components/submit-button';

export default function Profile() {

    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({show:false, addressIdToRemove:''});
    const [messageAdd, setMessageAdd] = useState('');
    const [messageDelete, setMessageDelete] = useState({id: -1, text:''});
    const {email, phone, addresses, loadingStatus} = useSelector(state => state.authentication);
    const {deliveryAddress} = useSelector(state => state.cart);
    const {currentAddress} = useSelector(state => state.feed);
    const [addNewAddressShow, setAddNewAddressShow] = useState(false);

    const closeChangePasswordModal = () => {
        setChangePasswordModal(false);
    };

    const closeConfirmModal = () => {
        setConfirmModal({show:false, addressToRemove:''});
    };

    const checkRemoveAddress = (address) => {
        if(addresses.length === 1){
            setMessageDelete({id: address.addressId, text: "You can't remove your only address. Add new one, and delete desired address"});
        }else if(address.addressId === deliveryAddress.addressId){
            setMessageDelete({id: address.addressId, text: "You have meals in your cart for this address"});
        }else if(address.addressId === currentAddress.addressId){
            setMessageDelete({id: address.addressId, text: "This address is currently selected on your feed, please switch to other address"});
        }else{
            setMessageDelete({id: -1, text: ""});
            setConfirmModal({show:true, addressIdToRemove:address.addressId});
        }
    };

    const addNewAddress = (data) => {
        let newAddress = JSON.parse(localStorage.getItem('POSITION'));
        if(addresses.length === 5){
            setMessageAdd("You can have 5 addresses maximum");
            return;
        }
        if(newAddress){
            for(let i = 0; i < addresses.length; i++){
                if(addresses[i].lat === newAddress.lat && addresses[i].lon === newAddress.lon){
                    setMessageAdd("You already have that address");
                    return;
                }
            }
            setMessageAdd("");
            setMessageDelete({id: -1, text: ""});
            dispatch(addNewAddressAPI(data));
        }else{
            setMessageAdd('Address is required');
        }
    };

    return (
        <div className="profile">
            <NavBar loggedIn={true}/>
            <div className="profile-container">
                <div className="header">Your Profile</div>
                <div className="profile-info">
                    <div className="label">Email</div>
                    <div className="label">{email}</div>
                    <div className="label">Phone</div>
                    <div className="label">{phone}</div>
                    <div className="label">Addresses</div>

                    {addresses.map((address, index) =>
                    <React.Fragment>
                    <div className="profile-address-row" key={address.addressId}>
                            <div className="label">{index + 1}.
                            {address.address} {`(${address.description})`}</div>
                        <i className="fas fa-trash fa-2x" onClick={() => checkRemoveAddress(address)}></i>
                        
                    </div>
                    {messageDelete.id === address.addressId && <InputError text={messageDelete.text}/>}
                    </React.Fragment>
                    )}
                    {!addNewAddressShow && <button onClick={() => {setAddNewAddressShow(true);setMessageAdd(''); setMessageDelete({id: -1, text: ""});}} className="button-long">Add new address</button>}

                    {addNewAddressShow && 
                    <div className="profile-new-address">
                        <form onSubmit={handleSubmit(addNewAddress)}>
                            <GoogleAutocomplete placeholder='New address'/>
                            {messageAdd && <InputError text={messageAdd}/>}
                            <input type="text" name="description" ref={register({required:true})} 
                            placeholder="floor / apartment / other" 
                            className="app-input profile-address-description"/>
                            {errors.description && <InputError text={'This field is required'}/>}
                            <button type="button" onClick={() => {setAddNewAddressShow(false); setMessageAdd(''); setMessageDelete({id: -1, text: ""});}} className="button-normal">Cancel</button>
                            <SubmitButton loadingStatus={loadingStatus} small={true} text='Confirm'/>
                        </form>
                    </div>
                    }
                </div>
                <button onClick={() => setChangePasswordModal(true)} className="button-link">Change password</button>
            </div>
            {changePasswordModal && <ChangePasswordModal closeModal={closeChangePasswordModal}/>}
            {confirmModal.show && <ConfirmModal addressIdToRemove={confirmModal.addressIdToRemove} closeModal={closeConfirmModal}
            text='Are you sure you want to remove this address?'/>}
        </div>
    );
};