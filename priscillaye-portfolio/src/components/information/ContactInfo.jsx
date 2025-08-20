import React from "react";
import "./ContactInfo.scss";

const Contact = () => {
  return (
    <section className="contact-section">
      {/* Heading */}
      <div className="contact-header">
        <span>✦ Contact</span>
      </div>

      {/* Message */}
      {/* Main content */}
      <div className="contact-content">
        <h1>Let’s be friends!</h1>
        <p>
          Feel free to email me at{" "}
          <a href="mailto:priscilla.ye@utexas.edu">priscilla.ye@utexas.edu</a> :)
        </p>

        <div className="contact-links">
          <a
            href="https://www.linkedin.com/in/priscillaye/"
            target="_blank"
            rel="noopener noreferrer"
          >
            [ linkedin ]
          </a>
          <a
            href="https://github.com/ScriptKitKat/"
            target="_blank"
            rel="noopener noreferrer"
          >
            [ github ]
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;