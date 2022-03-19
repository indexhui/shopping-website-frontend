import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

import React, { useState, useEffect } from 'react';
import { ChakraProvider, Text } from '@chakra-ui/react';

import theme from './theme/theme.js';
import Header from './sections/Header';
import ProductList from './components/ProductList.js';
import SpecialItem from './sections/SpecialItem';

function App() {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

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

    // try {
    //   fetchTours().catch();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // }

    fetchTours().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <SpecialItem />
      <ProductList products={products} />
    </ChakraProvider>
  );
}

export default App;
