import { useEffect, useState } from "react";
import Users from "./Users";
import ChartUsers from "./ChartUsers";
import ChartPayments from "./ChartPayments";
import RecentsUsers from "./RecentsUsers";
import { useDispatch, useSelector } from "react-redux";
import Unauthorized from "../errors/Unauthorized";
import { getUser } from "../../redux/slices/user/userActions";

function DashBoard() {
  const dispatch = useDispatch()
  const [state, setState] = useState("dashboard");
  function handleChange(e) {
    setState(e.target.value);
  }
  const user = useSelector((state)=> state.user.user)
  const token = JSON.parse(localStorage.getItem("token"))
  let {userId} = token
  
  useEffect(()=>{
    dispatch(getUser(userId))
  },[dispatch, user, userId])
  
  // console.log(user);


  return (
    // <div className="sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div className=" flex flex-row">
      
      <aside className="w-fit  h-screen bg-gray-50	p-3 border-r-4" aria-label="Sidebar">
       

      <div className="flex flex-col order-2 items-center gap-9 my-5 justify-center select-none ">
       {user ? 
      <div className="flex flex-row items-center gap-4 text-sm">
        <img className="object-cover rounded-full w-10 h-10 sm:w-10 sm:h-10 xl:w-10 xl:h-10" src={user.avatar} alt="userImg"/>
        <div className="lex flex-column items-center gap-4">
          <h3 className="font-semibold text-xs">{user.name? user.name : user.nickname}</h3>
          <p className="text-xs">{user.email}</p>
        </div>
      </div>
      :
      <div>
        <Unauthorized/>
      </div> 
      }
        <ul>
          <li className="">
            <button
              className=" tracking-wider text-lg hover:border-l-4  focus:border-l-4 pl-2"
              value="dashboard"
              onClick={(e) => handleChange(e)}
            >
              DashBoard
            </button>

          </li>
          <li>
            <button
              className="tracking-wider text-lg   hover:border-l-4  focus:border-l-4 pl-2"
              value="users"
              onClick={(e) => handleChange(e)}
            >
              Users
            </button>
          </li>
        </ul>
      </div>
        </aside>

      <div className="flex justify-center	items-start w-3/4">
        {state === "dashboard" && (
          <div>
            <div className="flex flex-row pt-12	">
            <ChartUsers />
            <ChartPayments />
            </div>
            <div className="">
            {/* <div className=" flex justify-center	items-center"> */}
            <RecentsUsers />
            </div>
          </div>
        )}
        {state === "users" && <Users />}
      </div>

    </div>
  );
}

export default DashBoard;
