import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function SneakersPage(props) { // uses props to pass it to jsx code
    // hooks below 
    const [ sneakers, setSneakers]= useState(null);
    const [ name, setName]= useState('');
    const [ image, setImage]= useState('');
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
    <div className="SneakersBody">
        <div className="createSneakersCard">
            <h1>Sneaker name</h1>
            <input value={name} placeholder="Enter Name" type='text' onChange={handleChangeName}></input>
            <h1>Image url</h1>
            <input value={image} placeholder="Enter image url" type='text' onChange={handleChangeImgUrl}></input>
            <button className="sneakerSubmit" onClick={handleSubmit}>Submit</button>
        </div>
        <ul className="cardContainer">
            {sneakers ? sneakers.map((sneaker) => {
                console.log(sneaker._id)
                return <li className="card" key={sneaker._id}>
                    <img width="350px" src={sneaker.image}></img>
                    <div className="cardContent">
                        <Link to={`/sneakers/${sneaker._id}`}>Name:{sneaker.name}</Link>
                        <Link to={`/sneakers/${sneaker._id}/edit`}>Edit/Delete</Link>
                    </div>
                </li>
            }): null}
        </ul>
    </div>
    )
}