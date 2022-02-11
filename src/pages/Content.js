import React from "react";
import "../assets/scss/Content.scss";

function Content() {
  return (
    <div className="content">
      <div className="container">
        {/* Header */}
        <div className="content__header">
          <h1 className="content__header__title">
            Data Harga Perikanan di Indonesia
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Content;
