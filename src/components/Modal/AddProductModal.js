import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  getProductsList,
  getSizeOptions,
  getAreaOptions,
  addProduct,
  requestError,
} from "../../actions";

function AddProductModal({
  openAddModal,
  setOpenAddModal,
  areaOptionsList,
  sizeOptionsList,
  isRequestSuccess,
  getProductsList,
  getSizeOptions,
  getAreaOptions,
  addProduct,
  requestError,
  error,
}) {
  const [newData, setNewData] = useState([]);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    setNewData({
      ...newData,
      [name]: value,
    });

    console.log(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    newData.uuid = uuid();
    newData.tgl_parsed = new Date().toISOString();
    newData.timestamp = new Date().getTime();
    if (newData.area) {
      newData.area_kota = newData.area.split(" - ")[0];
      newData.area_provinsi = newData.area.split(" - ")[1];
    }

    const { komoditas, size, price, area_kota, area_provinsi } = newData;

    if (komoditas && area_kota && area_provinsi && size && price) {
      addProduct([newData]);
      alert("Produk berhasil ditambahkan!");
      setOpenAddModal(!openAddModal);
      refreshPage();
    } else {
      alert("Gagal menyimpan data!");
    }
  };

  const toggleCloseAddModal = () => {
    (error !== null || isRequestSuccess) && getProductsList();
    setNewData({
      komoditas: null,
      area: null,
      size: null,
      price: null,
    });
    setOpenAddModal(!openAddModal);
  };

  useEffect(() => {
    areaOptionsList.length === 0 && getSizeOptions();
    sizeOptionsList.length === 0 && getAreaOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return (error !== null || isRequestSuccess !== null) && requestError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpenAddModal]);

  return (
    <Modal centered scrollable isOpen={openAddModal}>
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggleCloseAddModal}>
          <span style={{ fontWeight: "bold", color: "#1c939b" }}>
            Tambah Produk
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
              placeholder="contoh: Ikan Lele"
              value={newData.komoditas}
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
              value={newData.size}
              onChange={handleChangeValue}
              required
            >
              <option defaultValue="">Pilih Ukuran</option>
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
              value={newData.area}
              onChange={handleChangeValue}
              required
            >
              <option defaultValue="">Pilih Area</option>
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
              value={newData.price}
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
    error: state.products.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (newData) => dispatch(addProduct(newData)),
    getProductsList: () => dispatch(getProductsList()),
    getSizeOptions: () => dispatch(getSizeOptions()),
    getAreaOptions: () => dispatch(getAreaOptions()),
    requestError: () => dispatch(requestError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
