import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EditOptionTypeForm from '../../Forms/EditOptionTypeForm';

const EditOptionTypeModal = ({
  user,
  isOpen,
  onClose,
  dataSource,
  currentQuestionType,
  setDataSource,
  setCurrentQuestionType,
  start,
  users,
  loggedInUser
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {currentQuestionType?.name} Option Type</ModalHeader>
          <ModalCloseButton />
          <EditOptionTypeForm
            onClose={onClose}
            dataSource={dataSource}
            currentQuestionType={currentQuestionType}
            setDataSource={setDataSource}
            setCurrentQuestionType={setCurrentQuestionType}
            start={start}
            users={users}
            loggedInUser={loggedInUser}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditOptionTypeModal;
