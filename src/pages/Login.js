import { Flex, Heading, Image, Text, Link } from '@chakra-ui/react';
import LoginForm from '../components/SignForm';
import { Link as RouterLink } from 'react-router-dom';
import flame from '../assets/images/flame.jpg';

// import LoginModal from '../components/LoginModal';

const Login = props => {
  const { sign } = props;
  const isSignIn = sign === 'in';
  const title = isSignIn ? 'Sign In' : 'Sign Up';
  console.log('20px');
  return (
    <Flex
      justify="center"
      align="center"
      pt="50px"
      position="fixed"
      zIndex="50"
      w="100vw"
      h="100vh"
      top="0"
      left="0"
      direction="column"
      bg="rgba(0,0,0,.75)"
    >
      <Flex w="1080px" minH="600px" boxShadow="xl" bg="white">
        <Flex
          bg="gold"
          w="50%"
          align="center"
          justify="center"
          position="relative"
          direction="column"
          px="7%"
        >
          <Heading zIndex="1" color="blue.500" pb="160px">
            Hur funkar vår diffuser
          </Heading>
          <Text zIndex="1" color="blue.500">
            En unik design med en platta av keramik innuti volants diffuser
            skapar 2.2 miljoner vibrationer per sekund. Vibrationerna bryter ner
            de eteriska
          </Text>
          <Image src={flame} position="absolute" />
        </Flex>
        <Flex w="50%" align="center" justify="center" direction="column">
          <Text fontWeight="700" fontSize="24px" pb="20px" color="blue.500">
            {title}
          </Text>
          <LoginForm />
          {isSignIn && (
            <Text pt="20px">
              Not a member?
              <Link as={RouterLink} to="/signup">
                Sign up
              </Link>
              now
            </Text>
          )}
          {!isSignIn && (
            <Text pt="20px">
              Already a member?
              <Link as={RouterLink} to="/signin">
                {/* Sign in */}
              </Link>
              now
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
