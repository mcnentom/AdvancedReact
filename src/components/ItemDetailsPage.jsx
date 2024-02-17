
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { myContext } from '../App';
import { FaShoppingCart } from 'react-icons/fa';

function ItemDetailsPage() {
  const { id } = useParams();
  const { addToCart, state } = useContext(myContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='item'>
      <h1>{product.title}</h1>
      <div className="cart-container">
          <FaShoppingCart />
          <p>Item Count: {state.count}</p>
          <Link to='/cart' className='linkDiv'>View Your Cart</Link>
        </div>
      <img src={product.images[2]} alt="" />
      <div className='pTags'>
        <p><strong style={{ color: '#000' }}>Price: </strong>${product.price}</p>
        <p><strong style={{ color: '#000' }}>Category: </strong>{product.category}</p>
        <p><strong style={{ color: '#000' }}>Remaining Stock: </strong> {`${product.stock}`}</p>
        <p> <strong style={{ color: '#000' }}>Description: </strong>{product.description}</p>
      </div>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <Link to="/"className='linkDiv' id='link'>Back to Shopping</Link>
      
    </div>
  );
}

export default ItemDetailsPage;
