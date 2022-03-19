import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  HStack,
  Box,
  VStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import CartContext from '../store/CartContext';

import useSpace from '../hooks/useSpace';

const menu = [
  {
    name: 'about',
    link: '/about',
  },
  {
    name: 'products',
    link: '/products',
  },
  {
    name: 'stories',
    link: '/stories',
  },
  {
    name: 'news',
    link: '/news',
  },
];

const Hamburger = () => {
  return (
    <VStack spacing="7px">
      <Box w="40px" h="1px" bg="black"></Box>
      <Box w="40px" h="1px" bg="black"></Box>
      <Box w="40px" h="1px" bg="black"></Box>
    </VStack>
  );
};

const Header = props => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);
  const { space } = useSpace();
  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="20"
      w="100%"
      justify="center"
      align="center"
      py="20px"
      px="20px"
      bg="#f1f2ed"
    >
      <Flex w={space} justify="space-between" align="center">
        <Link to="/">
          <Heading fontSize="20px" color="blue.500">
            Shopping Concept
          </Heading>
        </Link>
        <HStack spacing="20px">
          {menu.map(item => (
            <Link key={item.name} to="/">
              {item.name}
            </Link>
          ))}
          <Link to="/cart">
            <HStack
              // onClick={props.onShowCart}
              // onHover={props.onShowCart}
              w="50px"
              _hover={{ color: 'gold' }}
              cursor="pointer"
            >
              <Icon as={FiShoppingCart} />
              <Text>{numberOfCartItems}</Text>
            </HStack>
          </Link>
        </HStack>
        <Hamburger />
      </Flex>
    </Flex>
  );
};

export default Header;
