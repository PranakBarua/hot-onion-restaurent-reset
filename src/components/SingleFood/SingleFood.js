import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './SingleFood.css'
import { cartContext } from '../../App';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'
const SingleFood = () => {
    //const [cart,setCart]=useContext(cartContext)
    const [cart,setCart]=useState([])
    const {foodId}=useParams()
    const singleFood=fakeData.find(fd=>fd.id===foodId)
    const category=singleFood.category
    const {name,img,price,id}=singleFood
    const sameCategoryFood=fakeData.filter(fd=>fd.category===category)
    const othersFood=sameCategoryFood.filter(fd=>fd.id!==id)
    //console.log(othersFood)

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
    
    const handleCart=(singleFood,count)=>{
            const sameProduct=cart.find(fd=>fd.id===singleFood.id);
            let newCart=[];
            let countNew=1;
            if(sameProduct){
                count=sameProduct.quantity+count;
                if(count<0){
                    alert("item number can't be negative");
                }
                else{
                    sameProduct.quantity=count;
                    const others=cart.filter(fd=>fd.id!==singleFood.id);
                    newCart=[...others,sameProduct];
                 } 
            }
            else{
                //count=sameProduct.length;
                singleFood.quantity=countNew;
                newCart=[...cart,singleFood];
            }
            if(count>=0){
                setCart(newCart);
                addToDatabaseCart(singleFood.id,count)
            }
        }
    console.log(cart.length)
    return (
        <div className="single-food-container">
            <div className="single-food-details">
                <h2>{name}</h2>
                <br/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad distinctio hic reprehenderit aliquam ipsum dolorum. Qui perferendis eaque numquam deleniti.</p>
                <div className="flex-system">
                    <div className="price-container"><h4>${price}</h4></div>
                    <div>
                        <button onClick={()=>handleCart(singleFood,-1)} className="border-disable">-</button>
                        <input className="item-input border-disable" type="text" name="" id=""/>
                        <button onClick={()=>handleCart(singleFood,1)} className="border-disable">+</button>
                    </div>
                </div>
                <button className="search-button"><ShoppingCartIcon></ShoppingCartIcon> Add</button>
                <br/>
                <br/>
                <div>
                    <img className="extra-img" src={othersFood[0].img} alt=""/>
                    <img className="extra-img" src={othersFood[1].img} alt=""/>
                </div>
            </div>
            <div className="single-food-img">
                <img src={img} alt=""/>
            </div>
        </div>
    );
};

export default SingleFood;



// <button id="removeCaseButton" class="btn btn-default"><i class="fas fa-minus"></i></button>
// <input id="currentCase" type="text" class="form-control text-center" value="0"></input>
// <button id="addCaseButton" class="btn btn-default"><i class="fas fa-plus"></i></button>