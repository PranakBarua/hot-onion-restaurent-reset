import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData'
import FoodItem from '../FoodItem/FoodItem';
const Main = () => {
    const first18=fakeData.slice(0,18)
    console.log(first18)
    const {category}=useParams().toString()
    //let category
    let currentFood;
    if(category){
        currentFood=first18.filter(fd=>fd.category===category)
    }
    else{
        currentFood=fakeData.filter(fd=>fd.category==='lunch')
    }
    return (
        <div>
            {/* {
                currentFood.map(fd=><FoodItem key={fd.id} food={fd}></FoodItem>)
            } */}
            {
                fakeData.map(fd=><FoodItem food={fd}></FoodItem>)
            }
        </div>
    );
};

export default Main;