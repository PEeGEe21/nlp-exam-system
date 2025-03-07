import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AddOptionTypeForm from '../../Forms/AddOptionTypeForm';

const AddOptionTypeModal = ({ isOpen, onClose, dataSource, start, users, loggedInUser}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Option Type</ModalHeader>
          <ModalCloseButton />
          <AddOptionTypeForm 
            onClose={onClose} 
            dataSource={dataSource} 
            start={start} 
            users={users}
            loggedInUser={loggedInUser}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddOptionTypeModal;