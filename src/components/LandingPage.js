import { Link } from "react-router-dom";
// import LoginPage from "./LoginPage";
// import NewUserPage from "./NewUserPage";


export default function LandingPage() {
    return (
        <div className="LandingPage">
            <header>
                <h1>Sneaker Vault</h1>
                <h2>Store and keep track of al your feet heat </h2>
            </header>
            <h1>
                <button className="NewUser"><Link to='/user/register'>New User</Link></button>
            </h1>
            <h1>
                <button className="Login"><Link to='/user/login'>Login</Link></button>
            </h1>
            <footer>
                <h3>Link LinkedIn Page</h3>
            </footer>
        </div>
    )
}
