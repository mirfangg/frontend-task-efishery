import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getProductsList,
  getSizeOptions,
  getAreaOptions,
  editProduct,
  requestError,
} from "../../actions";

// reactstrap
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function EditProductModal({
  openEditModal,
  setOpenEditModal,
  selectedData,
  getProductsList,
  getSizeOptions,
  getAreaOptions,
  editProduct,
  requestError,
  areaOptionsList,
  sizeOptionsList,
  isRequestSuccess,
  isLoadingComponent,
  error,
}) {
  const [editedData, setEditedData] = useState([
    {
      uuid: "",
      komoditas: "",
      area_provinsi: "",
      area_kota: "",
      size: "",
      price: "",
      tgl_parsed: "",
      timestamp: "",
    },
  ]);

  const [submitData] = useState({
    condition: {
      uuid: "",
    },
    set: {},
  });

  const refreshPage = () => {
    window.location.reload();
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editedData.tgl_parsed = new Date().toISOString();
    editedData.timestamp = new Date().getTime();
    submitData.condition.uuid = selectedData.uuid;
    if (submitData.set.area) {
      submitData.set.area_kota = submitData.set.area.split(" - ")[0];
      submitData.set.area_provinsi = submitData.set.area.split(" - ")[1];
    }
    submitData.set = editedData;

    const { komoditas, area_kota, area_provinsi, size, price } = submitData.set;

    if (komoditas && area_kota && area_provinsi && size && price) {
      editProduct(submitData);
      alert("Produk berhasil diubah!");
      setOpenEditModal(!openEditModal);
      refreshPage();
    } else {
      alert("Gagal mengubah data!");
    }
  };

  const toggleCloseEditModal = () => {
    (error !== null || isRequestSuccess) && getProductsList();
    setOpenEditModal(!openEditModal);
    setEditedData(selectedData);
  };

  useEffect(() => {
    areaOptionsList.length === 0 && getAreaOptions();
    sizeOptionsList.length === 0 && getSizeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEditedData(selectedData);
  }, [selectedData]);

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && requestError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditModal]);

  return (
    <Modal centered scrollable isOpen={openEditModal}>
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggleCloseEditModal}>
          <span style={{ fontWeight: "bold", color: "#1c939b" }}>
            Ubah Produk
          </span>
        </ModalHeader>
        <ModalBody>
          {/* Komoditas */}
          <div className="mb-3">
            <label for="komoditas_id" className="form-label fw-bold">
              Komoditas
            </label>
            <input
              type="text"
              name="komoditas"
              className="form-control"
              id="komoditas_id"
              style={{ fontSize: "14px" }}
              placeholder="Ketik Komoditas"
              value={editedData.komoditas}
              onChange={handleChangeValue}
              required
            />
          </div>

          {/* Ukuran */}
          <div className="mb-3">
            <label for="size_id" className="form-label fw-bold">
              Ukuran
            </label>
            <select
              name="size"
              className="form-select"
              id="size_id"
              style={{ fontSize: "14px" }}
              onChange={handleChangeValue}
              required
            >
              <option defaultValue="" value={editedData.size}>
                {isLoadingComponent ? "Loading..." : editedData.size}
              </option>
              {sizeOptionsList.map((item, index) => (
                <option key={index} value={item.size}>
                  {item.size}
                </option>
              ))}
            </select>
          </div>

          {/* Area */}
          <div className="mb-3">
            <label for="area_id" className="form-label fw-bold">
              Area
            </label>
            <select
              name="area"
              className="form-select"
              id="area_id"
              style={{ fontSize: "14px" }}
              onChange={handleChangeValue}
              required
            >
              <option
                defaultChecked
                value={editedData.area_kota + " - " + editedData.area_provinsi}
              >
                {isLoadingComponent
                  ? "Loading..."
                  : editedData.area_kota + " - " + editedData.area_provinsi}
              </option>
              {areaOptionsList.map((area, index) => (
                <option key={index}>
                  {area.city} - {area.province}
                </option>
              ))}
            </select>
          </div>

          {/* Harga */}
          <div className="mb-3">
            <label for="price_id" className="form-label fw-bold">
              Harga
            </label>
            <input
              type="number"
              name="price"
              className="form-control"
              id="price_id"
              style={{ fontSize: "14px" }}
              placeholder="contoh: 50000"
              value={editedData.price}
              onChange={handleChangeValue}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <button
            type="submit"
            className="btn fw-bold"
            style={{ backgroundColor: "#1c939b", color: "#ffffff" }}
          >
            Simpan
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    areaOptionsList: state.products.areaOptionsList,
    sizeOptionsList: state.products.sizeOptionsList,
    isRequestSuccess: state.products.isRequestSuccess,
    isLoadingComponent: state.products.isLoadingComponent,
    error: state.products.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (newData) => dispatch(editProduct(newData)),
    getProductsList: () => dispatch(getProductsList()),
    getAreaOptions: () => dispatch(getAreaOptions()),
    getSizeOptions: () => dispatch(getSizeOptions()),
    requestError: () => dispatch(requestError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);
