import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/user/userActions";

export default function UserItem({ el, handleChangeStatus }) {
  const statusUser = el.status;
  const [show, setShow] = useState(false);

  useEffect(() => {
    // dispatch(getAllUsers());
  }, [show]);

  function handleClick(e) {
    if (show === true) {
      setShow(false);
      console.log("e.show: ", show);
      console.log("nombre: ", e.name);
      return;
    }

    if (show === false) {
      setShow(true);
      console.log("e.show: ", show);
      console.log("e.nombre: ", e.name);
      return;
    }
  }

  // const newEl = { ...el, show: false };
  const statusOptions = [];
  statusUser === "active" && statusOptions.push("banned", "inactive");
  statusUser === "banned" && statusOptions.push("active", "inactive");
  statusUser === "inactive" && statusOptions.push("banned", "active");

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-6  mt-6 gap-4">
        {/* <h1>{el._id}</h1> */}

        {el.name ? (
          <h2 className="font-bold">{el.name} </h2>
        ) : (
          <p className="text-slate-300">Name</p>
        )}
        <h2>{el.email}</h2>
      </div>

      {/* <button onClick(e)={handleClick(newEl)}>SHOW MORE </button> */}

      {show ? (
        <div >
            <div className="grid grid-cols-2">
          <div className="font-bold mt-6">Posts</div>
          <div className="mt-6">{el.posts.length}</div>
          <div className="font-bold">Proyects</div>
          <div className=" ">{el.projects.length === 0 ? 0 : el.projects.length}</div>
          <div className="font-bold mb-6">Type</div>
          <div>{el.type}</div>

          </div>
          <div>
          {/* <div className="font-bold">Status</div> */}
          <select 
            className="bg-slate-200 w-full py-5 text-center"
            onChange={(e) => handleChangeStatus(el._id, e)}
          >
            <option disabled selected defaultValue>
              {statusUser}
            </option>
            <option value={statusOptions[0]}>{statusOptions[0]}</option>
            <option value={statusOptions[1]}>{statusOptions[1]}</option>
          </select>
</div>
        </div>
      ) : (
        <div></div>
      )}
      {show ? (
        <button
          className="w-full my-6 bg-slate-300 py-4"
          onClick={(e) => handleClick(el)}
        >
          {" "}
          SHOW LESS
        </button>
      ) : (
        <button
          className="w-full my-6 bg-slate-300 py-4"
          onClick={(e) => handleClick(el)}
        >
          SHOW MORE
        </button>
      )}
    </div>
  );
}
