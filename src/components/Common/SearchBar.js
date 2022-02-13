import React from "react";
import "../../assets/scss/SearchBar.scss";

function SearchBar() {
  return (
    <div className="searchBar">
      <input
        className="form-control"
        type="text"
        placeholder="Ketik pencarian disini..."
      />
    </div>
  );
}

export default SearchBar;
