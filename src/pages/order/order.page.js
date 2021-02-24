import './order.page.scss';
import socketClient from 'socket.io-client';
import NavBar from '../../components/nav-bar/nav-bar';
import { useEffect } from 'react';
import { BACKEND_API } from '../../util/consts';
import { useDispatch, useSelector } from 'react-redux';
import { getClientTime } from '../../util/functions';
import { sendOrder, orderAccepted, orderRejected } from '../../common/actions/order.actions';
import Loader from '../../components/loader';
var socket;

export default function Order() {

    const dispatch = useDispatch();
    const {meals, deliveryAddress} = useSelector(state => state.cart);
    const {phone} = useSelector(state => state.authentication);
    const {loadingStatus, orderSent, estimatedTime, rejectReason} = useSelector(state => state.order);
    
    useEffect(() => {
        socket = socketClient (BACKEND_API);
        socket.on('connection', () => {
            socket.emit('send-id',{userId: localStorage.getItem('USER_ID')});
        });
        socket.on('order-accepted', (args) => {
            dispatch(orderAccepted(args.estimatedTime));
        });
        socket.on('order-rejected', (args) => {
            dispatch(orderRejected(args.rejectReason));
        });
    });
    const handleSendOrder = () => {
        let mealsForRestaurant = [];
        let total = 0;
        for(let i = 0; i < meals.length; i++){
            mealsForRestaurant.push({name: meals[i].mealName, amount: meals[i].amount, notes: meals[i].notes});
            total += meals[i].price * meals[i].amount;
        }
        total = (Math.round(total * 100) / 100).toFixed(2);
        let time = getClientTime();
        socket.emit('user-send-order', {
            meals:mealsForRestaurant, 
            deliveryAddress: deliveryAddress.address + '(' + deliveryAddress.description + ')',
            total: total,
            phone: phone,
            time: time,
            restaurantId: meals[0].restaurantId, 
            userId: localStorage.getItem('USER_ID')
        });
        dispatch(sendOrder());
    };

    return <div className="order">
        <NavBar loggedIn={true}/>
        <div className="order-container">
            {loadingStatus ?
            <div className="order-status">
                <label className="header-accent-color">Waiting for {meals[0].restaurantName} response...</label>
                <Loader/>
            </div>
            :
            <div></div>
            }
            {!orderSent && <button onClick={handleSendOrder} className="button-normal">CONFIRM ORDER</button>}
            {estimatedTime && 
            <div className="order-status">
                <div className="header-accent-color">
                    Great news! {meals[0].restaurantName} accepted your order!
                </div>
                <div className="header-accent-color">
                    Estimated time for delivery: {estimatedTime[0] + estimatedTime[1]} minutes
                </div>
            </div>
            }
            {rejectReason && 
            <div className="order-status">
                <div className="header-accent-color">
                    Bad news! {meals[0].restaurantName} rejected your order!
                </div>
                <div className="header-accent-color">
                    Reason: {rejectReason}
                </div>
            </div>
            }
        </div> 
    </div>
}
