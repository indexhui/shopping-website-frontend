import { useContext } from 'react';
import { Flex, VStack, Text } from '@chakra-ui/react';
import CartContext from '../store/CartContext';

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const cartList = cartCtx.items;
  console.log(cartCtx);
  if (cartList.length === 0) {
    return <Text>你的購物車還是空的</Text>;
  }

  return (
    <VStack spacing="10px">
      {cartList.map(item => (
        <Flex w="1080px" border="1px solid red">
          {item.name} {item.amount}
        </Flex>
      ))}
    </VStack>
  );
};

export default Cart;
