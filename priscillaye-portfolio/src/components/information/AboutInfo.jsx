import React from "react";
import "./AboutInfo.scss";

const AboutInfo = () => {
  return (
    <section className="about">
      {/* Top right heading */}
      <div className="about-heading">
        <span className="about-heading-text">About me</span>
      </div>

      {/* Left side text */}
      <div className="about-content">
        <div className="about-intro">
          <span className="about-star">✦</span>
          <h1>
            <span className="hello">H</span>ello I’m
          </h1>
          <h2>Priscilla Ye</h2>
        </div>

        {/* Right side image */}
        <div className="about-image">
          <img
            src="/images/about.webp" // replace with your image path
            alt="Priscilla"
          />
        </div>
      </div>
      <div className="about-me">
        <h3>Building products that solve problems. Life-long learner. Newbie. </h3>
        <p>Hello there! I am Priscilla Ye, a current Computer Science & Business student attending <span>The University of Texas at Austin</span>. I love exploring new technologies, hackathons, and meeting new people. (Feel free to reach out by email!) </p>
        <p>When I'm free, you'll find me bird watching (or playing online bird ID games), vlogging, running at the gym, and sometimes watching Uncle Roger.</p>
      </div>
      <div className="exploring">
        <h2 className="exploring-text">What I'm up to:</h2>
        <ul>
            <li>
                Volunteering at <a href="https://www.curieosity.org/" target="_blank" rel="noopener noreferrer">CURIEosity</a> to help students, especially girls, get into CS & STEM.
            </li>
            <li>
                Building a game about birbs lol
            </li>
            <li>
                Participating in hackathons!
            </li>
            <li>
                Building an AI product that helps with Social Media
            </li>
        </ul>
      </div>
    <hr className="divider" />
      <div className="credits">
        <h1>Portfolio Credits:</h1>
        <ul>
            <li>
                This portfolio was inspired by Andrew Woan's RoomFolio and @Artbytran_ on Instagram
            </li>
            <li>
                Music is called ___ by ___
            </li>
            <li>
                The dog statues are my pets: Cookie and Ginger.
            </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutInfo;