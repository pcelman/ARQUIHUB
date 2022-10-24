import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPhotos({ files, setFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });
  console.log(files);

  const handleDelete = (element, e) => {
    e.preventDefault();
    let afterDelete = files.filter((e) => e[0].name !== element[0].name);
    setFiles(afterDelete);
  };

  const images = files.map((file) => (
    <div key={file[0].name}>
      <div>
        <img src={file[0].preview} style={{ width: "200px" }} alt="preview" />
        <button onClick={(e) => handleDelete(file, e)}>X</button>
      </div>
    </div>
  ));

  return (
    <div className="App">
      {/* <img src={files[0].preview}></img> */}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="w-62 h-40 bg-white mt-6  ">
          <div className=" text-center pt-6 bg-slate-100 border-slate-500">
            Drop one file at a time here{" "}
          </div>
          {/* <div className=" text-center pt-6"> or click to choose from your folders</div> */}
          <div className="grid grid-cols-3">
            <div className="   text-center py-1 w-50% "> </div>

            <div className=" bg-slate-200   text-center mt-2 py-1 w-50% ">
              {" "}
              choose file
            </div>
            <div className="   text-center py-1 w-50% "> </div>
          </div>
        </div>
      </div>
      <div className="mx-2 my-2 w-40">{images}</div>
      {/* <button onClick={(e) => uploadImage(files, e)}>SAVE PHOTOS</button> */}
    </div>
  );
}
