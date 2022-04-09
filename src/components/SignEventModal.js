import { useContext } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Flex,
  Heading,
  Image,
  HStack,
} from '@chakra-ui/react';

import ModalContext from '../store/ModalContext';

import SignUpDoneModal from '../components/SignUpDoneModal';
import SignForm from './SignForm';
import flame from '../assets/images/flame.jpg';

const SignEventModal = () => {
  const modalCtx = useContext(ModalContext);

  //註冊登入標題
  const title = modalCtx.isSignIn ? 'Sign In' : 'Sign Up';

  const handleSignUpDoneModalOpen = () => {
    modalCtx.onSuccessRegisterModalOpen();
  };

  return (
    <>
      <Modal
        isOpen={modalCtx.isSignModalOpen}
        onClose={modalCtx.onSignModalClose}
        w="auto"
      >
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
              {/* <Text
                zIndex="1"
                color="white"
                fontWeight="700"
                mx="60px"
                opacity="0.8"
                bg="blue.700"
              >
                En unik design med en platta av keramik innuti volants diffuser
                skapar 2.2 miljoner vibrationer per sekund. Vibrationerna bryter
                ner de eteriska
              </Text> */}
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
                isSignIn={modalCtx.isSignIn}
                handleSignModalClose={modalCtx.onSignModalClose}
                handleSignUpDoneModalOpen={handleSignUpDoneModalOpen}
              />
              {modalCtx.isSignIn && (
                <HStack color="gray.400" pt="20px">
                  <Text>Not a member? </Text>

                  <Text
                    cursor="pointer"
                    _hover={{ color: 'gold' }}
                    onClick={() => modalCtx.onSignModalOpen(false)}
                    color="blue.600"
                  >
                    Sign Up
                  </Text>
                  <Text>now</Text>
                </HStack>
              )}
              {!modalCtx.isSignIn && (
                <HStack color="gray.400" pt="20px">
                  <Text>Already a member?</Text>

                  <Text
                    cursor="pointer"
                    _hover={{ color: 'gold' }}
                    onClick={() => modalCtx.onSignModalOpen(true)}
                    color="blue.600"
                  >
                    Sign In
                  </Text>
                </HStack>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <SignUpDoneModal
        isOpen={modalCtx.isSuccessRegisterModalOpen}
        onClose={modalCtx.onSuccessRegisterModalClose}
        onSignModalOpen={() => modalCtx.onSignModalOpen(true)}
      />
    </>
  );
};

export default SignEventModal;
