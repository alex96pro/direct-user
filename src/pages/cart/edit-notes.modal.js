import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeNotes } from '../../common/actions/cart.actions';

export default function EditNotesModal(props) {

    const [modalOpacity, setModalOpacity] = useState(0);
    const [notes, setNotes] = useState(props.meal.notes);
    const dispatch = useDispatch();

    const handleChangeNotes = (event) => {
        setNotes(event.target.value);
    };

    const onChangeNotes = () => {
        dispatch(changeNotes({notes: notes, index: props.meal.index}));
        props.closeModal();
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
                    <div className="label">Notes for {props.meal.name}</div>
                    <textarea value={notes} onChange={handleChangeNotes}/>
                    <button onClick={onChangeNotes} className="button-long">Save changes</button>
                </div>
            </div>
        </div>
    );
}