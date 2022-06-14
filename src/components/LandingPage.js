import { Link } from "react-router-dom";


export default function LandingPage() {
    return (
        <div className="LandingPage">
            <header className="LandingPageHeader">
                <h1>Vault</h1>
                <h2>Keep track of your collection </h2>
            </header>
            <h1>
                <button className="NewUser"><Link to='/user/register'>New User</Link></button>
            </h1>
            <h1>
                <button className="Login"><Link to='/user/login'>Login</Link></button>
            </h1>
        </div>
    )
}
