import { Card } from '@mui/material';
import react from 'react';
import "./Card.css";

const Cards = () =>{
    return(
        <> 
        <div className='div1'>
        <Card className='card' style={{backgroundColor:"#e3f2fd"}}>          
            <div className='box'>
            <h1>Total Leads</h1>
            </div>
        </Card>
        <Card className='card' style={{backgroundColor:"#f5f5f5"}}>          
            <div className='box'>
            <h1>Potential Leads</h1>
            </div>
        </Card>
        <Card className='card' style={{backgroundColor:"#c8e6c9"}}>          
            <div className='box'>
            <h1>Bookings</h1>
            </div>
        </Card>
        </div>
        <div className='div2'>
        <Card className='card' style={{backgroundColor:"#fbe9e7"}}>          
            <div className='box'>
            <h1>Installation</h1>
            </div>
        </Card>
        <Card className='card' style={{backgroundColor:"#ffccbc"}}>          
            <div className='box'>
            <h1>AMC</h1>
            </div>
        </Card>
        <Card className='card' style={{backgroundColor:"#e1bee7"}}>          
            <div className='box'>
            <h1>Card 1</h1>
            </div>
        </Card>
        </div>
        </>
    );
};

export default Cards;