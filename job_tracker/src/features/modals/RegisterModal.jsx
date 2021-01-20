import React from "react";
import { Modal } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "./modalActions";
import RegisterForm from "../auth/Register/RegisterForm";

const RegisterModal = () => {
  const dispatch = useDispatch();
  return (
    <Modal size="mini" open={true} onClose={() => dispatch(closeModal())}>
      <Modal.Header>Sign Up to Job Tracker!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <RegisterForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;
