import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearResponseUser, getUser, getViewUser } from "../../redux/slices/user/userActions";
import FormEditProfile from "./FormEditProfile";
import Post from "./Post";
import Projects from "./Projects";
import { getAllPosts } from "../../redux/slices/post/postActions";
import Favourites from "./Favourites";
import Reviews from "./Reviews";
import { getAllReviews } from "../../redux/slices/review/reviewActions";
import { Link, useParams } from "react-router-dom";
import Profile from "./Profile";
import { useLocation } from "react-router-dom";

export default function DashBoardUser(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const a = useParams();
  
  const userLogeado = JSON.parse(localStorage.getItem("token"));
  const [state, setState] = useState("Posts");
  const [profile, setProfile] = useState(false);
  const user = useSelector((state) => state.user.viewUser);
  let location = useLocation()
  let locationState = location.state
  
  console.log(locationState);

  useEffect(() => {
    dispatch(getViewUser(id));
    if(locationState === "Posts"){
      setState(locationState)
    }
    if(locationState === "Projects"){
      setState(locationState)
    }else{
      setState("Posts")
    }
    return()=>{
      dispatch(clearResponseUser())
  }}
  , [dispatch,id, locationState]);



  function handleChange(e) {
    setState(e.target.value);
  }
  function handleEditProfile(e) {
    profile ? setProfile(false) : setProfile(true);
  }

  return (
    <div
      className="m-4
    md:mx-8
    lg:mx-16
    xl:mx-32
    2xl:mx-64"
    >
      <div className="flex flex-col">
        {/* <div className="w-1/2 mx-auto mt-6"> */}
        {profile ? (
          <div>
            <div>
              <FormEditProfile id={id}/>
            </div>
          </div>
        ) : (
          <div className="">
            <div>
              <Profile
                state={state}
                user={user}
                handleChange={handleChange}
                handleEditProfile={handleEditProfile}
                // id={{ id: userLogeado.userId }}
                id={id}
              />
            </div>
          </div>
        )}
        <div>
          <div className="divide-x">
            <div className="flex flex-row justify-between gap-4 mt-16 w-full overflow-hidden overflow-x-auto">
              <div className="">
                <input
                  value="Projects"
                  type="button"
                  className={`focus:border-b-2 tracking-wider text-lg hover:border-b-2  border-gray-400`}
                  onClick={(e) => handleChange(e)}
                />
              </div>
              <div className="">
                <input
                  value="Posts"
                  type="button"
                  className={`focus:border-b-2 tracking-wider text-lg hover:border-b-2  border-gray-400`}
                  onClick={(e) => handleChange(e)}
                />
              </div>

              <div className="">
                <input
                  value="Reviews"
                  type="button"
                  className={`focus:border-b-2 tracking-wider text-lg hover:border-b-2  border-gray-400`}
                  onClick={(e) => handleChange(e)}
                />
              </div>

              <div className="">
              <input
                  value="Favourites"
                  type="button"
                  className={`focus:border-b-2 tracking-wider text-lg hover:border-b-2  border-gray-400`}
                  onClick={(e) => handleChange(e)}
                />
              </div>
            {user.length!==0 && userLogeado && userLogeado.userId==user._id && user.premium ? <div className="">
                <Link to={"/cancelSubscription"}>
                  <button>Cancel Subscription </button>
                </Link>
              </div>:<></>}
            </div>
            <hr className="mt-2" />
          </div>
          <div>
            {state === "Projects" &&
              (user.length !== 0 && user.projects.length ? (
                <div>
                  <Projects id={id} />
                </div>
              ) : (
                <div className="box-content  h-72 p-7 mt-5 mb-12 bg-slate-100 flex flex-col justify-center items-center">
                  {user.length!==0 && userLogeado && userLogeado.userId==user._id ?<><p className=" text-base text-center  text-gray-500">
                    You have no project created ? make a new one.
                  </p>
                  <Link to={"/createproject"}>
                    <button className="bg-green-600 text-white px-6 mt-6">
                      New
                    </button>
                  </Link></>:<p className=" text-base text-center text-gray-400">
                  The user doesn´t has any project.
                  </p>}
                </div>
              ))}
            {state === "Posts" &&
              (user.length !== 0 && user.posts.length ? (
                <div>
                  <Post id={id} key={id} user={user} />
                </div>
              ) : (
                <div className="box-content  h-72 p-7 mt-5 mb-12 bg-slate-100 flex flex-col justify-center items-center">
                  {user.length!==0 && userLogeado && userLogeado.userId==user._id ?<><p className=" text-base text-center text-gray-400">
                    You have no posts created ? make a new one.
                  </p>
                  <Link to={"/createpost"}>
                    <button className="bg-green-600 text-white px-6 mt-6">
                      New
                    </button>
                  </Link></>:<p className=" text-base text-center text-gray-400">
                    The user doesn´t has any post.
                  </p>}
                </div>
              ))}
            {state === "Reviews" &&
              (user.length !== 0 && user.reviews.length ? (
                <div>
                  <Reviews />
                </div>
              ) : (
                <div className="box-content  h-72 p-7 mt-5 mb-12 bg-slate-100 flex flex-col justify-center items-center text-center">
                  <p className=" text-base text-center text-gray-400">
                  {user.length!==0 && userLogeado && userLogeado.userId==user._id ?"You don´t have any reviews yet.":"the user doesn´t has any reviews yet"}</p>
                </div>
              ))}
            {state === "Favourites" &&
              (user.length !== 0 && user.reviews.length ? (
                <div>
                  <Favourites />
                </div>
              ) : (
                <div className="box-content  h-72 p-7 mt-5 mb-12 bg-slate-100 flex flex-col justify-center items-center">
                  <p className=" text-base text-center text-gray-400">
                    {user.length!==0 && userLogeado && userLogeado.userId==user._id ?"You don´t have any favourite posts yet.":"the user doesn´t has any favourite posts yet"}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
