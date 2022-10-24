import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, logOutUser } from "../../../redux/slices/auth/loginActions";
import { getUser } from "../../../redux/slices/user/userActions";
import AvatarUser from "../../avatarUser/AvatarUser";

function LoggedWhite() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [projectMenu, setProjectMenu] = useState(false);
  const [createMenu, setCreateMenu] = useState(false)
  const {user} = useSelector(state => state.user)
  const btnRef = useRef();
  const dispatch = useDispatch()
  const datas = { projects:"Projects", posts:"Posts"}
  const userUrl = `user/${user._id}`


  const handleLogout =  (e) => {
    dispatch(logOutUser())
    localStorage.removeItem("googleUser")
    dispatch(clearUser({}))
    window.location.reload()
  }
  useEffect(()=> {
    const closeDropDown = e => {
      const found = e.composedPath().find(e => e.id === "btnCreateMenu")
      if(found !== btnRef.current) setCreateMenu(false)
    }
    document.body.addEventListener('click', closeDropDown)
    return () => document.body.removeEventListener('click', closeDropDown)
  })

  useEffect(()=>{
    const google = async () =>{
      try {
        const googleUser = await JSON.parse(localStorage.getItem('googleUser'))
        const token = await JSON.parse(localStorage.getItem('token'))
        dispatch(getUser(token.userId))
      } catch (error) {
        console.log(error)
      }
    }
    google()
  },[dispatch])

  if(!user._id) {
    return (
      <div className="flex items-center gap-4 animate-pulse">
        <div className="flex order-2 items-center justify-center w-8 h-8 overflow-hidden rounded-full 
        sm:w-9 sm:h-9
        lg:w-11 lg:h-11
        xl:w-12 xl:h-12
        ">
          <div className="w-full h-full bg-slate-200 "></div>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1">
          <div className="w-24 right-0 h-4 bg-slate-300"></div>
          <div className="w-32 h-4 bg-slate-200"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row gap-8 items-center">
      <div className="hidden lg:inline-block relative p-4">
        <button id="btnCreateMenu" ref={btnRef} onClick={() => setCreateMenu(!createMenu)}  className={`flex text-white hover:text-gray-500 border p-1 rounded-md lg:hover:bg-gray-100 ${createMenu && "bg-gray-100 border-b-gray-100 rounded-b-none"} text-sm`}  >
          <FontAwesomeIcon className="px-1 cursor-pointer" icon={faPlus}/>
          <FontAwesomeIcon className="px-1 cursor-pointer" icon={createMenu ? faAngleUp : faAngleDown}/>
        </button>
        <div className={`absolute ${createMenu ? "flex" : "hidden"} flex-col gap-2 bg-gray-100 w-36 rounded-tl-none shadow-md`}>
          <Link to="/createpost" className="hover:bg-gray-200 py-1 px-2">New Post</Link>
          <Link to="/createproject" className="hover:bg-gray-200 py-1 px-2">New Project</Link>
        </div>
      </div>
      <div
      title="Open menu"
      onClick={() => [setShowSidebar(!showSidebar), setCreateMenu(false)]}
      className="cursor-pointer flex items-center gap-4" 
    >
      <div className="flex order-2 items-center justify-center select-none">
        <AvatarUser img={user.avatar} className="w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14"/>
      </div>
      <div className="hidden sm:flex flex-col text-end">
        <p className="text-sm lg:text-base font-medium text-white">{user.nickname}</p>
        <p className="text-xs lg:text-sm text-white">{user.email}</p>
      </div>
    </div> 
      {showSidebar && <div onClick={()=> setShowSidebar(!showSidebar)} className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50"></div>}
      <div
        className={`top-0 right-0 fixed bg-gray-100 w-11/12 h-full text-center  ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-500
      sm:w-1/2
      md:w-[45vw]
      lg:w-[35vw]
      xl:w-[30vw]
      2xl:w-[20vw]
      `}
      >
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="z-30 absolute left-0 m-2 py-1 px-2 text-2xl text-gray-400 hover:bg-gray-200 rounded"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className={`flex flex-col justify-between h-full`}>
          <div>
            <div className="flex items-center justify-center rounded-full m-auto mt-4">
              <AvatarUser img={user.avatar} action={true} className="w-20 h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 cursor-pointer"/>
            </div>
            <div className="my-4">
              <h3 className="text-xl">{user.nickname}</h3>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <div className="text-start pl-4 mt-8 flex flex-col gap-4 lg:text-lg xl:text-xl">
              <div className="flex flex-col items-start lg:hidden">
                <div onClick={() => setCreateMenu(!createMenu)}>
                  <span className="pr-2">Create</span>
                  <FontAwesomeIcon className="text-gray-600" icon={faAngleDown} />
               </div>
                {createMenu && <div className="pl-4 w-auto text-gray-600 text-sm flex flex-col gap-2">
                  <Link onClick={() => setShowSidebar(!showSidebar)} to="/createpost">New post</Link>
                  <Link onClick={() => setShowSidebar(!showSidebar)} to="/createproject">New project</Link>
                </div>}
              </div>
              {user.type === "admin" &&
                <div>
                  <Link onClick={() => setShowSidebar(!showSidebar)} className="hover:text-gray-400" to={`/admin`}>Dashboard admin</Link>
                </div>
              }
              <div>
                <Link onClick={() => setShowSidebar(!showSidebar)} className="hover:text-gray-400" to={`/user/${user._id}`}>My profile</Link>
              </div>
              <div>
                <Link onClick={() => setShowSidebar(!showSidebar)} className="hover:text-gray-400"  to={userUrl} state={datas.posts}>My posts</Link>
              </div>
              <div>
                <Link onClick={() => setShowSidebar(!showSidebar)} className="hover:text-gray-400" to={userUrl} state={datas.projects}>My projects</Link>
              </div>
              <div>
                <div className="cursor-pointer hover:text-gray-400" onClick={() => setProjectMenu(!projectMenu)}>
                  <span className="pr-2">Recent projects</span>
                  <FontAwesomeIcon  className="text-gray-600" icon={faAngleDown} />
                </div>
                {projectMenu && <div className="pl-4 mt-1 w-auto text-gray-600 text-sm flex flex-col gap-2">
                  {user.projects.length === 0 
                  ? <div>
                    <p>You don't have projects!</p>
                    <p className="hover:underline"><Link onClick={() => setShowSidebar(!showSidebar)} className="hover:text-gray-400" to="/createproject">Create now</Link></p>
                    </div>
                  : user.projects.map((e, i) => (
                      <Link onClick={() => setShowSidebar(!showSidebar)} className="hover:text-gray-400" key={i} to="">{e.name}</Link>
                  ))}
                </div>}
              </div>
              <div>
                <Link onClick={() => setShowSidebar(!showSidebar)} className="hover:text-gray-400" to="/user/favourites">My favourites</Link>
              </div>
            </div>
          </div>
          <div>
          {!user.premium  ? <div className="m-4 px-4 py-2 bg-blue-600 text-gray-50 cursor-pointer">
              <button onClick={()=> setShowSidebar(false)} className="font-semibold"><Link to="/payment">Upgrade to Premium </Link></button>
            </div>:<></>}
            <div onClick={handleLogout} className="m-4 px-4 py-2 bg-gray-600 text-gray-50 cursor-pointer">
              <button className="font-semibold">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoggedWhite;
