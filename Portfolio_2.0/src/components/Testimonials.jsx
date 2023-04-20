import React from "react";
import { BsLinkedin } from "react-icons/bs";
import testimonials__jesus from "../images/testimonials__jesus.png";
import testimonials__santy from "../images/testimonials__santy.png";
import testimonials__mario from "../images/testimonials__mario.png";
import "../styles/Testimonials.css";

const Testimonials = () => {
  return (
    <div className="testimonials" id="testimonials">
      <div className="testimonials__container">
        <h2 className="testimonials__title">Testimonials</h2>
        <span className="line"></span>
        <div className="testimonials__content">
          <div className="testimonials__card">
            <div>

            <img
            className="testimonials__img"
              src={testimonials__jesus}
              alt="A man with a beard with a blue gradiend background"
              />
            <p className="testimonials__paragraph">
              Paula is a person characterized by her empathy, which allows her
              to connect with other people and work in a team remarkably. She is
              also someone who has a solution for every problem and is always
              looking to learn new things. Paula excels at building connections
              and working effectively in teams.
            </p>
              </div>
            <div >
              <p className="testimonials__signature">
              <h2 className="testimonials__name">Jesus Espinel</h2>
                <a
                  href="https://www.linkedin.com/in/jesus-espinel/"
                  target="_blank"
                >
                  &nbsp; &nbsp;
                  <BsLinkedin
                    className="testimonials__linkedin"
                    alt="Link to Jesús´ LinkedIn profile"
                  />
                </a>
              </p>
              <p className="testimonials__paragraph" >Web developer</p>
            </div>
          </div>
          <div className="testimonials__card">
            <div>
            <img
            className="testimonials__img"
              src={testimonials__santy}
              alt="A man looking to the side with a blue gradiend background"
            />
          <p className="testimonials__paragraph">
              I greatly admire Paula for her determination and aptitude for
              learning. It was a joy to collaborate with her for an extended
              period, as she is an asset to any team. Her expertise in design
              and user experience is remarkable, and I can confidently say that
              I have learned a great deal from her throughout our time working
              together.
            </p>

                </div>
            <div>
            <p className="testimonials__signature">
                <h2 className="testimonials__name">Santiago Vega</h2>
                <a
           
                  href="https://www.linkedin.com/in/santiago-vega-53970b217/"
                  target="_blank"
                >
                  &nbsp; &nbsp;
                  <BsLinkedin
                    className="testimonials__linkedin"
                    alt="Link to Santiago´s LinkedIn profile"
                  />
                </a>
              </p>
              <p className="testimonials__paragraph" >Web developer</p>
            </div>
          </div>
          <div className="testimonials__card">
            <div>

            <img
            className="testimonials__img"
              src={testimonials__mario}
              alt="A man smiling with a blue gradiend background"
              />
         <p className="testimonials__paragraph">
              Paula is an exceptional colleague, known for her communication
              skills and initiative in helping others and proposing new ideas.
              She is empathetic, approachable, and always willing to lend a
              hand. Her professionalism and dedication to her work have made a
              significant impact on every project she has been a part of. She is
              highly responsible and consistently delivers high-quality results.
            </p>
              </div>
            <div>
            <p className="testimonials__signature">
              <h2 className="testimonials__name">Mario Villalba</h2>
                <a
         
                  href="https://www.linkedin.com/in/mario-villalba-8b7136179/"
                  target="_blank"
                >
                  &nbsp; &nbsp;
                  <BsLinkedin
                    className="testimonials__linkedin"
                    alt="Link to Mario´s LinkedIn profile"
                  />
                </a>
              </p>
              <p className="testimonials__paragraph" >Web developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
