import './profile.page.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileAPI } from '../../common/api/auth.api';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/nav-bar/nav-bar';
import ChangePasswordModal from './change-password.modal';
import Loader from '../../components/common/loader';

export default function Profile() {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const {user, loadingStatus} = useSelector(state => state.authentication);
    const history = useHistory();

    const closeModal = () => {
        setShowModal(false);
    }

    const unauthorised = () => {
        history.push('/');
    }

    useEffect(() => {
        dispatch(profileAPI(unauthorised));
        // eslint-disable-next-line
    },[dispatch]);

    return (
        <div className="profile">
            <NavBar loggedIn={true}/>
            {loadingStatus ? <Loader/>:
            <div className="profile-container">
                <div className="profile-container-header">Your Profile</div>
                <div className="profile-info">
                    <div className="profile-header-small">Email</div>
                    <div className="label-accent-color">{user.email}</div>
                    <div className="profile-header-small">Addresses</div>
                        {user.addresses.map((adr, index) =>
                            <div className="label-accent-color" key={index}>
                                <button className="profile-button-danger">
                                Remove
                                </button>
                                {index + 1} : {adr}
                            </div>
                        )}
                    <button className="button-small">Add new address</button>
                </div>
                <button onClick={() => setShowModal(true)} className="button-link">Change password</button>
            </div>
            }
            {showModal && <ChangePasswordModal closeModal={closeModal}/>}
        </div>
    );
};