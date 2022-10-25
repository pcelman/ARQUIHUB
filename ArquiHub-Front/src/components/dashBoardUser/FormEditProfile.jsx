import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/user/userActions";
import UploadPhotos from "./UploadPhotos";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
export default function FormEditProfile({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.viewUser);
  const [state, setState] = useState({
    nickname: user.nickname,
    description: user.description,
    location: user.location,
    job: user.job,
    page: user.page,
  });
  const [files, setFiles] = useState([]);
  console.log("state: ", state);
  console.log(files);

  let image = "";

  const [isHovering, setIsHoverig] = useState(false);
  const {response} = useSelector(state=> state.user)
  function handleMouseEnter() {
    setIsHoverig(true);
  }
  function handleMouseLeave() {
    setIsHoverig(false);
  }
  function textClass() {
    return `absolute top-10 left-5 w-100% h-100% text-white flex flex-col content-center text-center justify-self-center ${
      isHovering ? "" : "hidden"
    }`;
  }
  const flatFile = files.flat();
  console.log(flatFile);

  function handleChange(e) {
    console.log(state);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const uploadImage = async (flatFile, e) => {
    // e.preventDefault();
    const data = new FormData();
    console.log(flatFile);
    data.append("file", flatFile);
    data.append("upload_preset", "Arquihub");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfcd64nhm/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    return file.secure_url;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
      acceptedFiles.map(async (e) => {
        const fileImage = await uploadImage(e);
        setState({
          ...state,
          ["avatar"]: fileImage,
        });
      });
    },
  });

  useEffect(()=>{

  },[response])
  async function handleEditPerfil(e) {
    /* e.preventDefault() */
    dispatch(updateUser(id, state));
  }
  if(response._id) window.location.reload() 
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center gap-8 mb-2 w-full">
        <div {...getRootProps()} className="relative">
          <input {...getInputProps()} />
          <div className="relative">
            <img
              src={files[0] ? files[files.length - 1][0].preview : user.avatar}
              width="256px"
              height="256px"
              className="xl:w-full xl:h-full border object-cover rounded-full mt-16 opacity-50"
            />
            {/* <img
              // src={`${user.avatar}`}
            
              src={files[0] ? files[files.length - 1][0].preview : user.avatar}
              className="rounded-full mt-16 opacity-50"
            /> */}
          </div>
          <div className="absolute bottom-20 left-12">
            <div className="  font-bold ">drop image here</div>
          </div>
        </div>
        <div className="flex justify-center flex-col text-center">
          <div className="font-bold text-lg capitalize mt-12">
            {user.name} {user.lastname}
          </div>
          <input
            className="p-1"
            placeholder="Nickname"
            name="nickname"
            value={state.nickname}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            className="p-1"
            placeholder="description"
            name="description"
            value={state.description}
            // value={state.description}
            onChange={(e) => handleChange(e)}
          ></input>
          <div className="flex flex-row my-3">
            <div className="pr-4">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>

            <input
              className="px-2"
              placeholder={state.location ? state.location : "Location"}
              name="location"
              value={state.location}
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="flex flex-row my-3">
            <div className="pr-4">
              <FontAwesomeIcon icon={faBuilding} />
            </div>
            <input
              className="px-2"
              placeholder="Job Title"
              value={state.job}
              name="job"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <div className="flex flex-row my-3">
            <div className="pr-4">
              <FontAwesomeIcon icon={faLink} />
            </div>

            <input
              className="px-2"
              placeholder="Webpage"
              value={state.page}
              name="page"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>

          <button
            className="bg-slate-300 cursor-pointer w-32 h-8 mt-6"
            onClick={(e) => handleEditPerfil(e)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
