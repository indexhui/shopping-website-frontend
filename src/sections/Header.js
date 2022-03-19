import {
  Flex,
  Heading,
  HStack,
  Link,
  Box,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

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

const Header = () => {
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
        <Heading fontSize="20px" color="blue.500">
          Shopping Concept
        </Heading>
        <HStack spacing="20px">
          {menu.map(item => (
            <Link key={item.name}>{item.name}</Link>
          ))}
          <Icon as={FiShoppingCart} />
        </HStack>
        <Hamburger />
      </Flex>
    </Flex>
  );
};

export default Header;
