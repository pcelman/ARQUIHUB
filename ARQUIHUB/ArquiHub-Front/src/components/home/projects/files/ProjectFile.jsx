import React from "react";
import img from "../../../../assets/icons/dwg.png";

const ProjectFile = ({ file }) => {
  return (
    <div className="flex flex-wrap my-2">
      <a href={file.url} target="blank">
        <img src={img} alt="dwg_file" className="w-32" />
      </a>
      <div className="flex flex-col">
        <p className="m-2 font-semibold">{file.originalname}</p>
        <p className="m-2 font-normal">{file.createdAt.substring(0, 10)}</p>
        <p className="m-2">{file.createdAt.substring(11, 16)}</p>
      </div>
    </div>
  );
};

export default ProjectFile;
