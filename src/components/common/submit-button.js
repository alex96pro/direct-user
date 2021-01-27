import Loader from '../../images/loader.gif';
export default function SubmitButton(props) {

    return (
        <button type="submit" className={props.className ? props.className : "button-long"}>
            {props.loadingStatus ? 
            <img src={Loader} className="loader-small" alt="Loading..."/> 
            : 
            props.text
            }
        </button>
    );
}