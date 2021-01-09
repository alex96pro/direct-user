import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './pages/landing/landing.page';
import Login from './pages/login/login.page';
import SignUp from './pages/sign-up/sign-up.page';
import User from './pages/user/user.page';
import VerifyAccount from './pages/verify-account/verify-account.page';
import Profile from './pages/profile/profile.page';
import './App.scss';

export default function App() {
    return (
      <Router>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/sign-up" exact component={SignUp}></Route>
          <Route path="/profile" exact component={Profile}></Route>
          <Route path="/user" exact component={User}></Route>
          <Route path="/verify-account/:id" exact component={VerifyAccount}></Route>
      </Router>
    );
}