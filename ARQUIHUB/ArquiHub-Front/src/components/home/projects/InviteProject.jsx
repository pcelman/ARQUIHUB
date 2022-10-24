import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProject } from "../../../redux/slices/project/projectActions";
import { getUser } from "../../../redux/slices/user/userActions";
import { updateUserProject } from "../../../redux/slices/userProject/userProjectActions";
import Unauthorized from "../../errors/Unauthorized";
import { NavLink } from "react-router-dom";

function InviteProject() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  // const user = JSON.parse(localStorage.getItem("token"));
  // let { userId } = user;
  const user = useSelector((state) => state.user.user);
  const project = useSelector((state) => state.project.project);
  const [invite, setInvite] = useState(null);
  
  // console.log(logged._id);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUser(user._id));
    dispatch(getProject(projectId));
  }, [dispatch, projectId, user._id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (invite === true) {
      const objetonto = { user_id: user._id };
      dispatch(updateUserProject(projectId, objetonto));
      alert("Now you are part of the project");
      navigate("/home");
    } else {
      alert("return");
      navigate("/home");
    }
  };
  if(user && !user.isPremium && user.length!==0 && user.projects.length>=3){
    navigate("/payment")
    return
  } 
  return (
    <div>
      {!user._id ? (
        <div>
          <Unauthorized />
        </div>
      ) : (
        <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64">
          <div className="text-center flex flex-col  justify-center items-center">
            <div className="xl:text-lg flex flex-col gap-4">
              <span className="font-semibold">{`${user.nickname}`}</span> You
              have been invited to project:{" "}
              <span className="font-semibold"> {project.title} </span>
            </div>
            <h1 className="text-2xl">Do you want to participate?</h1>
            <div
              className="w-full mx-auto flex flex-col gap-3 mt-8 md:w-3/4
                lg:w-3/4 rounded-xl lg:p-4 lg:py-8 lg:gap-4
                xl:w-1/2"
            >
              <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <button
                  className="w-full p-2 text-white bg-green-600 lg:hover:bg-green-700 transition-all duration-200 ease-in text-center cursor-pointer lg:w-3/4 mx-auto xl:w-1/2"
                  type="submit"
                  onClick={(e) => setInvite(true)}
                  value={true}
                  name="yes"
                >
                  Accept
                </button>
                <div className="flex flex-row items-center justify-center my-4">
                  <div className="bg-gray-100 border-b w-1/2 max-h-px lg:w-1/4 xl:w-1/8 2xl:w-1/16"></div>
                  <div className="w-1/2 md:w-1/4 lg:w-1/8">
                    <p>or</p>
                  </div>
                  <div className="bg-gray-100 border-b w-1/2 max-h-px lg:w-1/4 xl:w-1/8 2xl:w-1/16"></div>
                </div>
                <button
                  className="w-full p-2 text-white bg-gray-600 lg:hover:bg-gray-700 transition-all duration-200 ease-in text-center cursor-pointer lg:w-3/4 mx-auto"
                  type="submit"
                  onClick={(e) => setInvite(false)}
                  value={false}
                  name="yes"
                >
                  Decline
                </button>
                <span className="mt-4">Do you want to go home?</span>{" "}
                <span className="text-blue-500 mb-8 cursor-pointer hover:underline">
                  <NavLink to="/home"> Click here</NavLink>
                </span>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InviteProject;
