import React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const VisualizePDF = ({ url }) => {
  const [numPage, setNumPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPage(numPages);
    setPageNumber(1);
  }
  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }
  function changePageBack() {
    changePage(-1);
  }
  function changePageNext() {
    changePage(+1);
  }
  return (
    <div className="flex flex-row justify-center items-center my-4">
      {/* <iframe src={url} frameborder="0"></iframe> */}
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="z-0"
      >
        <Page width={300} pageNumber={pageNumber} className="z-0"></Page>
        <div>
          <p className="flex text-light justify-center">
            Page {pageNumber} of {numPage}
          </p>
        </div>
      </Document>
     {/*  <button
        disabled={pageNumber === 1}
        onClick={changePageBack}
        className="absolute mx-6 w-auto h-4/8 left-0 float-left cursor-pointer my-2 border text-white p-2 bg-gray-800 opacity-20
        md:mx-16
        lg:mx-32
        xl:mx-64
        2xl:mx-96"
      >
        {`<`}
      </button>
      <button
        disabled={pageNumber === numPage}
        onClick={changePageNext}
        className="absolute w-auto mx-6 h-4/8 right-0 float-right cursor-pointer my-2 border text-white p-2 bg-gray-800 opacity-20
        md:mx-16
        lg:mx-32
        xl:mx-64
        2xl:mx-96"
      >
        {`>`}
      </button> */}
    </div>
  );
};

export default VisualizePDF;
