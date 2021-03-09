import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import axios from "@axios";
import getImageSrc from "@helpers/imageSrc";
import { v4 as uuid } from "uuid";
import useLoader from "@hooks/useLoader";
import { Loader } from "@styles/common";
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

function Searchbar(props) {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState(null);
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

  const changeTheme = () => {
    if (props.theme === props.themes.dark) {
      return props.setTheme(props.themes.light);
    }
    return props.setTheme(props.themes.dark);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleClick = (event) => {
    if (
      event.target.className === "debounce-input" ||
      event.target.parentElement?.className === "text-align__center" ||
      event.target.parentElement?.parentElement?.className ===
        "text-align__center" ||
      event.target.className.includes("fa-search")
    ) {
    } else {
      setShowResults(false);
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
      <ChangeTheme className="fas fa-palette" onClick={changeTheme} />
      <SearchContainer>
        <Input
          onFocus={() => setShowResults(true)}
          value={input}
          onChange={(event) => {
            onChange(event.target.value);
            debounced(event.target.value);
          }}
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
