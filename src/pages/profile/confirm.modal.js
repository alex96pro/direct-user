import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAddressAPI } from '../../common/api/auth.api';
import ConfirmButton from '../../components/confirm-button';

export default function ConfirmModal(props) {
    
    const [modalOpacity, setModalOpacity] = useState(0);
    const {loadingStatus} = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const deleteAddress = () => {
        dispatch(removeAddressAPI(props.addressIdToRemove, props.closeModal));
    };

    useEffect(() => {
        setModalOpacity(1);
    }, []);

    return (
        <div className="modal">
            <div className="modal-underlay" onClick={() => props.closeModal()}></div>
            <div className="modal-container" style={{opacity:modalOpacity}}>
                <div className="modal-header">
                    <i className="fas fa-times fa-2x" onClick={() => props.closeModal()}></i>
                </div>
                <div className="modal-body-1">
                    <div className="label">
                        {props.text}
                    </div>
                    <ConfirmButton onClick={deleteAddress} loadingStatus={loadingStatus} text='Delete'/>
                </div>
            </div>
        </div>
    );
};