import React from "react";
import { getUser } from "../../redux/slices/user/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "../../redux/slices/project/projectActions";
import VisualizePDFDash from "../dashBoardUser/VisualizePDFDash";

export default function Projects(id) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.viewUser);
  const projects = useSelector((state) => state.project.allProjects);
  const projectsUser = projects.filter((project) => project.created_by === id);
  const [search, setSearch] = useState("");

/*   useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]); */

  function handleSearch(e) {
    e.preventDefault();
    const projectsSearch = user.projects.filter((project) =>
      project.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    projectsSearch.length ? setSearch(projectsSearch) : setSearch("not found");
  }

  //     const [page, setPage] = useState(1);
  //     const indexLastCard = 3 * page;
  //     const currentCards =posts.slice(0, indexLastCard) /* condition
  //       ? post.slice(0, indexLastCard)
  //       : posts.slice(0, indexLastCard);
  //    */
  //     function paginado() {
  //       setPage(page + 1);
  //     }
  return (
    <div>
      {user.length ? (
        <div className="flex flex-row">
          <div>
            <label>Search </label>
            <input type="text" onChange={(e) => handleSearch(e)} />
          </div>
          <div className="flex items-end">
            <Link to={"/createproject"}>
              <button className="bg-green-600 text-white px-6 m-2 ">New</button>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {search === "not found" ? (
        <div>
          <p>there are no matches with your search</p>
        </div>
      ) : search.length ? (
        search.map((project) => {
          return (
            <div className="flex flex-col-3">
              <div>
                <VisualizePDFDash url={""}/>
                <h3 className="text-base font-semibold">{project.title}</h3>
                <p className="text-base truncate">
                  {project.description.slice(0, 50)}
                </p>
              </div>
            </div>
          );
        })
      ) : user.projects.length ? (
        user.projects.map((project) => {
          return (
            <div className="flex flex-col-3"> 
              <div>
                {project.pdf_file &&<VisualizePDFDash url={project.pdf_file.url}/>}
                <div className="text-base font-semibold">{project.title}</div>
                <p className="text-base truncate">
                  {project.description.slice(0, 50)}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="box-content  h-72 p-7 mt-5 mb-12 bg-slate-100 flex flex-col justify-center items-center">
          <p className=" text-base">you have no projects created</p>
          <Link to={"/createproject"}>
            <button className="bg-green-600 text-white px-6 mt-6">New</button>
          </Link>
        </div>
      )}
        </div>

    //     <div >
    //     <div className="font-bold text-lg capitalize mt-12">Favourites</div>
    // <h4 className="ml-6 mb-6 font-semibold font-size:26px">News</h4>
    // <div className="container mx-auto margin-top: 16px">
    //   <div className="grid grid-cols-1 sm:grid-cols-3 gap-9">
    //     {newsPaginado.map((e,index) => (
    //       <Link key={index} to={`/newsDetail/${e.id}`}>
    //         <div>
    //           {e.id === 2 ? (
    //             <img
    //               src="https://res.cloudinary.com/do3dbemlj/image/upload/v1664405309/news/Screen_Shot_2022-09-28_at_19.44.45_zocf1r.png"
    //               className="w-full aspect-[3/2]"
    //               alt=""
    //             />
    //           ) : (
    //             <img
    //               src={e.image}
    //               width="600px"
    //               alt="news"
    //               className="w-full aspect-[3/2]"
    //             />
    //           )}
    //           <div className="text-gray-400 mt-6">{e.date}</div>
    //           <p className="font-semibold truncate text-transform: uppercase ">
    //             {e.title}
    //           </p>
    //           <div className="font-light truncate" >{e.description}</div>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    // <div
    //   className="mr-8 text-xl my-9 font-semibold flex flex-row-reverse cursor-pointer"
    //   onClick={(e) => paginado(e)}
    // >
    //   See more...
    // </div>
    // </div>
  );
}
