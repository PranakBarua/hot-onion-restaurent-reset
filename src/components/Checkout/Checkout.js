import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData'
import './Checkout.css'
import { Link } from 'react-router-dom';
const Checkout = () => {
    const [cart,setCart]=useState([])
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartFood=productKeys.map(id=>{
            const newProduct=fakeData.find(fd=>fd.id===id);
            newProduct.quantity=savedCart[id];
            return newProduct;
        })
        setCart(cartFood);
    },[])
    return (
        <div className="button-center">
            {
                cart.length>0?<Link to="/shipment"><button className="search-button">Checkout Your Food</button></Link>:
                <button disabled>Checkout Your Food</button>
            }
        </div>
    );
};

export default Checkout;