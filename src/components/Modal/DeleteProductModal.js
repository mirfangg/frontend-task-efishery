import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProductsList, deleteProduct, requestError } from "../../actions";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

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
      <ModalBody>
        {isRequestSuccess ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gridColumnGap: "6px",
            }}
          >
            <FontAwesomeIcon icon={faCircleCheck} />
            <span>Data Berhasil di Hapus!</span>
          </div>
        ) : error !== null ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gridColumnGap: "6px",
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
            <span>Terjadi Kesalahan!</span>
          </div>
        ) : (
          <span>Apakah Anda yakin ingin menghapus produk ini?</span>
        )}
      </ModalBody>
      <ModalFooter>
        {isRequestSuccess ? (
          <button
            className="btn fw-bold"
            style={{ backgroundColor: "#1c939b", color: "#ffffff" }}
            onClick={toggleCloseDeleteModal}
          >
            Tutup
          </button>
        ) : (
          <button
            className="btn fw-bold"
            disabled={isLoadingButton}
            style={{ backgroundColor: "#1c939b", color: "#ffffff" }}
            onClick={() => deleteProduct(deleteItem)}
          >
            {isLoadingButton ? "Loading..." : "Ya, Hapus"}
          </button>
        )}
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
