import { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

const Product = () => {
  const [product, setProduct] = useState([]);
  let { productId } = useParams();
  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch(
        `https://infinite-beach-24731.herokuapp.com/api/commodities/${productId}`
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const responseData = await response.json();
      const result = responseData.result;
      console.log(result);
      // const loadedProduct = [];

      // result.forEach(data =>
      //   loadedTours.push({
      //     id: data.id,
      //     name: data.name,
      //     image: data.image,
      //     introduction: data.introduction,
      //     price: data.price,
      //   })
      // );

      // setProduct(loadedTours);
      // setIsLoading(false);

      setProduct(result);
    };

    fetchTours().catch(error => {
      // setIsLoading(false);
      // setHttpError(error.message);
    });
  }, [productId]);
  return (
    <Flex w="100%" justify="center">
      產品頁面
      {product.name}
      {product.id}
    </Flex>
  );
};

export default Product;
