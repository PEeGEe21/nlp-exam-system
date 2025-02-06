import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AddDifficultyTypeForm from '../../Forms/AddDifficultyTypeForm';

const AddDifficultyTypeModal = ({ isOpen, onClose, dataSource, start, users, loggedInUser}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Difficulty Type</ModalHeader>
          <ModalCloseButton />
          <AddDifficultyTypeForm 
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

export default AddDifficultyTypeModal;