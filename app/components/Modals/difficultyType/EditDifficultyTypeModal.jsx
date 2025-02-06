import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EditDifficultyTypeForm from '../../Forms/EditDifficultyTypeForm';

const EditDifficultyTypeModal = ({
  user,
  isOpen,
  onClose,
  dataSource,
  currentDifficultyType,
  setDataSource,
  setCurrentDifficultyType,
  start,
  users,
  loggedInUser
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {currentDifficultyType?.name} Type</ModalHeader>
          <ModalCloseButton />
          <EditDifficultyTypeForm
            onClose={onClose}
            dataSource={dataSource}
            currentDifficultyType={currentDifficultyType}
            setDataSource={setDataSource}
            setCurrentDifficultyType={setCurrentDifficultyType}
            start={start}
            users={users}
            loggedInUser={loggedInUser}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditDifficultyTypeModal;
