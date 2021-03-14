import 'antd/dist/antd.css';
import './styles/foreign-components.scss';
import './styles/modal.scss';
import './styles/elements.scss';
import './styles/common.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import ProtectedRoute from './components/protected-route';
import Landing from './pages/landing/landing.page';
import Login from './pages/login/login.page';
import SignUp from './pages/sign-up/sign-up.page';
import Feed from './pages/feed/feed.page';
import Profile from './pages/profile/profile.page';
import Cart from './pages/cart/cart.page';
import Menu from './pages/menu/menu.page';
import VerifyAccount from './pages/verification/verify-account.page';
import ForgottenPassword from './pages/verification/forgotten-password.page';

export default function App() {
    return (
      <Router>
          <ToastContainer
            enableMultiContainer
            containerId={"top-right"}
            position={toast.POSITION.TOP_RIGHT}
          />
          <Route path="/" exact component={Landing}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/sign-up" exact component={SignUp}></Route>
          <Route path="/verify-account/:id" exact component={VerifyAccount}></Route>
          <Route path="/forgotten-password/:id" exact component={ForgottenPassword}></Route>
          <ProtectedRoute path="/profile" component={Profile}></ProtectedRoute>
          <ProtectedRoute path="/feed" component={Feed}></ProtectedRoute>
          <ProtectedRoute path="/cart" component={Cart}></ProtectedRoute>
          <ProtectedRoute path="/menu/:id" component={Menu}></ProtectedRoute>
      </Router>
    );
}