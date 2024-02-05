import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../App';
import { FaShoppingCart } from 'react-icons/fa';
import './styling.css'

function ShoppingPage() {
  const { state, cartItems, addToCart, removeFromCart } = useContext(myContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);


  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);


  const hasNextPage = indexOfLastItem < products.length;


  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className='general'>
      <div className='header'>
        <h1 style={{ paddingLeft: '1rem' }}>Our Products</h1>
        <div className="cart-container">
          <FaShoppingCart />
          <p>Item Count: {state.count}</p>
          <Link to='/cart' className='linkDiv'>View Your Cart</Link>
        </div>
      </div>
      <div className='generalFetch'>
        {currentItems.map(product => (
          <div key={product.id} className='fetched'>
            <h2 style={{fontSize:'1rem'}}>{product.title}</h2>
            <img src={product.images[2]} alt="" />
            <p> Price: ${product.price}</p>
            {/* <p>{product.description}</p> */}
            <div>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              {cartItems.some(item => item.id === product.id) ? (
                <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
              ) : null}
            </div>

            <Link to={`/item/${product.id}`} className='linkDiv'>View Details</Link>
          </div>
        ))}
      </div>

      <div className='navigation'>
        {currentPage > 1 && (
          <button onClick={prevPage}>Previous Page</button>
        )}
        {hasNextPage && (
          <button onClick={nextPage}>Next Page</button>
        )}
      </div>
    </div>
  );
}

export default ShoppingPage;
