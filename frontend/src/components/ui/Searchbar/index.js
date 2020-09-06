import React from "react";

import { Container, Input, SearchIcon } from "./styles";

function Searchbar() {
  return (
    <Container>
      <Input type="text" placeholder="Search..." maxLength={12} />
      <SearchIcon className="fas fa-search"></SearchIcon>
    </Container>
  );
}

export default Searchbar;
