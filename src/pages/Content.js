import { useState, useEffect } from "react";
import DataTable from "../components/Table/DataTable";
import { connect } from "react-redux";
import { getProductsList } from "../actions";
import "../assets/scss/Content.scss";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// reactstrap
import { Button, Spinner } from "reactstrap";

function Content({ getProductsList, productsList, isLoading, error }) {
  const [productsListData, setProductsListData] = useState([]);

  useEffect(() => {
    getProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    productsList !== undefined &&
      setProductsListData(productsList.filter((item) => item.uuid !== null));
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
              {error ? (
                <div className="content__table__error">
                  <div className="content__table__error__wrapper">
                    <h2>Oops! Page Not Found</h2>
                    <h4>
                      Status code: <span>404</span>
                    </h4>
                  </div>
                </div>
              ) : (
                <>
                  <div className="addProduct__button">
                    <Button color="dark">
                      <FontAwesomeIcon icon={faPlus} />
                      <span>Tambah Produk</span>
                    </Button>
                  </div>
                  <DataTable productsList={productsListData} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.products.isLoading,
    error: state.products.error,
    productsList: state.products.productsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsList: () => dispatch(getProductsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
