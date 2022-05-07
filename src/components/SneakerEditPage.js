import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SneakerEditPage(props) {
    const params = useParams();
    const [ sneaker, setSneaker]= useState(null)
    const [ name, setName]= useState('');
    const [ image, setImage]= useState('');
    const navigate = useNavigate();


    const getSneaker = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}sneaker/${params.sneakerId}`,{ // makes api call
            method: "get",
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
    
        const data = await response.json()
        setName(data.name) // brings info from database to current sneaker 
        setImage(data.image)
        setSneaker(data) // sets the sneaker 
    }

    useEffect(() => { // read documentation soon 
        if (!props.user) {
            navigate("/");
        }
        getSneaker()
    }, [params.sneakerId])   

    const handleSubmit = async () => {
        // as user validate if correct name,email,password // if not turn input red // nice to have 
        const sneaker = { name, image };
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}sneaker/${params.sneakerId}` ,{ // makes api call
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sneaker)
        }) 
    
        const data = await response.json()
        navigate("/sneakers");
    }
    const handleDelete = async () => { // deletes the sneaker 
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}sneaker/${params.sneakerId}` ,{ // makes api call
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sneaker)
        }) 
    
        const data = await response.json()
        navigate("/sneakers");
    }
    
    
    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    
    const handleChangeImgUrl = (event) => {
        setImage(event.target.value)
    }
    
    return(
        <div className="SneakerEditPage">
            <h1>Edit Sneaker name</h1>
            <input value={name} placeholder="Enter Name" type='text' onChange={handleChangeName}></input>
            <h1>Edit image url</h1>
            <input value={image} aceholder="Enter image url" type='text' onChange={handleChangeImgUrl}></input>
            <br></br>
            <br></br>
            <button  onClick={handleSubmit}>Submit</button>
            <br></br>
            <br></br>
            <button className="SneakerDeleteButton" onClick={handleDelete}>Delete</button>
        </div>
    )
}