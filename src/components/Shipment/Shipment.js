import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData'
import './Shipment.css'
import { Link } from 'react-router-dom';
const Shipment = () => {
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

    let total=0;
    let quantity=0;
    for(let i=0;i<cart.length;i++){
        const product=cart[i];
        total=total+product.price*product.quantity;
        quantity+=product.quantity;
    }
    let tax=total/10;
    let deliveryFee=2;

    console.log(cart)
    
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example")); 
    return (
        <div className="shipment-full">
            <div className="shipment-left-half">
            <h4 className="delivery-h4-tag">Edit Delivery Details</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input className="margin-bottom login-input" name="address" ref={register({ required: true })} placeholder="Deliver to Door"/>
            <br/>
            {errors.address && <span className="error">Address is required</span>}
            <br/>
            <input className="margin-bottom login-input" name="road" ref={register({ required: true })} placeholder="107 Rd No 8" />
            <br/>
            {errors.road && <span className="error">Road no is required</span>}
            <br/>
            <input className="margin-bottom login-input" name="flatSuiteFloor" ref={register({ required: true })} placeholder="Flat,Suite,Floor" />
            <br/>
            {errors.flatSuiteFloor && <span className="error">Flat,Suite,Floor is required</span>}
            <br/>
            <input className="margin-bottom login-input" name="businessName" ref={register({ required: true })}  placeholder="Business Name"/>
            <br/>
            {errors.businessName && <span className="error">Business Name is required</span>}
            <br/>
            <input className="margin-bottom login-input" name="deliveryInstructor" ref={register({ required: true })}  placeholder="Add Delivery Instructor"/>
            <br/>
            {errors.deliveryInstructor && <span className="error">Delivery Instructor Name is required</span>}
            <br/>
            <input  className="margin-bottom login-input search-button" type="submit" value="Save And Continue" />
            </form>
        </div>
            <div className="shipment-right-half">
                <h5>From Gulshan plaza</h5>
                <p><small>Arriving in 20-30 min</small></p>
                <p>107 Rd No 8</p>
               {
                   cart.map(cart=>(
                    
                       <div className="full-part d-flex justify-content-between">
                           <div className="img-part">
                               <img className="small-img" src={cart.img} alt=""/>
                           </div>
                           <div className="details-part">
                                <p>Delicious Food</p>
                                <p>${cart.price}</p>
                           </div>
                           <div className="quantity-part">
                                <p>{cart.quantity}</p>
                           </div>
                       </div>
                   ))
               }
               <div className="calculation-part">
               <div className="d-flex justify-content-between">
                   <div>
                       <p>Subtotal({quantity}items)</p>

                   </div>
                   <div>
                       ${total.toFixed(2)}
                   </div>
               </div>
               <div className="d-flex justify-content-between">
                   <div>
                       <p>Tax</p>

                   </div>
                   <div>
                       ${tax.toFixed(2)}
                   </div>
               </div>
               <div className="d-flex justify-content-between">
                   <div>
                       <p>Delivery Fee</p>

                   </div>
                   <div>
                       ${deliveryFee.toFixed(2)}
                   </div>
               </div>
               <div className="d-flex justify-content-between">
                   <div>
                       <p>Total</p>

                   </div>
                   <div>
                       ${(total+deliveryFee+tax).toFixed(2)}
                   </div>
               </div>
            </div>
               <Link to="/orderComplete"><button className="search-button">Place Order</button></Link>
            </div>
        </div>
    );
};

export default Shipment;