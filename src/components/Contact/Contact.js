import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-image">
          <img src="/img2.png" alt="Joe Doe - Campaign Director" />
        </div>
        <div className="contact-info">
          <h3>Campaign Director</h3>
          <h2>DEAN LEWIS</h2>
          <p>
            Dean leads our mission to provide life-saving surgeries to children in need.
          </p>
          <div className="contact-details">
            <p>📧 deanlewisofficial1st@gmail.com</p>
            <p>💬 +1 (805) 358-9736</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;