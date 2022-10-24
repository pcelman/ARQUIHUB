import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createUpdate } from "../../../../redux/slices/update/updateActions";
import AvatarUser from "../../../avatarUser/AvatarUser";
import CreateFile from "../files/CreateFile";

const CreateUpdate = ({ project_id, project }) => {
  const fileData = useSelector((state) => state.storage.response);
  const {user} = useSelector(state=>state.user)
  const userToken = JSON.parse(window.localStorage.getItem("token"));
  const users = project.users.map((e) => {
    return e
  })
  const [form, setForm] = useState({
    storage_id: "",
    title: "",
    comments: "",
    project_id: project_id,
    user_id: userToken ? userToken.userId : "",
    users: [...users]
  });
  useEffect(() => {
    fileData.newStorage &&
      setForm({ ...form, storage_id: fileData.newStorage._id });
  }, [fileData]);

  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault()
    dispatch(createUpdate(form));
    setForm({
      storage_id: "",
      title: "",
      comments: "",
    });
  };
  function onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(createUpdate(form));
      setForm({
        storage_id: "",
        title: "",
        comments: "",
      });
    }
  }

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <div className="w-full md:flex md:justify-end">
      <form
        onSubmit={(e) => handleSumbit(e)}
        onKeyDown={(e) => onKeyDown(e)}
        className="grid my-4 p-4 grid-cols-4 gap-4 w-full items-center border shadow-lg 
          md:w-3/4"
      >
        <div
          className="hidden m-2 place-items-center rounded
            md:flex md:w-20 md:justify-self-center
            "
        >
          {user.length!==0 && <AvatarUser img={user.avatar} className="w-20 h-20" ></AvatarUser>}
        </div>
        <div className="col-span-4 md:col-span-2 md:col-start-2">
          <input
            type="text"
            placeholder="Title..."
            name="title"
            value={form.title}
            onChange={handleOnChange}
            className="border-b-2  p-2 w-full
            "
          />
          <textarea
            name="comments"
            id=""
            className="mb-2 mt-4 p-2 border-b-2 w-full
            "
            value={form.comments}
            cols="30"
            rows="3"
            placeholder="Comments..."
            onChange={handleOnChange}
          ></textarea>
        </div>
        <div
          className="flex items-center flex-col col-span-4
            md:col-span-1 md:col-start-4
            "
        >
          <CreateFile ext={".dwg"} setForm={setForm} storage_id={form.storage_id}/>
          { form.title && form.comments && form.storage_id &&
            <button
              type="submit"
              className="bg-gray-100 text-black w-full my-2 p-2 shadow-lg border 
              hover:bg-gray-900 hover:text-white  
                "
              disabled={
                !form.comments ||
                !form.project_id ||
                !form.storage_id ||
                !form.user_id
              }
            >
              <span>Send</span>
            </button>
          }
        </div>
      </form>
    </div>
  );
};

export default CreateUpdate;
