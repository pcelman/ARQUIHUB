import React from "react";

import "../styles/Demo.css";

const Demo = () => {
  return (
    <div className="demo" id="demo">
      <h2>Project demos</h2>
      <span className="line"></span>
      <br />
      <br />
      <div className="container">
        <div className="demo__text">
          <p>Group project presentation</p>
          <h3 className="demo__project">Arquihub</h3>
          <p className="demo__paragraph">
            In this video, I provide an in-depth look at our Aquihub project,
            including its functionality and purpose. I demonstrate how users can
            read architecture posts, how architects and students can share
            files, and how visitors can leave comments and save their favorite
            posts. I also explain the reasoning behind why we decided to create
            this project.
          </p>
        </div>

        <div className="demo__video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/GftWu1lgvB0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <br /> <br /> <br />
      <div className="container">
        <div className="demo__text">
          <p>First video</p>
          <h3 className="demo__project">Videogames | API request</h3>
          <p className="demo__paragraph">
            In the video, I go through the process of how I retrieved the
            information from the RAWG API, detailing the specific steps used to
            access and gather the data.
          </p>
        </div>
        <div className="demo__video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/F2v36h2Esdk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <br /> <br /> <br />
      <div className="container">
        <div className="demo__text">
          <p>Second video</p>
          <h3 className="demo__project">Videogames | Render</h3>
          <p className="demo__paragraph">
            In the second video, I demonstrate how I utilized React and Redux to
            display the information obtained from the RAWG API. I highlight the
            use of actions and reducers in the process of rendering the data
            effectively.
          </p>
        </div>
        <div className="demo__video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Qeg2SjJvrx4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Demo;
