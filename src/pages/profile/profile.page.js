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
    const user = useSelector(state => state.authentication.user);
    const loadingStatusFlag = useSelector(state => state.authentication.loadingStatus);
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
            {loadingStatusFlag ? <Loader/>:
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
};