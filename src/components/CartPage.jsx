
import React, { useContext } from 'react';
import { myContext } from '../App';
import './styling.css'
import {  Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart } = useContext(myContext);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice;
  };

  return (
    <div className='cart'>
      <div className='header'>
      <h1>Cart Page</h1>
      <p className='total'>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
      </div>
      
      {cartItems.length > 0 ? (
        <div className='fetchedCart'>
          {cartItems.map(item => (
            <div key={item.id} className='myCart'>
              <h2>{item.name}</h2>
              <img src={item.image} alt={item.name} />
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
      <Link to="/"className='linkDiv' id='link'>Back to Shopping</Link>
    </div>
  );
}

export default CartPage;
