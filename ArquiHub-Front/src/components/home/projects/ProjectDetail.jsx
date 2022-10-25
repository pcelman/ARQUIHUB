import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearResponseProject, getProject } from "../../../redux/slices/project/projectActions";
import { getUser } from "../../../redux/slices/user/userActions";
import Loader from "../../loader/Loader";
import UpdateDetail from "./update/UpdateDetail";
import UpdateDetailCollab from "./update/UpdateDetailCollab";
import ProjectFile from "./files/ProjectFile";
import CreateUpdate from "./forms/CreateUpdate";
import VisualizePDF from "./VisualizePDF";
import AvatarUser from "../../avatarUser/AvatarUser";

const ProjectDetail = () => {
  const response = useSelector((state) => state.update.response);
  const responseDownload = useSelector((state) => state.download.response);
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.project);
  const allData =
    project.length !== 0 ? [...project.updates, ...project.downloads] : [];
  const sortData =
    allData.length !== 0 &&
    allData.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
    );
  useEffect(() => {
    dispatch(getProject(id));
    return()=>{
      dispatch(clearResponseProject())
    }
  }, [dispatch, response, responseDownload,id]);
  return (
    <div>
      <div
        className="m-4
      md:mx-8
      lg:mx-16
      xl:mx-32
      2xl:mx-64
      "
      >
        {project.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <div>
            <div>
              <div>
                <VisualizePDF
                  url={project && project.pdf_initial_file[0].url}
                />
              </div>
              <div
                className="flex w-auto h-auto justify-center item-start flex-col 
                    md:w-auto lg:border lg:p-4"
              >
                <h1 className="text-xl font-bold">{project.title}</h1>
                <h2 className="font-medium">{project.description}</h2>
                <p className="my-2">Collaborators</p>
                <div className="flex flex-col md:flex-row">
                  {project.users?.map((user) => {
                    return (
                      <div>
                        <Link to={`/user/${user._id}`}>
                          <div
                            className="flex w-full items-center my-2 border shadow-md
                            md:w-fit md:pr-2
                            "
                          >
                    <AvatarUser img={user.avatar} className="w-16 h-16 p-2" ></AvatarUser>
                            <p className="">{user.nickname}</p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                {project.initial_file?.map((file) => {
                  return <ProjectFile file={file} />;
                })}
              </div>
              <div>
                {sortData.length ? (
                  <div>
                    {sortData.map((e) => {
                      return (
                        <div>
                          {!e.update_id ? (
                            <div>
                              {e.user[0]._id === e.project[0].created_by ? (
                                <UpdateDetail update={e} />
                              ) : (
                                <UpdateDetailCollab update={e} />
                              )}
                            </div>
                          ) : (
                            <div className="flex w-full flex-row items-center gap-1">
                              <div className="bg-gray-100 border-b w-1/4 max-h-px lg:w-1/2"></div>
                              <div className="text-xs w-full text-center my-4">
                                <p className="text-gray-600">
                                  {e.user_id.nickname}
                                </p>
                                <p className="text-gray-400">
                                  {`make a recent download (${e.createdAt.substring(
                                    0,
                                    10
                                  )} at ${e.createdAt.substring(
                                    11,
                                    16
                                  )} hs) on the "${e.update_id.title}" update.`}
                                </p>
                              </div>
                              <div className="bg-gray-100 border-b w-1/4 max-h-px lg:w-1/2"></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="mt-8">
              <CreateUpdate project_id={project._id} project={project} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
