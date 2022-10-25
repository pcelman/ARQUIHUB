import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/user/userActions";
import { updateUser } from "../../redux/slices/user/userActions";
import UserItem from "./UserItem";

function Users() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  // const notAdmins = allUsers.filter((user)=> user.type !== "admin")
  const [currentPage, setCurrentPage]= useState(0)
  const [search, setSearch]= useState("")



  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(getAllUsers());
  //   }, [handleClick]);

  const usersInPage = ()=>{
    if(currentPage === 0 && search.length === 0 )return allUsers.slice(currentPage, currentPage+12)
    let filteredUsers = allUsers.filter(user => user.email.toLowerCase().includes(search.toLowerCase()))

    if(currentPage === 0){
      // console.log(filteredUsers);
      return filteredUsers.slice(currentPage, currentPage+12)
    }
    // console.log(filteredUsers);
    return filteredUsers.slice(currentPage, currentPage+12)
  }

  const nextPage =(e)=>{
    if(allUsers.filter(user=>user.email.includes(search)).length> currentPage+12){
      setCurrentPage(currentPage+12)
    }
  }
  const prevPage =(e)=>{
    if(currentPage > 0 ){
      setCurrentPage(currentPage-12)
    }
  }
  

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(0)
}


  //  console.log(usersInPage());
  function handleChangeStatus(id, e) {
    dispatch(updateUser(id, { status: e.target.value }));
  }

  //   function handleClick(e) {
  //     if (e.show === true) {
  //       e.show = false;
  //       console.log("e.show: ", e.show);
  //       console.log("nombre: ", e.name);
  //       return;
  //     }

  //     if (e.show === false) {
  //       e.show = true;
  //       console.log("e.show: ", e.show);
  //       console.log("e.nombre: ", e.name);
  //       return;
  //     }
  //   }
        // console.log(allUsers)

  return (
    <div className="">
      {/* ----------------pantallas LARGE------------------- */}
      <div className="lg:block hidden mx-16 xl:mx-32 2xl:mx-32">
      <input className='w-full text-center border-b-2' onChange={handleSearch} placeholder="Search users..." name='searchBar' />

        <div className=" grid grid-cols-6 mt-6 gap-6  font-bold">
          <h2>Member</h2>
          <h2>email</h2>
          <h2>Posts</h2>
          <h2>Proyects</h2>
          <h2>Type</h2>
          <h2>Status</h2>
        </div>
        
        {
          usersInPage()?.map((el) => {
            const statusUser = el.status;
            const statusOptions = [];
            statusUser === "active" && statusOptions.push("banned", "inactive");
            statusUser === "banned" && statusOptions.push("active", "inactive");
            statusUser === "inactive" && statusOptions.push("banned", "active");

            return (
              <div>
                <div className="grid grid-cols-6  mt-6 gap-4">
                  {el.nickname ? (
                    <h2 className="font-bold">{el.nickname.split("@").shift()} </h2>
                  ) : (
                    <p className="font-bold">{el.email.split("@").shift()}</p>
                  )}
                  <div className="truncate">{el.email}</div>
                  <div>{el.posts.length}</div>
                  <div>{el.projects.length === 0 ? 0 : el.projects.length}</div>
                  <div>{el.type}</div>

                  <select
                    className="bg-slate-200 text-center"
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
            );
          })}
      </div>

      {/* ----------------pantallas MEDIUM------------------- */}

      <div className="lg:hidden md:block hidden mx-8">
        <div className=" grid grid-cols-3 sm:grid-cols-6 mt-6 gap-6  font-bold">
          <h2>Members</h2>
          <h2>Mail</h2>
          <h2>Posts</h2>
          <h2>Proyects</h2>
          <h2>Type</h2>
          <h2>Status</h2>
        </div>

        { usersInPage[0]&&
          usersInPage()?.map((el) => {
            const statusUser = el.status;
            const statusOptions = [];
            statusUser === "active" && statusOptions.push("banned", "inactive");
            statusUser === "banned" && statusOptions.push("active", "inactive");
            statusUser === "inactive" && statusOptions.push("banned", "active");

            return (
              <div>
                <div className="grid grid-cols-3 sm:grid-cols-6  mt-6 gap-4">
                  {/* <h1>{el._id}</h1> */}

                  {el.name ? (
                    <h2 className="font-bold">{el.name} </h2>
                  ) : (
                    <p className="text-slate-300">Member</p>
                  )}
                  <h2 className="truncate">{el.email}</h2>
                  <h2>{el.posts.length}</h2>
                  <h2>{el.projects.length === 0 ? 0 : el.projects.length}</h2>
                  <h2>{el.type}</h2>

                  <select
                    className="bg-slate-200 "
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
            );
          })}
      </div>

      {/* ---------esta es la parte SMALL---------- */}

      <div className="block md:hidden mx-4">
        <div className="grid grid-cols-2  font-bold ">
          <h2>Members</h2>
          <h2>Mail</h2>
        </div>
        {usersInPage()?.map((el) => {
            // const statusUser = el.status;

            // const newEl = { ...el, show: false };
            // const statusOptions = [];
            // statusUser === "active" && statusOptions.push("banned", "inactive");
            // statusUser === "banned" && statusOptions.push("active", "inactive");
            // statusUser === "inactive" && statusOptions.push("banned", "active");

            return (
              <div>
                <UserItem el={el} handleChangeStatus={handleChangeStatus} />
              </div>
            );
          })}
      </div>

      <div className="flex flex-row space-x-8 w-50% flex justify-center self-center pt-8">

        <button className="btn	bg-gray-800 h-10	w-40 text-gray-200	" disabled={currentPage == 0} onClick={prevPage}> ← Prev Page</button>
        {/* <button className="flex  justify-center pt-10 pl-10 bg-gray-200 w-fit h-fit font-bold align-middle	 text-center	" onClick={prevPage}> ← Prev Page</button> */}

        <button className="btn bg-gray-800 h-10	w-40 text-gray-200	" onClick={nextPage}>Next Page →</button>
        {/* <button className="flex   justify-center pt-10 pr-10 bg-gray-200 w-fit h-fit font-bold align-middle	 text-center	" onClick={nextPage}>Next Page →</button> */}
      </div>

</div>
   
  );
}

export default Users;
