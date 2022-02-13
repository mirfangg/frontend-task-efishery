import React from "react";
import { formatPriceIDR, formatDate } from "../../utils/helper";
import { connect } from "react-redux";
import "../../assets/scss/Content.scss";

// react-bootstrap-table
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

// reactstrap
import { Button } from "reactstrap";

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const mapStateToProps = (state) => {
  return {
    productsData: state.products.productsData,
  };
};

function DataTable({ productsData }) {
  const headerWrapper = (column, colIndex, { sortElement, filterElement }) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {column.text}
          {sortElement}
        </div>
        {filterElement}
      </div>
    );
  };

  const products = productsData.filter(
    (item) =>
      item.uuid !== null &&
      item.komoditas !== null &&
      item.size !== null &&
      item.tgl_parsed !== null &&
      item.area_provinsi !== null &&
      item.timestamp != null
  );

  const columns = [
    // No
    {
      dataField: "id",
      // dataField: "uuid",
      text: "No",
      sort: true,
    },
    // Komoditas
    {
      dataField: "komoditas",
      text: "Komoditas",
      sort: true,
      filter: textFilter({
        placeholder: "Ketik Komoditas...",
      }),
      headerFormatter: headerWrapper,
    },
    // Kota/Kabupaten
    {
      dataField: "area_kota",
      text: "Kota/Kabupaten",
      sort: true,
      filter: textFilter({
        placeholder: "Ketik Kota/Kabupaten...",
      }),
      headerFormatter: headerWrapper,
    },
    // Provinsi
    {
      dataField: "area_provinsi",
      text: "Provinsi",
      sort: true,
      filter: textFilter({
        placeholder: "Ketik Provinsi...",
      }),
      headerFormatter: headerWrapper,
    },
    // Harga
    {
      dataField: "price",
      text: "Harga",
      sort: true,
      formatter: formatPriceIDR,
    },
    // Ukuran
    {
      dataField: "size",
      text: "Ukuran",
      sort: true,
    },
    // Tanggal
    {
      dataField: "tgl_parsed",
      text: "Tanggal",
      sort: true,
      formatter: formatDate,
    },
    {
      dataField: "link",
      text: "Action",
      headerAlign: "center",
      formatter: (rowContent, row) => {
        return (
          <div className="actionButton__wrapper">
            <Button color="warning">
              <FontAwesomeIcon icon={faPenToSquare} />
              <span>Ubah</span>
            </Button>
            <Button color="danger">
              <FontAwesomeIcon icon={faTrash} />
              <span>Hapus</span>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <BootstrapTable
      keyField="id"
      // keyField="uuid"
      data={products}
      columns={columns}
      defaultSorted={defaultSorted}
      pagination={paginationFactory()}
      filter={filterFactory()}
      bordered={false}
      bootstrap4
      hover
    />
  );
}

export default connect(mapStateToProps, null)(DataTable);
