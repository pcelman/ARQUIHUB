import React from "react";
import AboutMe from "./components/AboutMe"
import Education from "./components/Education"
import Experience from "./components/Experience"

export default function App()  {
  return (
    <div>
      <header>
        <title>Portfolio</title>
        <h1>Paula Celman</h1>
      </header>
      <body>
        <main>
            <nav>
                <h3>About me</h3>
                <h3>Experience</h3>
                <h3>Education</h3>
            </nav>
            <div>
                <AboutMe/>
            </div>
        </main>
      </body>
      <footer>
        <a>Linked in</a>
        <a>github</a>
        <h3>pcelman@gmail.com</h3>
      </footer>
    </div>
  );
};
