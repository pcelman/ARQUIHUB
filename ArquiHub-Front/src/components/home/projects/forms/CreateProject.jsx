import React from "react";
import { useState } from "react";
import CreateFile from "../files/CreateFile";
import CreatePdfFile from "../files/CreatePdfFile";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUser } from "../../../../redux/slices/user/userActions";
import { useEffect } from "react";
import { getStorageById } from "../../../../redux/slices/storage/storageActions";
import { clearResponseProject, createProject } from "../../../../redux/slices/project/projectActions";
import { validate } from "./validateProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../files/tooltip.css"
import Unauthorized from "../../../errors/Unauthorized";
import { Link, useNavigate } from "react-router-dom";
const CreateProject = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const fileData = useSelector((state) => state.storage.response);
  const responseProject = useSelector((state) => state.project.response)
const [createdSuccessful, setCreatedSuccessful] = useState(false);
  const userToken = JSON.parse(window.localStorage.getItem("token"));
    const {user} = useSelector(state=>state.user)
    const users = [...allUsers]
    const filterUsers = users.filter(e=>!(!e.isPremium && e.posts.length>=3)&& e._id!==user._id)
  const [errors, setErrors] = useState({});
  const {response} = useSelector(state=>state.project)
const navigate = useNavigate()
  const [misingLabel, setMisingLabel] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    visibility: "public",
    created_by: userToken ? userToken.userId : "",
    users: "",
    pdf_file: "",
    project_file: "",
  })

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getUser(userToken.userId))
  }, [dispatch]);

useEffect(()=>{
  if(response._id){
    navigate(`/projectDetail/${response._id}`); 
  dispatch(clearResponseProject())
  dispatch(getUser(userToken.userId))
  }
  
},[response]) 
  useEffect(() => {
    if (
      fileData.newStorage &&
      fileData.newStorage.filename.split(".").pop() === "pdf"
    ) {
      fileData.newStorage &&
        setForm({ ...form, pdf_file: fileData.newStorage._id });
    } else {
      fileData.newStorage &&
        setForm({ ...form, project_file: fileData.newStorage._id });
    }
    if (fileData.newStorage) dispatch(getStorageById(fileData.newStorage._id));
  }, [fileData, dispatch]);

  const pdf_get = useSelector((state) => state.storage.storage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const options2 = [
    {
      label: "Public",
      value: "public",
    },
    {
      label: "Private",
      value: "private",
    },
  ];
  const handleSelectVisibility = (value) => {
    setErrors(validate({...form, visibility:value}, "visibility", errors, user.premium));
    setForm({
      ...form,
      visibility: value,
    });
  };
  const options = filterUsers.map((e) => {
    return {
      value: e._id,
      label: e.nickname,
    };
  });
  const handleSelectUsers = (value) => {
    setForm({
      ...form,
      users: value,
    });
  };

  const handleFormBlur = (e) => {
    handleChange(e);
    setErrors(validate(form, e.target.name, errors, user.premium));
  };
  const handleMising = (e) => {
    if (Object.keys(errors).length !== 0 || !form.project_file || !form.pdf_file) {
      setMisingLabel(true);
      setTimeout(() => {
        setMisingLabel(false);
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitForm = {
      title: form.title,
      description: form.description,
      visibility: form.visibility.value,
      created_by: form.created_by,
      users: form.users,
      pdf_file: form.pdf_file,
      project_file: form.project_file,
    };
    setErrors(validate(form,undefined,false, user.premium));

    
    if (Object.keys(errors).length === 0 && form.project_file && form.pdf_file) {
      dispatch(createProject(submitForm));
      setForm({
        title: "",
        description: "",
        visibility: "",
        created_by: "",
        users: "",
        pdf_file: "",
        project_file: "", 
      });
      if (responseProject) {
        setCreatedSuccessful(true)
        setTimeout(() => {
          setCreatedSuccessful(false)
        }, 2000);
      }
    }
  };
  if(!userToken){
    navigate("/home")
    return
  }
  if(user && !user.premium && user.projects.length>=3){
    navigate("/payment")
    return
  }
  return (
    <div className="flex flex-row my-8">
      {!user? 
      <Unauthorized/>
      :
      <form onSubmit={(e) => handleSubmit(e)} className="w-full md:w-1/2">
        <div
          className="mx-4
        md:mx-8
        lg:mx-16
        xl:mx-32
        2xl:mx-64
        "
        >
          <div className="flex flex-col">
            <label className="my-2">Title</label>
            <input
              type="text"
              placeholder="Title..."
              name="title"
              onBlur={handleFormBlur}
              value={form.title}
              className={`w-full border-b-2 my-2 p-2  ${
                errors.title && "border-2 focus:border-danger border-danger"
              }
              `}
              onChange={(e) => handleChange(e)}
            />
            {errors.title && (
              <span className="text-danger text-sm my-1">{errors.title}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <textarea
              name="description"
              cols="30"
              rows="5"
              value={form.description}
              onBlur={handleFormBlur}
              placeholder="Type the project description..."
              className={`w-full border-b-2 my-2 p-2 ${
                errors.description &&
                "border-2 focus:border-danger border-danger"
              }`}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors.description && (
              <span className="text-danger text-sm my-1">
                {errors.description}
              </span>
            )}
          </div>
          <label className="my-2">Collaborators</label>
          <Select
            className="my-4"
            name="users"
            onChange={handleSelectUsers}
            isMulti
            options={options}
            value={form.users}
          />
          <Select
            className="my-4"
            name="visibility"
            onChange={(e) =>handleSelectVisibility(e)}
            options={options2}
            value={form.visibility}
          /> {errors.visibility && (
            <span className="text-danger text-sm my-1">
              {errors.visibility} <Link to={"/payment"}>Click here to subscribe.</Link>
            </span>
          )}
          <div className="flex flex-row sm:items-center">
            <CreatePdfFile ext={".pdf"} onBlur={handleFormBlur} form={form}/>
            {errors.pdf_file && (
              <span className="text-danger text-sm my-1">
                {errors.pdf_file}
              </span>
            )}
            <CreateFile ext={".dwg"} onBlur={handleFormBlur} form={form}/>
            {errors.project_file && (
              <span className="text-danger text-sm my-1">
                {errors.project_file}
              </span>
            )}
          </div>

          {form.title ||
          form.description ||
          form.pdf_file ||
          form.visibility ||
          form.project_file ? (
            <button
              onClick={(e) => handleMising(e)}
              type="submit"
              className="bg-gray-900 text-white w-full p-2 mt-8 mb-4 shadow-lg border 
                hover:bg-gray-800"
            >
              Create
              <FontAwesomeIcon icon={faPlus} className="text-white mx-2" />
            </button>
            
          ) : (
            <div></div>
          )}
          
        </div>

      </form>
      }
      <div className="hidden w-1/2 p-16 border-l-2 md:flex md:justify-center md:items-center md:text-5xl">
        <h1>If you can imagine, Arquihub helps you to make it.</h1>
      </div>
      {misingLabel && (
        <div
          id="toast-success"
          className="fixed bottom-0 right-0 z-30 flex items-center p-4 mb-4 w-full max-w-xs text-gray-900 bg-white rounded-lg shadow sm:mr-8"
          role="alert"
        >
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="red"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">
            {`You have to complete all fields.`}
          </div>
          <button
            onClick={() => setMisingLabel(false)}
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
{createdSuccessful && (
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
            Project created successfully
          </div>
          <button
            onClick={() => setCreatedSuccessful(false)}
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
  );
};

export default CreateProject;
