import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SneakerPage(props) {
    const params = useParams();
    const [ sneaker, setSneaker]= useState(null)
    const navigate = useNavigate();


    const getSneaker = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}sneaker/${params.sneakerId}`,{ // makes api call
            method: "get",
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
    
        const data = await response.json()
        setSneaker(data) // sets the sneaker 
    }

    useEffect(() => { // read documentation soon 
        if (!props.user) {
            navigate("/");
        }
        getSneaker()
    }, [params.sneakerId])    
    
    console.log(sneaker)
    return(
        <div>
            <img src={sneaker.image}>
            </img><p key={sneaker.name}></p>
        </div>
    )
}