import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import CurrentUserContext from './store/CurrentUserContext';

import theme from './theme/theme.js';
import Header from './sections/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import SignEventModal from './components/SignEventModal';

// import ProductList from './components/ProductList.js';
// import SpecialItem from './sections/SpecialItem';
// import CartModal from './components/Cart/CartModal';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [token, setToken] = useState();
  const currentUserCtx = useContext(CurrentUserContext);

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

  // import SignUpDoneModal from '../components/SignUpDoneModal';

  return (
    <ChakraProvider theme={theme}>
      <SignEventModal />

      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      {/* <SignUpDoneModal /> */}
      <Routes>
        {/* <Route path="/" exact element={<Home products={products} />} /> */}
        {!currentUserCtx.user.isAdmin && (
          <>
            <Route path="/" exact element={<Home products={products} />} />
            <Route path="/signin" element={<Login sign="in" />} />
            <Route path="/home" exact element={<Home products={products} />} />
            <Route path="/signup" element={<Login sign="up" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<Product />} />
          </>
        )}
        {currentUserCtx.user.isAdmin && (
          <>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
          </>
        )}
      </Routes>
    </ChakraProvider>
  );
}

// const App = () => {
//   return (
//     <ChakraProvider theme={theme}>
//       <ModalProvider>
//         <CurrentUserProvider>
//           <AppContent />
//         </CurrentUserProvider>
//       </ModalProvider>
//     </ChakraProvider>
//   );
// };

export default App;
