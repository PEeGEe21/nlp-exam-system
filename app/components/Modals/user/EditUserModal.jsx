import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { getFullName } from '../../../utils/common';
import EditUserForm from '../../Forms/EditUserForm';

const EditUserModal = ({
  user,
  isOpen,
  onClose,
  dataSource,
  currentUser,
  setDataSource,
  setCurrentUser,
  isEditingUser,
  setIsEditingUser,
  start,
  roles
}) => {
  const heading = currentUser ? ('Edit ' + (getFullName(currentUser))) : 'Create'
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <EditUserForm
            onClose={onClose}
            dataSource={dataSource}
            currentUser={currentUser}
            setDataSource={setDataSource}
            setCurrentUser={setCurrentUser}
            isEditingUser={isEditingUser}
            setIsEditingUser={setIsEditingUser}
            start={start}
            allRoles={roles}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserModal;
