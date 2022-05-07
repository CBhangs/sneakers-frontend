import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function SneakersPage(props) { // uses props to pass it to jsx code
    // hooks below 
    const [ sneakers, setSneakers]= useState(null);
    const [ name, setName]= useState('Nike');
    const [ image, setImage]= useState('https://media.istockphoto.com/photos/great-sneaker-picture-id1079117394?s=612x612');
    const navigate = useNavigate(); // lets you navigate to another page

    const getSneakers = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}sneakers/user/${props.user._id}`,{ // makes api call
            method: "get",
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
    
        const data = await response.json()
        setSneakers(data) // sets the sneakers 
    }
    // use effect only runs when the deps have changed 
    useEffect(() => {
        if (!props.user) { // if user doesnt exist it sends you back to home page
            navigate("/");
        }
        getSneakers();
    }, [props.user]);

    const handleSubmit = async () => {
        // as user validate if correct name,email,password // if not turn input red // nice to have 
        const sneaker = { name, image, userId: props.user._id};
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}sneakers` ,{ // makes api call
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sneaker)
        }) 
    
        const data = await response.json()
        getSneakers();
    }


    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    
    const handleChangeImgUrl = (event) => {
        setImage(event.target.value)
    }
    
    return (
    <div>
        <div className="createSneakersCard">
            <h1>sneaker name</h1>
            <input value={name} placeholder="Enter Name" type='text' onChange={handleChangeName}></input>
            <h1>image url</h1>
            <input value={image} aceholder="Enter image url" type='text' onChange={handleChangeImgUrl}></input>
            <button  onClick={handleSubmit}>Submit</button>
        </div>
        <ul>
            {sneakers ? sneakers.map((sneaker) => {
                console.log(sneaker._id)
                return <li key={sneaker._id}>
                    <img src={sneaker.image}></img>
                    <Link to={`/sneakers/${sneaker._id}`}>Name:{sneaker.name}</Link>
                    <br></br>
                    <Link to={`/sneakers/${sneaker._id}/edit`}>edit/delete</Link>
                </li>
            }): null}
        </ul>
    </div>
    )
}