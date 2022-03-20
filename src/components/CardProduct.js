import { useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../store/CartContext';
import { Flex, Box, Button, Text, Image, HStack } from '@chakra-ui/react';

const CardProduct = props => {
  const { product } = props;
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = amount => {
    cartCtx.addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      amount: +amount,
      price: product?.price,
    });
    console.log(product.name, product.id, amount, product.price);
  };

  const onClickAddHandler = e => {
    e.stopPropagation();
    addItemToCartHandler(1);
  };

  const onClickHandler = e => {
    navigate(`/product/${product.id}`, { replace: true });
  };

  return (
    // <Link to={`product/${product.id}`}>
    // <Link>
    <Flex
      onClick={onClickHandler}
      w="100%"
      h="100%"
      direction="column"
      bg="#F9F9F9"
      p="16px"
      shadow="xs"
      transition="all .4s ease-in-out"
      _hover={{
        boxShadow: '0 0 2px 2px #efdfde',
        transform: 'translateY(-6px)',
        cursor: 'pointer',
      }}
    >
      <Box w="100%" bg="gray.300" mb="10px">
        <Image w="100%" src={product.image} />
      </Box>
      <Text fontWeight="500" fontSize="20px">
        {product?.name}
      </Text>
      <Text textAlign="right" opacity=".8">
        {' '}
        $ {product?.price}
      </Text>
      <HStack spacing="10px" mt="10px" flex="1" align="flex-end">
        <Button
          w="40%"
          opacity=".8"
          bg="#606c7a"
          fontWeight="300"
          onClick={onClickAddHandler}
        >
          Add
        </Button>
        <Button w="100%" fontWeight="300">
          Purchase
        </Button>
      </HStack>
    </Flex>
    // </Link>
  );
};
export default CardProduct;
