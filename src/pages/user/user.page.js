import NavBar from '../../components/nav-bar/nav-bar';

export default function User() {
    return(
        <div>
            <NavBar loggedIn={true}/>
            <h1>Welcome user</h1>
        </div>
    );
}