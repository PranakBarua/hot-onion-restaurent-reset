import React from 'react';
import fakeData from '../../fakeData'
import FoodItem from '../FoodItem/FoodItem';
const LunchItem = () => {
    const currentFood=fakeData.filter(fd=>fd.category==='lunch')
    return (
        <div>
            {
                currentFood.map(fd=><FoodItem key={fd.id} food={fd}></FoodItem>)
            }
        </div>
    );
};

export default LunchItem;