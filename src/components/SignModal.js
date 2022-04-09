import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Flex,
  Heading,
  Image,
  useDisclosure,
} from '@chakra-ui/react';

import SignUpDoneModal from '../components/SignUpDoneModal';
import SignForm from './SignForm';
import flame from '../assets/images/flame.jpg';

const SignModal = props => {
  //是註冊還是登入
  const { sign } = props;
  const isSignIn = sign === 'signIn';
  const title = isSignIn ? 'Sign In' : 'Sign Up';

  // 登入和註冊modal開關
  const { isOpen, onOpen, onClose } = useDisclosure();

  //註冊成功 modal開關
  const {
    isOpen: isSignUpDoneModalOpen,
    onOpen: onSignUpDoneModalOpen,
    onClose: onSignOpenModalClose,
  } = useDisclosure();

  const handleSignUpDoneModalOpen = () => {
    console.log('hi');
    onSignUpDoneModalOpen();
    console.log(isSignUpDoneModalOpen);
    onClose();
  };

  return (
    <>
      <Text onClick={onOpen}>{title}</Text>

      <Modal isOpen={isOpen} onClose={onClose} w="auto">
        <ModalOverlay />
        <ModalContent
          display="flex"
          alignItem="center"
          justifyItems="center"
          border="1px"
          borderColor="green.500"
          w="1080px"
          maxW="unset"
          h="600px"
        >
          {/* <ModalCloseButton /> */}

          <ModalBody p="0" w="100%" display="flex" alignItems="center">
            <Flex
              bg="gold"
              w="50%"
              h="100%"
              align="center"
              justify="center"
              position="relative"
              direction="column"
            >
              <Heading zIndex="1" color="blue.500" pb="160px">
                Hur funkar vår diffuser
              </Heading>
              <Text zIndex="1" color="blue.500">
                En unik design med en platta av keramik innuti volants diffuser
                skapar 2.2 miljoner vibrationer per sekund. Vibrationerna bryter
                ner de eteriska
              </Text>
              <Image src={flame} position="absolute" />
            </Flex>
            <Flex
              w="50%"
              h="100%"
              align="center"
              justify="center"
              display="flex"
              direction="column"
            >
              <Text fontWeight="700" fontSize="24px" pb="20px" color="blue.500">
                {title}
              </Text>
              <SignForm
                isSignIn={isSignIn}
                handleSignUpDoneModalOpen={handleSignUpDoneModalOpen}
              />
            </Flex>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>

      <SignUpDoneModal
        isOpen={isSignUpDoneModalOpen}
        onClose={onSignOpenModalClose}
        onOpen={onOpen}
      />
    </>
  );
};

export default SignModal;
