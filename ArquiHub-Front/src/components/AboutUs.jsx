import React from "react";
import aboutUs from "../api/aboutUs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function AboutUs() {
  function handleLink(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="sm:mx-4 md:mx-8 lg:mx-16  xl:mx-32">
      <div className="text-center mt-12 text-2xl font-bold text-gray-500">Our team</div>
      {/* <div className="grid auto-rows-auto gap-12 my-6"> */}
      <div className="flex flex-wrap justify-center gap-16 my-6">
        {aboutUs.map((e, index) => (
          // <div className="  flex flex-col content-center  ">
          <div className=" text-center text-gray-500 ">
            <div>
              <img
                src={e.image}
                width="250px"
                className=" object-cover rounded-full mt-16"
              />
            </div>
            <div className="font-semibold mt-6">{e.name}</div>

            <div className="mt-3">
              <a className="text-2xl mr-5 cursor-pointer hover:text-gray-700" onClick={() => handleLink(e.linkedIn)}>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>

              <a className="text-2xl cursor-pointer hover:text-gray-700" onClick={() => handleLink(e.gitHub)}>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
