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
  useDisclosure,
} from '@chakra-ui/react';

import { InfoOutlineIcon, CloseIcon } from '@chakra-ui/icons';

import SignUpDoneModal from '../components/SignUpDoneModal';

import CurrentUserContext from '../store/CurrentUserContext';

const baseURl = 'https://infinite-beach-24731.herokuapp.com/api';

// let details = {
//   email: 'administrator@example.com',
//   password: '123456789',
// };

// const formBody = `email=administrator@example.com&password=123456789`;

const errorMessage = {
  login: {
    title: 'No user',
    content:
      ' We couldn’t find an account matching the username and password you entered. Please check your username and password and try again.',
  },
  signup: {
    title: 'Registered failed',
    content:
      'The mailbox has been registered, the required items are not filled, the format is wrong',
  },
};

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

const SignUp = async formBody => {
  try {
    const res = await fetch(`${baseURl}/users/register`, {
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

const SignForm = props => {
  const { isSignIn, handleSignUpDoneModalOpen, handleSignModalClose } = props;

  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const CurrentUserCtx = useContext(CurrentUserContext);

  const onDone = () => {
    handleSignUpDoneModalOpen();
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function closeToast() {
    toast.closeAll();
  }

  //toast
  function addToast() {
    toast({
      position: 'top',

      status: 'success',
      duration: 1050,
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
              {errorMessage.login.title}
            </Text>
            <Text fontSize="10px">{errorMessage.login.content}</Text>
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

  function signUpFailToast() {
    toast({
      position: 'top',
      duration: 1050,
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
              {errorMessage.signup.title}
            </Text>
            <Text fontSize="10px">{errorMessage.signup.content}</Text>
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

  async function onSubmit(values) {
    let formBody = [];
    for (var property in values) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = values[property];
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    setLoading(true);
    if (isSignIn) {
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
          handleSignModalClose();
          // setTimeout(() => {
          //   navigate(`/home`, { replace: true });
          // }, 500);
        }
      } else {
        addToast(errorMessage.login);
        console.log('失敗拉~~~~~', loginResult.message);
      }
    } else {
      const signUpResult = await SignUp(formBody);
      setLoading(false);
      if (signUpResult.status === 'success') {
        console.log('註冊成功拉~~~~~');
        handleSignUpDoneModalOpen();

        // CurrentUserCtx.login(signUpResult.result);
        // if (signUpResult.result.user.isAdmin) {
        //   setTimeout(() => {
        //     navigate(`/admin/dashboard`, { replace: true });
        //   }, 500);
        // } else {
        //   setTimeout(() => {
        //     navigate(`/home`, { replace: true });
        //   }, 500);
        // }
      } else {
        signUpFailToast(errorMessage.signup);
        console.log('註冊失敗拉~~~~~', signUpResult.message);
      }
    }
  }

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
      {!isSignIn && (
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
      )}
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
      {/* <Button onClick={onDone}>opensucess</Button> */}
    </form>
  );
};

export default SignForm;
