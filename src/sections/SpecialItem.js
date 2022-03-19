import { Flex, Text } from '@chakra-ui/react';
import mo from '../assets/images/mo.png';

const SpecialItem = () => {
  return (
    <Flex w="100%" h="500px">
      <Flex
        w="50%"
        bg="#D2C8C6"
        align="center"
        justify="center"
        direction="column"
        fontSize="40px"
        fontWeight="500"
        color="white"
      >
        <Flex textAlign="left" direction="column">
          <Text>ONLINE STORE</Text>
          <Text>
            CLICK here <br />
            to Buy
          </Text>
        </Flex>
      </Flex>
      <Flex w="50%" bg="#AAB7AE" justify="center">
        <img src={mo} alt="mo" />
      </Flex>
    </Flex>
  );
};
export default SpecialItem;
