import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
  Flex,
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
  Text,
} from '@chakra-ui/react';

import { InfoOutlineIcon, CloseIcon } from '@chakra-ui/icons';

import CurrentUserContext from '../store/CurrentUserContext';

const baseURl = 'https://infinite-beach-24731.herokuapp.com/api';

// let details = {
//   email: 'administrator@example.com',
//   password: '123456789',
// };

// const formBody = `email=administrator@example.com&password=123456789`;

const login = async formBody => {
  try {
    const res = await fetch(`${baseURl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    });
    console.log(res);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log('error', error);
    console.log('error message', error.message);
  }
};

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const CurrentUserCtx = useContext(CurrentUserContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  function closeToast() {
    toast.closeAll();
  }

  function addToast() {
    toast({
      position: 'top',
      description: 'add successfully',
      status: 'success',
      duration: 750,
      isClosable: true,
      background: 'red',
      render: () => (
        <Flex
          color="white"
          p={3}
          bg="red.500"
          rounded="md"
          opacity=".95"
          align="flex-start"
          position="relative"
        >
          <Flex
            bg="white"
            color="red.500"
            rounded="full"
            p="0px"
            mr="10px"
            mt="2px"
          >
            <InfoOutlineIcon w="15px" h="15px" />
          </Flex>
          <VStack align="flex-start">
            <Text fontWeight="900" fontSize="15px">
              No user
            </Text>
            <Text fontSize="10px">
              We couldn’t find an account matching the username and password you
              entered. Please check your username and password and try again.
            </Text>
          </VStack>
          <Flex
            p="8px"
            cursor="pointer"
            position="absolute"
            rounded="full"
            top="15px"
            right="15px"
            _hover={{ bg: 'rgba(0,0,0,.1)' }}
          >
            <CloseIcon w="10px" h="10px" onClick={closeToast} />
          </Flex>
        </Flex>
      ),
    });
  }

  const onSubmit = async values => {
    let formBody = [];
    for (var property in values) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = values[property];
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    setLoading(true);
    const loginResult = await login(formBody);
    setLoading(false);
    if (loginResult.status === 'success') {
      console.log('成功拉~~~~~');
      CurrentUserCtx.login(loginResult.result);
      if (loginResult.result.user.isAdmin) {
        setTimeout(() => {
          navigate(`/admin/dashboard`, { replace: true });
        }, 500);
      } else {
        setTimeout(() => {
          navigate(`/home`, { replace: true });
        }, 500);
      }
    } else {
      addToast();
      console.log('失敗拉~~~~~', loginResult.message);
    }
  };

  // const formBody = Object.keys(values)
  //   .map(
  //     key => encodeURIComponent(key) + '=' + encodeURIComponent(values[key])
  //   )
  //   .join('&');
  // const loginResult = login(formBody);
  // if (loginResult) {
  //   CurrentUserCtx.login({
  //     token: loginResult.token,
  //     user: loginResult.user,
  //   });
  // }
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2));
  //     resolve();
  //   }, 3000);
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="email"
          {...register('email', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="password"
          {...register('password', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
