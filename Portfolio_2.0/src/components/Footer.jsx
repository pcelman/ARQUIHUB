import React from "react";
import { Link } from "react-scroll";
import { GoMarkGithub } from "react-icons/go";
import { BsLinkedin } from "react-icons/bs";
import { HiOutlineMailOpen } from "react-icons/hi";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        {/* <ul>
          <li className="footer__item">
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              className="logo"
            >
              About me
            </Link>
          </li>
          <li className="footer__item">
            <Link
              to="projects"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Projects
            </Link>
          </li>
          <li className="footer__item">
            <Link
              to="demo"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="logo"
            >
              Demos
            </Link>
          </li>
          <li className="footer__item">
            <Link
              to="testimonials"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="logo"
            >
              Testimonials
            </Link>
          </li>
        </ul> */}
        <div className="footer__links">
          <a href="mailto:pcelman@gmail.com" target="_blank">
            <HiOutlineMailOpen size={30} alt="Link to email"/>
          </a>
          <a href="https://github.com/pcelman" target="_blank">
            {" "}
            <GoMarkGithub size={30} alt="Link to GitHub profile"/>
          </a>
          <a href="https://www.linkedin.com/in/paula-celman/" target="_blank">
            <BsLinkedin size={30} alt="Link to LinkedIn profile"/>
          </a>
        </div>
        <div className="footer__bottom">
          {/* <span className="line"></span> */}
          <p>2023 Paula Celman. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
