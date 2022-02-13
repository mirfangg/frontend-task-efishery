// import { useState, useEffect } from "react";
import DataTable from "../components/Table/DataTable";
// import axios from "axios";
import "../assets/scss/Content.scss";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// reactstrap
import { Button } from "reactstrap";

function Content() {
  // const [productsData, setProductsData] = useState([]);
  // const [isLoading, setIsloading] = useState(true);

  // const getProductsData = async () => {
  //   await axios
  //     .get(
  //       "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list"
  //     )
  //     .then((response) => {
  //       if (response.status) {
  //         setProductsData(response.data);
  //         setIsloading(false);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   getProductsData();
  // }, []);

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
          <div className="addProduct__button">
            <Button color="dark">
              <FontAwesomeIcon icon={faPlus} />
              <span>Tambah Produk</span>
            </Button>
          </div>
          <DataTable />
          {/* {isLoading ? (
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
                <Button color="dark">
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Tambah Produk</span>
                </Button>
              </div>
              <DataTable data={productsData} />
            </>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Content;
