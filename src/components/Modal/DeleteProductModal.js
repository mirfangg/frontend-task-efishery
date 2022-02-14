import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProductsList, deleteProduct, requestError } from "../../actions";

// reactstrap
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function DeleteProductModal({
  openDeleteModal,
  setOpenDeleteModal,
  selectedData,
  getProductsList,
  deleteProduct,
  requestError,
  isLoadingButton,
  isRequestSuccess,
  error,
}) {
  const [deleteItem, setDeleteItem] = useState({});

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && requestError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDeleteModal]);

  useEffect(() => {
    setDeleteItem({ condition: { uuid: selectedData.uuid } });
  }, [selectedData]);

  const toggleCloseDeleteModal = () => {
    (error !== null || isRequestSuccess) && getProductsList();
    setOpenDeleteModal(!openDeleteModal);
  };

  return (
    <Modal centered scrollable isOpen={openDeleteModal}>
      <ModalHeader toggle={toggleCloseDeleteModal}>
        <span style={{ fontWeight: "bold", color: "#1c939b" }}>
          Hapus Produk
        </span>
      </ModalHeader>
      <ModalBody>Apakah Anda yakin ingin menghapus produk ini?</ModalBody>
      <ModalFooter>
        <button
          className="btn fw-bold"
          disabled={true}
          // disabled={isLoadingButton}
          style={{ backgroundColor: "#1c939b", color: "#ffffff" }}
          onClick={() => deleteProduct(deleteItem)}
        >
          Ya, Hapus
        </button>
      </ModalFooter>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoadingButton: state.products.isLoadingButton,
    isRequestSuccess: state.products.isRequestSuccess,
    error: state.products.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsList: () => dispatch(getProductsList()),
    deleteProduct: (item) => dispatch(deleteProduct(item)),
    requestError: () => dispatch(requestError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProductModal);
