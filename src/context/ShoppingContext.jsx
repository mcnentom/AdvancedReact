// // context/ShoppingContext.js
// import React, { createContext, useEffect, useState } from 'react';

// export const ShoppingContext = createContext();

// export const ShoppingProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(response => response.json())
//       .then(data => setProducts(data.products))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return <ShoppingContext.Provider value={{ products }}>{children}</ShoppingContext.Provider>;
// };
