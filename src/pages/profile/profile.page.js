import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/nav-bar/nav-bar';
import './profile.page.scss';
import { profileAPI } from '../../common/api/auth.api';
import ChangePasswordModal from './change-password.modal';
import Loader from '../../images/loader.gif';

export default function Profile() {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    const loadingStatus = useSelector(state => state.authentication.loadingStatus);

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        dispatch(profileAPI());
    },[dispatch]);

    return (
        <div className="profile">
            <NavBar loggedIn={true}/>
            {loadingStatus ? <img src={Loader} alt="Loading..." className="loader"/>:
                <div className="profile-container">
                    <h1>Profile</h1>
                    <div className="label-accent-color">Email</div>
                    <div className="label-accent-color">{user.email}</div>
                    <button onClick={() => setShowModal(true)} className="button-link">Change password</button>
                    {showModal && <ChangePasswordModal closeModal={closeModal}/>}
                </div>
            }
        </div>
    );
}