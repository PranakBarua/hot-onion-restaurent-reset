import React from 'react';
import fakeData from '../../fakeData'
import FoodItem from '../FoodItem/FoodItem';
const BreakfastItem = () => {
    const currentFood=fakeData.filter(fd=>fd.category==='breakfast')
    return (
        <div>
            {
                currentFood.map(fd=><FoodItem key={fd.id} food={fd}></FoodItem>)
            }
        </div>
    );
};

export default BreakfastItem;