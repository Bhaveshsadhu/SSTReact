import React from "react";

const FileItem = ({ name, icon, size }) => (
  <div className="col-lg-3 col-xl-2 border border-primary w-10 m-2">
    <div className="file-man-box">
      <div className="file-img-box text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
        >
          <title>{name}</title>
          <path d="M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20M17.35 10L15.25 19H13.85L12.05 12.21L10.25 19H8.85L6.65 10H8.15L9.55 16.81L11.35 10H12.65L14.45 16.81L15.85 10H17.35Z" />
        </svg>
      </div>
      <a href="#" className="file-download ">
        <i className="fa fa-download"></i>{" "}
        <i className=" text-overflow">{name}</i>{" "}
      </a>
    </div>
  </div>
);

const FileList = () => (
  <div className="row">
    <FileItem
      name="invoice_project.pdf"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/pdf.svg"
      size="568.8 kb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/bmp.svg"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/bmp.svg"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/bmp.svg"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/bmp.svg"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/bmp.svg"
      size="845.8 mb"
    />
    <FileItem
      name="Bmpfile.bmp"
      icon="https://coderthemes.com/highdmin/layouts/assets/images/file_icons/bmp.svg"
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
                <h4 className="header-title m-b-30">My Files</h4>
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
