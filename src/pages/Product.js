import { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Flex, Image, Text, Button, VStack } from '@chakra-ui/react';
import useSpace from '../hooks/useSpace';

const Product = () => {
  const [product, setProduct] = useState([]);
  let { productId } = useParams();
  const { space } = useSpace();
  console.log(productId);
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
    <Flex w="100%" justify="center" bg="brown.400" minH="100vh" pt="80px">
      <Flex w={space}>
        <Image
          w="50%"
          src={product.image}
          h="400px"
          objectFit="cover"
          position="sticky"
          top="120px"
        />
        <Flex w="50%" px="20px" direction="column">
          <Flex>
            <Text>2.5折コンパクト財布</Text>
            <Text>人気商品</Text>
          </Flex>
          <Text color="blue.700" fontSize="32px" fontWeight="600">
            {product.name}
          </Text>
          <VStack spacing="2px" my="20px" align="flex-start" color="blue.400">
            <Text>¥11,000 SIZE </Text>
            <Text>W:97mm×H:70mm×T25mm</Text>
          </VStack>
          <Text>{product.saleAmount}</Text>
          <Button>加入購物車</Button>
          <Text fontSize="13px" color="blue.300" py="20px">
            ¥ 5,000以上のご注文で国内送料無料サービス。
            <br />
            ただいま約4営業日以内に出荷予定。
            <br />
            ※日付指定可能日はカート画面よりご確認お願いします。
            <br />
            傷・シミ・色ブレ・凹み等による返品交換は出来ません。
            <br />
            この商品はギフトラッピングが可能です。
          </Text>
          <Text>{product.introduction}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
