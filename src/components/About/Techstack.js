import React from "react";
import { Row, Col, Badge } from "react-bootstrap";

const techStack = {
  Frontend: ["React", "HTML", "CSS", "JavaScript"],
  Backend: ["Node.js", "Express", "MongoDB"],
  Tools: ["Git", "Docker", "Postman"],
};

function TechstackCategory({ category, items }) {
  return (
    <Row style={{ marginBottom: "20px" }}>
      <Col xs={12}>
        <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>{category}</h5>
        {items.map((item, index) => (
          <Badge key={index} pill bg="dark" className="me-2 mb-2">
            {item}
          </Badge>
        ))}
      </Col>
    </Row>
  );
}

function Techstack() {
  return (
    <>
      {Object.entries(techStack).map(([category, items]) => (
        <TechstackCategory key={category} category={category} items={items} />
      ))}
    </>
  );
}

export default Techstack;
