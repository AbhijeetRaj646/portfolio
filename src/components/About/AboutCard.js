import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
                  <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Abhijeet Raj </span>
            from <span className="purple">Pune,India.</span>
            <br />
            DevOps Engineer who enjoys building reliable systems and automating processes.
            <br />
            Passionate about working with tools like Docker, Kubernetes, AWS, and Grafana  
            to streamline development and deployment workflows.
            <br />
            I have 2 years of experience in setting up CI/CD pipelines, monitoring systems,  
            managing cloud infrastructure, and improving team productivity through automation.
            <br />
            Apart from DevOps, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching Movies
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
