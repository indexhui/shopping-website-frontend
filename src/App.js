import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import { ChakraProvider, Text } from '@chakra-ui/react';
import CartProvider from './store/CartProvider';
import CurrentUserProvider from './store/CurrentUserProvider';
import theme from './theme/theme.js';
import Header from './sections/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';

import ProductList from './components/ProductList.js';
import SpecialItem from './sections/SpecialItem';
import CartModal from './components/Cart/CartModal';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch(
        'https://infinite-beach-24731.herokuapp.com/api/commodities'
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const responseData = await response.json();
      const result = responseData.result;
      console.log(result);
      const loadedTours = [];

      result.forEach(data =>
        loadedTours.push({
          id: data.id,
          name: data.name,
          image: data.image,
          introduction: data.introduction,
          price: data.price,
        })
      );

      setProduct(loadedTours);
      setIsLoading(false);
    };

    fetchTours().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <Routes>
          {/* <Route path="/" exact element={<Home products={products} />} /> */}
          <Route path="/" exact element={<Home products={products} />} />
          <Route path="/home" exact element={<Home products={products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Login sign="in" />} />
          <Route path="/signup" element={<Login sign="up" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
        {/* <Outlet /> */}
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
