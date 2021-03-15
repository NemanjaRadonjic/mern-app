import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import axios from "@axios";
import getImageSrc from "@helpers/imageSrc";
import { v4 as uuid } from "uuid";
import useLoader from "@hooks/useLoader";
import { Loader } from "@styles/common";

import ThemeMenu from "./ThemeMenu";

import {
  Container,
  SearchContainer,
  SearchResultContainer,
  SearchIcon,
  Avatar,
  Username,
  Input,
  LinkContainer,
  BackgroundContainer,
  ChangeTheme,
} from "./styles";

function Searchbar() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState(null);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { loaderActive, setLoaderActive } = useLoader(false);

  const fetchUsers = async (input) => {
    setLoaderActive(true);
    const response = await axios.get("/users", { params: { input } });
    setUsers(response.data);
    setShowResults(true);
    setLoaderActive(false);
  };

  const debounced = useDebouncedCallback((value) => {
    fetchUsers(value);
  }, 400);

  const onChange = (value) => {
    setLoaderActive(true);
    setInput(value);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseResults);
    document.addEventListener("mousedown", handleCloseThemes);
    return () => {
      document.removeEventListener("mousedown", handleCloseResults);
      document.removeEventListener("mousedown", handleCloseThemes);
    };
  }, []);

  const handleCloseResults = (event) => {
    if (
      event.target.className === "debounce-input" ||
      event.target.parentElement?.className === "text-align__center" ||
      event.target.parentElement?.parentElement?.className ===
        "text-align__center" ||
      (typeof event.target.className === "string" &&
        event.target.className.includes("fa-search"))
    ) {
    } else {
      setShowResults(false);
    }
  };

  const handleCloseThemes = (event) => {
    if (
      (typeof event.target.className === "string" &&
        event.target.className.includes("fas fa-palette")) ||
      event.target.id === "themeDropdown" ||
      event.target.parentElement.id === "themeDropdown" ||
      (typeof event.target.className === "string" &&
        event.target.className.includes("fa-search"))
    ) {
    } else {
      setDropdownActive(false);
    }
  };

  const renderUsers = () => {
    return (
      <SearchResultContainer>
        {users.map((user) => (
          <Link
            onClick={() => {
              setInput("");
              setUsers(null);
            }}
            key={uuid()}
            style={{ height: "auto" }}
            className="text-align__center"
            to={`/user/${user.username}`}
          >
            <BackgroundContainer
              backgroundImageUrl={getImageSrc(user.background, "background")}
            >
              <LinkContainer>
                <Avatar src={getImageSrc(user.avatar)} />
                <Username>{user.username}</Username>
              </LinkContainer>
            </BackgroundContainer>
          </Link>
        ))}
      </SearchResultContainer>
    );
  };

  return (
    <Container>
      {dropdownActive && <ThemeMenu />}
      <ChangeTheme className="fas fa-palette" onClick={toggleDropdown} />
      <SearchContainer>
        <Input
          onFocus={() => setShowResults(true)}
          value={input}
          onChange={(event) => {
            onChange(event.target.value);
            debounced(event.target.value);
          }}
          spellCheck="false"
          type="text"
          placeholder="Search..."
          maxLength={12}
        />

        {loaderActive ? (
          <Loader mini />
        ) : (
          <SearchIcon className="fas fa-search" />
        )}
        {users && showResults && renderUsers()}
      </SearchContainer>
    </Container>
  );
}

export default Searchbar;
