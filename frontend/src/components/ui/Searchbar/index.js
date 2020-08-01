import React from "react";

import { Container, Input } from "./styles";

function Searchbar() {
  return (
    <Container>
      <Input type="text" placeholder="Search..." />
    </Container>
  );
}

export default Searchbar;
