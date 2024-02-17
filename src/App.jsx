
import React, { createContext, useReducer, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingPage from './components/ShoppingPage';
import ItemDetailsPage from './components/ItemDetailsPage';
import CartPage from './components/CartPage';
import Error from './Error'
import './App.css';

export const myContext = createContext();

const initialState = {
  count: localStorage.getItem('itemCount') ? parseInt(localStorage.getItem('itemCount')) : 0,
};


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'Increment':
      localStorage.setItem('itemCount', state.count + 1);
      return { ...state, count: state.count + 1 };
    case 'Decrement':
      localStorage.setItem('itemCount', state.count > 0 ? state.count - 1 : 0);
      return { ...state, count: state.count > 0 ? state.count - 1 : 0 };
    default:
      throw new Error('Unknown action');
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('isDarkTheme') === 'true'
  );

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
    localStorage.setItem('isDarkTheme', isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: product.id, name: product.title, quantity: 1, price: product.price, image: product.images[2] }]);
    }
    dispatch({ type: 'Increment' });
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => {item.id !== productId });
    setCartItems(updatedCartItems);
    dispatch({ type: 'Decrement' });
  };
  const handleDarkMode = () => {
    setIsDarkTheme((prevState) => !prevState);
  }

  return (
    <div className={isDarkTheme ? 'darkMode' : 'lightMode'}>
      <button onClick={handleDarkMode} className='btn'>
        {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
      </button>

      <Router>
        <myContext.Provider value={{ state, dispatch, cartItems, addToCart, removeFromCart }}>
          <Routes>
            <Route path="/" element={<ShoppingPage />} />
            <Route path="/item/:id" element={<ItemDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path = "*" element = {<Error/>} />
          </Routes>
        </myContext.Provider>
      </Router>
    </div>

  );
}

export default App;
