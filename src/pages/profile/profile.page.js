import './profile.page.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddressAPI, removeAddressAPI } from '../../common/api/auth.api';
import ConfirmModal from './confirm.modal';
import NavBar from '../../components/nav-bar/nav-bar';
import ChangePasswordModal from './change-password.modal';
import MessageDanger from '../../components/common/message-danger';
import GoogleAutocomplete from '../../components/common/google-autocomplete';
import Loader from '../../components/common/loader';

export default function Profile() {

    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({show:false, addressToRemove:''});
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const {user, loadingStatus} = useSelector(state => state.authentication);
    const {deliveryAddress} = useSelector(state => state.cart);

    const closeChangePasswordModal = () => {
        setChangePasswordModal(false);
    };

    const closeConfirmModal = () => {
        setConfirmModal({show:false, addressToRemove:''});
    };

    const checkRemoveAddress = (address) => {
        if(user.addresses.length === 1){
            setMessage("You can't remove your only address. Add new one, and delete desired address");
        }else if(address === deliveryAddress){
            setMessage("You have meals in your cart for that address");
        }else{
            setMessage("");
            setConfirmModal({show:true, addressToRemove:address});
        }
    };

    const removeAddress = () => {
        dispatch(removeAddressAPI(confirmModal.addressToRemove));
        closeConfirmModal();
    };

    const addNewAddress = () => {
        let addressExists = false;
        let newAddress = JSON.parse(localStorage.getItem('POSITION'));
        if(newAddress){
            for(let i = 0; i < user.addresses.length; i++){
                if(user.addresses[i].lat === newAddress.lat && user.addresses[i].lon === newAddress.lon){
                    addressExists = true;
                    break;
                }
            }
            if(addressExists){
                setMessage("You already have that address");
            }else{
                setMessage("");
                dispatch(addNewAddressAPI());
            }
            localStorage.removeItem('POSITION');
        }else{
            setMessage('Enter address');
        }
        
    };

    return (
        <div className="profile">
            <NavBar loggedIn={true}/>
            <div className="profile-container">
                <div className="profile-container-header">Your Profile</div>
                <div className="profile-info">
                    <div className="profile-header-small">Email</div>
                    <div className="label-accent-color">{user.email}</div>
                    <div className="profile-header-small">Addresses</div>

                    <div className="profile-new-address">
                        <GoogleAutocomplete placeholder='New address'/>
                        <button onClick={addNewAddress} className="profile-button">Add</button>
                    </div>
                    {loadingStatus && <Loader className="loader-small"/>}
                    {user.addresses.map((address, index) =>
                    <div className="profile-address-row" key={index}>
                        <div className="label-accent-color">
                            {index + 1} : {address.address}
                        </div>
                        <button onClick={() => checkRemoveAddress(address.address)} className="profile-button-danger">
                            Remove
                        </button>
                    </div>
                    )}
                    <MessageDanger text={message}/>
                </div>
                <button onClick={() => setChangePasswordModal(true)} className="button-link">Change password</button>
            </div>
            {changePasswordModal && <ChangePasswordModal closeModal={closeChangePasswordModal}/>}
            {confirmModal.show && <ConfirmModal confirm={removeAddress} closeModal={closeConfirmModal}
            text='Are you sure you want to remove this address?'/>}
        </div>
    );
};