import { useState } from "react"
import { useNavigate } from "react-router-dom" // useNavigate is a function from the module react router dom 


export default function NewUserPage(props) {
    // hooks below 
    const [ name, setName]= useState('Cory')
    const [ email, setEmail]= useState('email@fake.com')
    const [ password, setPassword]= useState('password') 
    const navigate = useNavigate();



    const handleChangeName = (event) => { // anytime any characters are added to input it updates 
        setName(event.target.value)
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = async () => {
        // as user validate if correct name,email,password // if not turn input red // nice to have 
        const user = { name, email, password };
        
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}user`,{ // makes api call // dot.env points to local host until deployed to Heroku
            method: "POST", // set to POST since its a post route
            headers: {
                'Content-Type': 'application/json', // sending json data
            },
            body: JSON.stringify(user) // transforms user object into json data
        }) 
    
        const data = await response.json()
        props.setUser(data) // sets the user 
        navigate("/sneakers");
    }
    // jsx or html data
    return(
        <div className="NewUserP"> 
            <h1>Name</h1>
            <input value={name} placeholder="Enter Name" type='text' onChange={handleChangeName}></input>
            <h1>Email</h1>
            <input value={email} placeholder="Enter Email" type='text' onChange={handleChangeEmail}></input>
            <h1>Password</h1>
            <input value={password} placeholder="Create Password" type='text' onChange={handleChangePassword}></input>
            <button  onClick={handleSubmit}>Submit</button>
        </div>
    )
}