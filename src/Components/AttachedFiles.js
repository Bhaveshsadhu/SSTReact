// import React from "react";
import React, { useState } from "react";

const FileItem = ({ name, icon, size }) => {
  const [showFull, setShowFull] = useState(false);

  const handleMouseEnter = () => {
    setShowFull(true);
  };

  const handleMouseLeave = () => {
    setShowFull(false);
  };
  const renderIcon = () => {
    const parts = icon.split("/");
    const fileNameWithExtension = parts[parts.length - 1];
    const [fileName, extension] = fileNameWithExtension.split(".");

    switch (extension) {
      case "pdf":
        return <i class="fa-solid fa-file-pdf fa-2x"></i>;
      case "docx":
      case "doc":
        return <i class="fa-regular fa-file-word fa-2x"></i>;
      case "jpeg":
      case "png":
        return <i class="fa-regular fa-file-image fa-2x"></i>;

      default:
        return null;
    }
  };
  return (
    <div
      className="col-lg-3 col-xl-2 border border-secondary m-2 p-2"
      style={{ width: "90px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="file-man-box">
        <div className="file-img-box text-center">{renderIcon()}</div>
        <a href="#" className="file-download">
          <i className="fa fa-download fa-xs"></i>
          <i>{showFull ? name : name.slice(0, 5)}...</i>
        </a>
      </div>
    </div>
  );
};

const FileList = () => (
  <div className="row">
    <FileItem
      name="invoice_project.pdf"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/pdf.pdf"
      size="568.8 kb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/jpeg.doc"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/png.docx"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/docx.jpeg"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/pdf.pdf"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/png.png"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/docx.docx"
      size="845.8 mb"
    />

    <FileItem
      name="invoice_project.pdf"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/pdf.pdf"
      size="568.8 kb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/jpeg.doc"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/png.docx"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/docx.jpeg"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/pdf.pdf"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/png.png"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/docx.docx"
      size="845.8 mb"
    />
  </div>
);

const FileExplorer = () => (
  <div className="content">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <h6 className="header-title m-b-30">Attached Documents</h6>
              </div>
            </div>

            <FileList />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FileExplorer;
