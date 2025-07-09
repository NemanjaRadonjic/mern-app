import React from "react";
import { Container, Icon, Paragraph } from "./styles";

export default function Instructions() {
  return (
    <Container>
      <Icon className="fas fa-info" />
      <Paragraph>
        Every user has predictable credentials like: <br />
        Username: user1@gmail.com, Password: asdasdasd
      </Paragraph>
    </Container>
  );
}
