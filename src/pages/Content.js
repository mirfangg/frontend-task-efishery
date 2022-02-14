import { useState, useEffect } from "react";
import DataTable from "../components/Table/DataTable";
import { connect } from "react-redux";
import { getProductsList } from "../actions";
import "../assets/scss/Content.scss";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Modal
import AddProductModal from "../components/Modal/AddProductModal";

// reactstrap
import { Button, Spinner } from "reactstrap";

function Content({ getProductsList, productsList, isLoading }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [productsListData, setProductsListData] = useState([]);

  useEffect(() => {
    getProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    productsList !== undefined &&
      setProductsListData(
        productsList.filter(
          (item) => item.uuid !== null && item.komoditas !== null
        )
      );
  }, [productsList]);

  return (
    <div className="content">
      <div className="container">
        {/* Header */}
        <div className="content__header">
          <h1 className="content__header__title">
            Data Harga Perikanan di Indonesia
          </h1>
        </div>

        {/* Table */}
        <div className="content__table">
          {isLoading ? (
            <div className="content__table__spinner">
              <div className="wrapper">
                <Spinner color="primary" type="grow" />
                <Spinner color="danger" type="grow" />
                <Spinner color="warning" type="grow" />
                <Spinner color="success" type="grow" />
              </div>
            </div>
          ) : (
            <>
              <div className="addProduct__button">
                {/* <Button color="dark" onClick={() => setOpenAddModal(true)}> */}
                <Button color="dark">
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Tambah Produk</span>
                </Button>
              </div>
              <DataTable productsList={productsListData} />
            </>
          )}
        </div>
        <AddProductModal
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.products.isLoading,
    productsList: state.products.productsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsList: () => dispatch(getProductsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
