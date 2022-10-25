import React from "react";
import Portal from "../portal/Portal";

function Modal({ children, toggle, active }) {
  const condition = children.type === "img"
  return (
    <Portal>
      {active && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-30 ">
          <div
            onClick={toggle}
            className="fixed w-full h-full top-0 left-0 bg-black opacity-40"
          ></div>
          <div className={`fixed p-4  ${condition ? " max-w-3xl " :"w-full max-w-md h-full md:h-auto"} `}>
            <div className="relative bg-gray-50 shadow ">
              <button
                onClick={toggle}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="authentication-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
}

export default Modal;
