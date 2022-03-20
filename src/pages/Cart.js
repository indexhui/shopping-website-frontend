import { useContext } from 'react';
import {
  Flex,
  VStack,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Image,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from '@chakra-ui/react';
import CartContext from '../store/CartContext';
import useSpace from '../hooks/useSpace';

const TableList = props => {
  const { cartList } = props;
  console.log('cartList', cartList);
  return (
    <Table variant="simple" borderColor="gray.600">
      <Thead borderColor="gray.600">
        <Tr>
          <Th></Th>
          <Th w="200px">商品</Th>
          <Th>価格</Th>
          <Th isNumeric>数量</Th>
          <Th isNumeric>合計</Th>
        </Tr>
      </Thead>
      <Tbody borderColor="gray.600">
        {cartList.map(item => (
          <Tr key={item.name}>
            <Td
              borderColor="gray.300"
              w="100px"
              verticalAlign="center"
              textAlgn="center"
            >
              <Flex w="120px" h="100%" align="center">
                <Image src={item.image} w="100px" h="60px" />
              </Flex>
            </Td>
            <Td borderColor="gray.600">
              <Text minW="400px">{item.name}</Text>
            </Td>
            <Td>${item.price}</Td>
            <Td isNumeric>
              <Flex w="120px">
                <NumberInput
                  value={item.amount}
                  min={1}
                  max={20}
                  color="blue.400"
                >
                  <NumberInputField color="black" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </Td>
            <Th isNumeric>$ {item.amount * item.price}</Th>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th isNumeric w="100%">
            Total NT $
            {cartList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)}
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const cartList = cartCtx.items;
  const { space } = useSpace(cartCtx);
  if (cartList.length === 0) {
    return (
      <Flex w="100%" justify="center">
        <Text>你的購物車還是空的</Text>
      </Flex>
    );
  }

  return (
    <Flex
      w="100%s"
      justify="center"
      bg="brown.400"
      minH="100vh"
      align="flex-start"
    >
      <Flex
        w={space}
        justify="center"
        align="center"
        direction="column"
        py="80px"
      >
        <Heading w="100%" color="blue.500" pb="20px" pt="20px">
          Cart
        </Heading>
        <Flex w="100%" justify="center">
          <TableList cartList={cartList} />
        </Flex>
        {/* <VStack w="100%" spacing="10px">
        </VStack> */}
      </Flex>
    </Flex>
  );
};

export default Cart;
