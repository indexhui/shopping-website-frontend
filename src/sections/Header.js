import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  HStack,
  Box,
  VStack,
  Icon,
  Text,
  Divider,
  Avatar,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

import ModalContext from '../store/ModalContext';
import CartContext from '../store/CartContext';
import CurrentUserContext from '../store/CurrentUserContext';

import useSpace from '../hooks/useSpace';

import PopoverMenu from '../components/PopoverMenu';

import SignModal from '../components/SignModal';

const menu = [
  {
    name: 'home',
    link: '/home',
  },
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

const adminMenu = [
  {
    name: 'dashboard',
    link: '/admin/dashboard',
  },
  {
    name: 'users list',
    link: '/admin/users',
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

const SignOutButton = () => {
  const navigate = useNavigate();
  const currentUserCtx = useContext(CurrentUserContext);
  const handleSignOut = () => {
    navigate(`/home`, { replace: true });
    currentUserCtx.signOut();
  };
  return (
    <Flex
      w="100%"
      cursor="pointer"
      onClick={handleSignOut}
      p="10px"
      color="blue.700"
      _hover={{ bg: 'gray.100' }}
    >
      Sign Out
    </Flex>
  );
};

const UserOption = () => {
  return (
    <VStack width="100%" align="stretch">
      <Link to="/home">
        <Text textAlign="left" _hover={{ bg: 'gray.100' }} w="100%" p="10px">
          Profile
        </Text>
      </Link>
      <Flex justify="center">
        <Divider w="90%" />
      </Flex>
      <SignOutButton />
    </VStack>
  );
};

const Header = props => {
  const cartCtx = useContext(CartContext);
  const currentUserCtx = useContext(CurrentUserContext);
  const modalCtx = useContext(ModalContext);
  const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);
  const handleSignIn = () => {
    modalCtx.onSignModalOpen(true);
    // console.log(modalCtx.isSignIn);
  };

  const handleSignUp = () => {
    modalCtx.onSignModalOpen(false);
    // console.log(modalCtx.isSignIn);
  };

  // const addItemToCartHandler = amount => {
  //   cartCtx.addItem({
  //     id: product.id,
  //     name: product.name,
  //     image: product.image,
  //     amount: +amount,
  //     price: product?.price,
  //   });
  //   console.log(product.name, product.id, amount, product.price);
  // };
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
        <Link to="/home">
          <Heading fontSize="20px" color="blue.500">
            Shopping Concept
          </Heading>
        </Link>
        {!currentUserCtx.user.isAdmin && (
          <HStack spacing="20px">
            {menu.map(item => (
              <Link key={item.name} to={item.link}>
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
        )}

        {currentUserCtx.user.isAdmin && (
          <HStack spacing="20px">
            {adminMenu.map(item => (
              <Link key={item.name} to={item.link}>
                {item.name}
              </Link>
            ))}
          </HStack>
        )}

        {currentUserCtx.user?.name && (
          <Flex>
            {/* {currentUserCtx.user?.name}
            <Avatar src={currentUserCtx.user?.image} /> */}
            <PopoverMenu option={<UserOption />}>
              <Avatar cursor="pointer" src={currentUserCtx.user?.image} />
            </PopoverMenu>
          </Flex>
        )}
        {!currentUserCtx.user?.id && (
          <Flex px="20px">
            {/* <SignModal sign="signIn" />
            <SignModal sign="Signup" /> */}
            <Text onClick={handleSignIn}>Sign In </Text>
            <Text> / </Text>
            <Text onClick={handleSignUp}> Sign Up</Text>
          </Flex>
        )}

        <Hamburger />
      </Flex>
    </Flex>
  );
};

export default Header;
