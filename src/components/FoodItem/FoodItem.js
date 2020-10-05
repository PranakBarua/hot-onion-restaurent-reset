import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './FoodItem.css'
const FoodItem = (props) => {
    const {name,img,price,description,id}=props.food
    console.log(props.food.category)
    return (
        <Link to={"/singleFood/"+id}>
        <div className="foodItem">

                <img src={img} alt=""/>
                <h6>{name}</h6>
                <p><small>{description}</small></p>
                <h5>${price}</h5>
            
        </div>
        </Link>
    );
};

export default FoodItem;