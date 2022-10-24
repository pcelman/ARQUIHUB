import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Select from "react-select";
import { getAllUsers, getUser } from "../../redux/slices/user/userActions";
import { clearResponsePost, createPost } from "../../redux/slices/post/postActions";
import infoTypePost from "../../api/projectTypeData";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { validationsForm } from "./validatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const userToken = JSON.parse(window.localStorage.getItem("token"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    project_type: "default",
    mts2: "",
    rooms: "0",
    year: "",
    bathrooms: "0",
    image: [],
    authors: [],
    additional_data: "",
    created_by: userToken ? userToken.userId : "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const {user} = useSelector(state=>state.user)
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  const Users = [...allUsers]
  const filterUsers = Users.filter(e=>!(!e.isPremium && e.posts.length>=3)&& e._id!==user._id)
const responsePost = useSelector(state=>state.post.response)
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
useEffect(()=>{
  if(responsePost._id){  
    navigate(`/postDetail/${responsePost._id}`);
  dispatch(clearResponsePost())
  dispatch(getUser(userToken.userId))}
},[responsePost])
  const options = filterUsers.map((e) => {
    return {
      value: e._id,
      label: e.nickname,
    };
  });
  const handleSelectAuthors = (value) => {
    setForm({
      ...form,
      authors: value,
    });
  };

  const options2 = infoTypePost?.map((e, index) => {
    return {
      id: index,
      value: e.value,
      label: e.name,
    };
  });
  const handleSelectType = ({ value }) => {
    setForm({
      ...form,
      project_type: value,
    });
  };
  const images = form.image.flat()?.map((element) => (
    <div key={element.public_id} className="flex justify-center">
      <div className="inline-block relative">
        <img src={element.url} style={{ width: "200px" }} alt="preview" />
        <button
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
          data-modal-toggle="authentication-modal"
          onClick={(e) => handleDelete(element, e)}
        >
          {" "}
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
    </div>
  ));

  const handleFormChange = (e) => {
    let regexNum = /^[0-9,-]+$/;
    const { name, value } = e.target;
    if (name === "rooms" || name === "bathrooms") {
      if (!regexNum.test(value)) {
        setForm({
          ...form,
          [name]: "",
        });
      } else {
        setForm({
          ...form,
          [name]: value,
        });
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleFormBlur = (e) => {
    handleFormChange(e);
    setErrors(validationsForm(form, e.target.name, errors));
  };
  const handleDelete = (element, e) => {
    e.preventDefault();
    let afterDelete = form.image
      .flat()
      .filter((e) => e.public_id !== element.public_id);
    setForm({
      ...form,
      ["image"]: afterDelete,
    });
  };
  const uploadImage = async (files) => {
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "Arquihub");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfcd64nhm/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setLoading(false);
    const cloudinary = { public_id: file.public_id, url: file.secure_url };
    return cloudinary;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const photos = [];
      acceptedFiles.map(async (e) => {
        const pedro = await uploadImage(e);
        photos.push(pedro);
        setForm({
          ...form,
          ["image"]: [...form.image, photos],
        });
      });
    },
  });

  const handleFormSubmit = async (files, e) => {
    e.preventDefault();
    const displayForm = form;
    const error = validationsForm(form)
    setErrors(validationsForm(form));
    if (Object.keys(error).length === 0) {
      dispatch(createPost(displayForm));
      setResponse(true);
      setForm({
        title: "",
        description: "",
        project_type: [],
        mts2: "",
        rooms: "",
        year: "",
        image: [],
        bathrooms: "",
        authors: [],
        additional_data: "",
      });
    }

  };
  if(!userToken){
    navigate("/home")
    return
  }
   if(user && !user.premium && user.posts.length>=3){
    navigate("/payment")
    return
  } 
  return (
    <div className="flex flex-row my-8">
      <form
        onSubmit={(e) => handleFormSubmit(files, e)}
        className="w-full md:w-1/2"
      >
        <div
          className="mx-4
        md:mx-8
        lg:mx-16
        xl:mx-32
        2xl:mx-64"
        >
          <label>Title</label>
          <input
            className={`w-full border-b-2 my-2 p-2  ${
              errors.title && "border-2 focus:border-danger border-danger"
            }
            `}
            type="text"
            name="title"
            placeholder="Title of the project..."
            onBlur={handleFormBlur}
            onChange={(e) => handleFormChange(e)}
            value={form.title}
          />
          {errors.title && (
            <span className="text-danger text-sm my-1 block">
              {errors.title}
            </span>
          )}

          <label>Description</label>

          <textarea
            className={`w-full border-b-2 my-2 p-2  ${
              errors.description && "border-2 focus:border-danger border-danger"
            }
            `}
            type="text"
            name="description"
            placeholder="Type a description..."
            onBlur={(e) => handleFormBlur(e)}
            onChange={(e) => handleFormChange(e)}
            value={form.description}
            requiredcols="30"
            rows="10"
          ></textarea>

          {errors.description && (
            <span className="text-danger text-sm my-1 block">
              {errors.description}
            </span>
          )}

          <label>mts2</label>
          <div className="flex flex-row">
            <input
              className={`w-full ${
                errors.mts2 && "border-2 focus:border-danger border-danger"
              }
            `}
              type="range"
              name="mts2"
              min="100"
              max="10000"
              step="10"
              onBlur={(e) => handleFormBlur(e)}
              onChange={(e) => handleFormChange(e)}
              value={form.mts2}
              required
            />
            <input
              type="text"
              placeholder={form.mts2}
              maxLength="5"
              className="w-16 mx-2"
              name="mts2"
              onBlur={(e) => handleFormBlur(e)}
              value={form.mts2}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          {errors.mts2 && (
            <span className="text-danger text-sm my-1 block">
              {errors.mts2}
            </span>
          )}
          <label>Project Type</label>
          <Select 
            className={`w-full my-2 ${
              errors.project_type &&
              "border-2 focus:border-danger border-danger"
            }
          `}
            // onBlur={handleFormBlur}
            onChange={handleSelectType}
            options={options2}
            value={form.project_type.value}
          />

          {errors.project_type && (
            <span className="text-danger text-sm my-1 block">
              {errors.project_type}
            </span>
          )}
          <div>
            <div className="">
              <label className="">Year</label>
              <input
                className={`w-full my-2 p-2 border-b-2  ${
                  errors.year && "border-2 focus:border-danger border-danger"
                }
              `}
                type="date"
                name="year"
                onBlur={handleFormBlur}
                onChange={handleFormChange}
                value={form.year}
              />
              {errors.year && (
                <span className="text-danger text-sm my-1 block">
                  {errors.year}
                </span>
              )}
              {(form.project_type === "Residential Architecture" ||
                form.project_type === "Interior Design") && (
                <div className="flex flex-row w-full">
                  <div className="w-full">
                    <label className="">Rooms</label>
                    <div className="flex flex-row">
                      <input
                        className={`w-full my-2 p-2 mr-2  ${
                          errors.rooms &&
                          "border-2 focus:border-danger border-danger"
                        }
                `}
                        type="range"
                        name="rooms"
                        min="1"
                        max="20"
                        placeholder="Amount..."
                        onBlur={handleFormBlur}
                        onChange={handleFormChange}
                        value={form.rooms}
                      />
                      <input
                        type="text"
                        placeholder={form.rooms}
                        maxLength="2"
                        className={`w-8 p-2 max-h-8 mx-1 ${
                          errors.rooms &&
                          "border-2 focus:border-danger border-danger"
                        }`}
                        name="rooms"
                        onBlur={(e) => handleFormBlur(e)}
                        value={form.rooms}
                        onChange={(e) => handleFormChange(e)}
                      />
                    </div>
                    {errors.rooms && (
                      <span className="text-danger text-sm my-1 block">
                        {errors.rooms}
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="">Bathrooms</label>
                    <div className="flex flex-row">
                      <input
                        className={`w-full my-2 p-2 mr-2 ${
                          errors.bathrooms &&
                          "border-2 focus:border-danger border-danger"
                        }
                `}
                        type="range"
                        min="1"
                        max="10"
                        name="bathrooms"
                        placeholder="Amount..."
                        onBlur={handleFormBlur}
                        onChange={handleFormChange}
                        value={form.bathrooms}
                      />
                      <input
                        type="text"
                        placeholder={form.bathrooms}
                        maxLength="2"
                        className={`w-8 p-2 max-h-8 mx-1 ${
                          errors.bathrooms &&
                          "border-2 focus:border-danger border-danger"
                        }`}
                        name="bathrooms"
                        onBlur={(e) => handleFormBlur(e)}
                        value={form.bathrooms}
                        onChange={(e) => handleFormChange(e)}
                      />
                    </div>

                    {errors.bathrooms && (
                      <span className="text-danger text-sm my-1 block">
                        {errors.bathrooms}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="my-2">Collaborators:</div>
          <Select
            className="w-full my-2"
            // onBlur={handleFormBlur}
            onChange={handleSelectAuthors}
            isMulti
            options={options}
            value={form.authors}
          />
          <div className="">Images</div>
          <div {...getRootProps()} className="border my-4">
            <input {...getInputProps()} />
            <div className="w-62 h-40 bg-white mt-6  ">
              <div className=" text-center pt-6">Drop your files here </div>
              <div className=" text-center pt-6">
                {" "}
                or click to choose from your folders
              </div>
              <div className="grid grid-cols-3">
                <div className="   text-center py-1 w-50% "> </div>

                <div className=" bg-slate-200   text-center mt-2 py-1 w-50% ">
                  {" "}
                  +
                </div>
                <div className="   text-center py-1 w-50% "> </div>
              </div>
            </div>
          </div>
          <div className="w-full my-4">{images}</div>

          <div className="">Additional Data</div>

          <textarea
            className="w-full my-2 border-b-2"
            type="text"
            name="additional_data"
            placeholder="Type additional data"
            onBlur={(e) => handleFormBlur(e)}
            onChange={(e) => handleFormChange(e)}
            value={form.additional_data}
            requiredcols="30"
            rows="2"
          ></textarea>
          <button
            className="bg-gray-900 text-white w-full p-2 mt-8 mb-4 shadow-lg border 
            hover:bg-gray-800"
            id="send"
            type="submit"
            disabled={Object.keys(errors).length !== 0}
          >
            Create
            <FontAwesomeIcon icon={faPlus} className="text-white mx-2" />
          </button>
        </div>
      </form>
      <div className="hidden w-1/2 p-16 border-l-2 md:flex md:justify-center md:items-center md:text-5xl">
        <h1>If you can imagine, Arquihub helps you to make it.</h1>
      </div>
    </div>
  );
};


export default CreatePost;
