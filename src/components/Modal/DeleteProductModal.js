import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function DeleteProductModal({ modal, toggleModal }) {
  return (
    <Modal centered scrollable isOpen={modal}>
      <ModalHeader toggle={toggleModal}>Hapus Data</ModalHeader>
      <ModalBody>
        Apakah Anda yakin ingin menghapus produk ini?
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleModal}>
          Simpan
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
}

export default DeleteProductModal;
