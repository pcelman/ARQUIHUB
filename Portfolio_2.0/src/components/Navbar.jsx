import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import "../styles/Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMenu = () => setClick(false);

  return (
    <div className="header">
      <nav className="navbar">

        <a href="/">
          <h3 className="navbar__name">Paula Celman</h3>
        </a>

        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: "#faf1e6" }} />
          ) : (
            <FaBars size={30} style={{ color: "#faf1e6" }} />
          )}
        </div>
        <ul className={click ? "nav__menu active" : "nav__menu"}>
          <li className="nav__item">
            <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-90}
              duration={500}
              onClick={closeMenu}
            >
              About me
            </Link>
          </li>
          <li className="nav__item">
            <Link
              to="projects"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={closeMenu}
            >
              Projects
            </Link>
          </li>{" "}
          <li className="nav__item">
            <Link
              to="demo"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={closeMenu}
            >
              Demos
            </Link>
          </li>
          <li className="nav__item">
            <Link
              to="testimonials"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={closeMenu}
            >
              Testimonials
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
