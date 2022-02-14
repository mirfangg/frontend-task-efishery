import React, { useState } from "react";
import { formatPriceIDR, formatDate } from "../../utils/helper";
import "../../assets/scss/Content.scss";

// react-bootstrap-table
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

// Modal
import EditProductModal from "../Modal/EditProductModal";
import DeleteProductModal from "../Modal/DeleteProductModal";

// reactstrap
import { Button } from "reactstrap";

const defaultSorted = [
  {
    dataField: "komoditas",
    order: "asc",
  },
];

function DataTable({ productsList }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleOpenEditModal = () => setOpenEditModal(!openEditModal);
  const toggleOpenDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

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

  const columnsList = [
    // No
    // {
    //   dataField: "uuid",
    //   text: "No",
    //   sort: true,
    // },
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
      text: "Kota/Kab",
      sort: true,
      filter: textFilter({
        placeholder: "Ketik Kota/Kab...",
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
            <Button color="warning" onClick={toggleOpenEditModal}>
              <FontAwesomeIcon icon={faPenToSquare} />
              <span>Ubah</span>
            </Button>
            <Button color="danger" onClick={toggleOpenDeleteModal}>
              <FontAwesomeIcon icon={faTrash} />
              <span>Hapus</span>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BootstrapTable
        keyField="uuid"
        data={productsList}
        columns={columnsList}
        defaultSorted={defaultSorted}
        pagination={paginationFactory()}
        filter={filterFactory()}
        bordered={false}
        bootstrap4
        hover
      />
      {/* Modal */}
      <EditProductModal
        modal={openEditModal}
        toggleModal={toggleOpenEditModal}
      />
      <DeleteProductModal
        modal={openDeleteModal}
        toggleModal={toggleOpenDeleteModal}
      />
    </>
  );
}

export default DataTable;
