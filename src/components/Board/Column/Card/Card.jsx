import React from 'react';
import {useNavigate} from "react-router-dom";
import './Card.css'

export const Card = (props) => {
    const navigate = useNavigate();

    return (
        <div className='card_column' onClick={() => navigate(`/tasks/${props.id}`)}>
            {props.name}
        </div>
    )
}