import React from 'react';
import './OrderComplete.css'
import map from '../../images/Image/architecture-building-city-2047397.png'
const OrderComplete = () => {
    return (
        <div className="orderComplete-full-part">
            <div className="location-part">
                <img src={map} alt=""/>
            </div>
            <div className="orderDetails-part">

            </div>
        </div>
    );
};

export default OrderComplete;