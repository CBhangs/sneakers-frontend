import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserEditPage(props) {
    const params = useParams();
    const [ name, setName]= useState('');
    const navigate = useNavigate();



    useEffect(() => { // read documentation soon 
        if (!props.user) {
            navigate("/");
        }
    }, [props.user])   

    const handleSubmit = async () => {
        const user = { name }
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/${props.user._id}` ,{ // makes api call
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }) 
    
        const data = await response.json()
        props.setUser(data)
        navigate("/sneakers");
    }
    const handleDelete = async () => { // deletes the user
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/${props.user._id}` ,{ // makes api call
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        }) 
    
        const data = await response.json()
        props.setUser(null)
        navigate("/");
    }
    
    
    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    
    
    return(
        <div>
            
            <h1> Name</h1>
            <input value={name} placeholder="Enter Name" type='text' onChange={handleChangeName}></input>
            <button  onClick={handleSubmit}>Submit</button>
            <button className="DeleteButton" onClick={handleDelete}>Delete User</button>
        </div>
    )
}