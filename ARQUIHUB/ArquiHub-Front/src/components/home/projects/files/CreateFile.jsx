import {
  faUpload,
  faTrash,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStorage,
  deleteStorage,
} from "../../../../redux/slices/storage/storageActions";
import pngDwg from "../../../../assets/icons/dwg.png";

const CreateFile = ({ ext, setForm, form, onBlur }) => {
  const [file, setFile] = useState();
  const [succes, setSucces] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.storage.response.newStorage);

  const handleOnChange = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    dispatch(createStorage(data));
    setSucces(true);
    setTimeout(() => {
      setSucces(false)
    }, 2000);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteStorage(fileData._id));
    setDeleted(true)
    setTimeout(() => {
      setDeleted(false)
    }, 2000);
    setForm({
      storage_id: "",
    });
  };

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row w-auto">
        <input
          type="file"
          onChange={(e) => handleOnChange(e)}
          accept={ext}
          className="opacity-0 absolute w-24 self-end"
        />
        <img src={pngDwg} alt="pdf" className="w-16"/>
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          className="mx-1 mb-1 self-end text-xl md:text-black"
        />
      </div>
      <button
        onClick={(e) => handleDelete(e)}
        disabled={!fileData}
        className="mx-1 cursor-pointer self-end"
      >
        <FontAwesomeIcon icon={faTrash} className="text-2xl hover:text-danger" />
      </button>
      <div>
        {succes && (
          <div
            id="toast-success"
            className="fixed bottom-0 right-0 z-30 flex items-center p-4 mb-4 w-full max-w-xs text-gray-900 bg-white rounded-lg shadow sm:mr-8"
            role="alert"
          >
            <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">
              File created successfully.
            </div>
            <button
              onClick={() => setSucces(false)}
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
              data-dismiss-target="#toast-success"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      <div>
        {deleted && (
          <div
            id="toast-success"
            className="fixed bottom-0 right-0 z-30 flex items-center p-4 mb-4 w-full max-w-xs text-gray-900 bg-white rounded-lg shadow sm:mr-8"
            role="alert"
          >
            <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">
              File deleted successfully.
            </div>
            <button
              onClick={() => setSucces(false)}
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
              data-dismiss-target="#toast-success"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateFile;
