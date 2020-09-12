import React from "react";

import { Container, Input, SearchIcon, ChangeTheme } from "./styles";

function Searchbar(props) {
  const changeTheme = () => {
    if (props.theme === props.themes.dark) {
      return props.setTheme(props.themes.light);
    }
    return props.setTheme(props.themes.dark);
  };
  return (
    <Container>
      <ChangeTheme className="fas fa-palette" onClick={changeTheme} />
      <Input type="text" placeholder="Search..." maxLength={12} />
      <SearchIcon className="fas fa-search"></SearchIcon>
    </Container>
  );
}

export default Searchbar;
