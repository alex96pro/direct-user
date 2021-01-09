import NavBar from '../../components/nav-bar/nav-bar';

export default function User() {
    return(
        <div>
            <NavBar loggedIn={true}/>
            Welcome user !
        </div>
    );
}