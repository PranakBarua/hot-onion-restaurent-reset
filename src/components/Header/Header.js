import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import header from '../../images/banner.png'
import './Header.css'
import fakeData from '../../fakeData'
import { Link } from 'react-router-dom';
const Header = () => {
    const {category}=fakeData
    return (
        <div className="header">
            <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Navbar>
            </div>
            <div style={{ backgroundImage: `url(${header})` }} className="header-bg">
                <h1>Best food waiting for your belly</h1>
                <input placeholder="search food items" type="text"/>
                <button className="search-button">Search</button>
            </div>
            <div>
                <nav className="navLink">
                    <Link to="/breakfast">Breakfast</Link>
                    <Link to="/lunch">Lunch</Link>
                    <Link to="/dinner">Dinner</Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;