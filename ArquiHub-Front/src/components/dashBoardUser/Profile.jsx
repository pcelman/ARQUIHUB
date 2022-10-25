import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import AvatarUser from "../avatarUser/AvatarUser";
export default function Profile({
  user,
  userLogeado,
  handleChange,
  handleEditProfile,
  Favourites,
  Projects,
  Post,
  Reviews,
  state,
  id,
}) {
  let userToken = JSON.parse(localStorage.getItem("token"));
  let loggedId = userToken ? userToken.userId : "";

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col mb-2 items-center w-full gap-8">
        <div className="">
          <AvatarUser img={user.avatar} className="w-64 h-64 border" />
        </div>

        <div className="text-center">
          <div className="font-bold text-lg capitalize">
            {user.name} {user.lastname}
          </div>
          <div className="text-lg">{user.nickname} </div>

          {user.description ? (
            <div>{user.description}</div>
          ) : (
            <div className="text-slate-200">Description</div>
          )}

          {user.location ? (
            <div className="flex flex-row my-3">
              <div className="pr-4">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div>{user.location}</div>
            </div>
          ) : (
            <div className="flex flex-row my-3">
              <div className="pr-4">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div className="text-slate-200">Location</div>
            </div>
          )}
          {user.job ? (
            <div className="flex flex-row my-3 ">
              <div className="pr-4">
                <FontAwesomeIcon icon={faBuilding} />
              </div>
              <div>{user.job}</div>
            </div>
          ) : (
            <div className="flex flex-row my-3">
              <div className="pr-4">
                <FontAwesomeIcon icon={faBuilding} />
              </div>
              <div className="text-slate-200">Job Title</div>
            </div>
          )}
          {user.page ? (
            <div>
              <div className="flex flex-wrap">
                <div className="pr-4">
                  <FontAwesomeIcon icon={faLink} />
                </div>
                <div>{user.page}</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <div className="pr-4">
                <FontAwesomeIcon icon={faLink} />
              </div>
              <div className="text-slate-200">Webpage</div>
            </div>
          )}

          {loggedId.length && loggedId === id ? (
            <button
              onClick={(e) => handleEditProfile(e)}
              className="bg-slate-300 cursor-pointer w-32 h-8 mt-6"
            >
              Edit Profile
            </button>
          ) : null}
        </div>
      </div>
      {/* <div>
        <div>
          <div className="flex flex-row gap-10 mt-16 ml-12 w-1/2">
            <div className="tracking-wider text-lg hover:border-b-2 border-slate-300">
              <button value="projects" onClick={(e) => handleChange(e)}>
                Projects
              </button>
            </div>

            <div className="tracking-wider text-lg hover:border-b-2 border-slate-300">
              <button value="posts" onClick={(e) => handleChange(e)}>
                Posts
              </button>
            </div>

            <div className="tracking-wider text-lg border-b-2 border-white hover:border-b-2 hover:border-slate-300">
              <button value="reviews" onClick={(e) => handleChange(e)}>
                Reviews
              </button>
            </div>

            <div className="tracking-wider text-lg border-b-2 border-white hover:border-b-2 hover:border-slate-300">
              <button value="favourites" onClick={(e) => handleChange(e)}>
                Favourites
              </button>
            </div>
          </div>
        </div>
        <div>
          {state === "projects" && (
            <div>
              <Projects id={id} />
            </div>
          )}
          {state === "posts" && (
            <div>
              <Post
                id={userLogeado.userId}
                key={userLogeado.userId}
                user={user}
              />
            </div>
          )}
          {state === "reviews" && (
            <div>
              <Reviews />
            </div>
          )}
          {state === "favourites" && <div> <Favourites  /> </div>}
        </div>
      </div> */}
    </div>
  );
}
