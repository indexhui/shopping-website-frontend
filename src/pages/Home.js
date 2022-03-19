import { Flex } from '@chakra-ui/react';
import ProductList from '../components/ProductList.js';
import SpecialItem from '../sections/SpecialItem';

const Cart = props => {
  return (
    <Flex direction="column">
      <SpecialItem />
      <ProductList products={props.products} />
    </Flex>
  );
};

export default Cart;
