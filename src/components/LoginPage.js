import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function LoginPage(props) {
    const [ email, setEmail]= useState('email@email.com')
    const [ password, setPassword]= useState('')
    const navigate = useNavigate();

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)

    }
    const handleSubmit = async () => {
        const user = { email, password };
        
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/login`,{ // makes api call
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user) // converts javascript object to json
        }) 
        const data = await response.json()
        props.setUser(data) // sets the user 
        navigate("/sneakers");
    }

    return (
        <div className="LoginPage">
            <header>
                <h1>Returning User</h1>
            </header>
            <div>
                <input value={email} placeholder="Enter Email" type='text' onChange={handleChangeEmail}></input>
                <input value={password} placeholder="Enter Password" type='text' onChange={handleChangePassword}></input>
                <br></br>
                <button className="LoginUser" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
    
}