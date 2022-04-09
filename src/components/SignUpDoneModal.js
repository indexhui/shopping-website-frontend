import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';

const SignUpDoneModal = props => {
  const { isOpen, onClose, onSignModalOpen } = props;
  return (
    <Modal isOpen={isOpen} size="sm" isCentered onClose={onClose} w="auto">
      <ModalOverlay />
      <ModalContent
        display="flex"
        alignItem="center"
        justifyItems="center"
        overflow="hidden"
      >
        <ModalBody p="0" w="100%" display="flex" alignItems="center">
          <Flex
            w="100%"
            h="100%"
            align="center"
            justify="center"
            display="flex"
            direction="column"
          >
            <Flex
              w="100%"
              bg="gold"
              justify="center"
              align="center"
              direction="column"
              py="30px"
            >
              <Text fontWeight="700" fontSize="24px" pb="5px" color="white">
                Success
              </Text>
              <Text fontWeight="700" fontSize="12px" pb="10px" color="white">
                Your account has been created.
              </Text>
            </Flex>
            <Button my="20px" onClick={onSignModalOpen}>
              Sign In
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignUpDoneModal;
