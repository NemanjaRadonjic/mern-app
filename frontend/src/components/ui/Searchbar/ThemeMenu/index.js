import React, { useContext } from "react";
import ThemeContext from "@context/theme";
import { ThemeMenuContainer, Header, Mode, Accent } from "./styles.js";
import { modes, accents } from "@styles/themes";

const ThemeMenu = () => {
  const { themeInfo, setMode, setAccent } = useContext(ThemeContext);

  const changeMode = () => {
    const nextMode = themeInfo.mode === "light" ? "dark" : "light";
    setMode({ ...modes[nextMode] });

    window.localStorage.setItem(
      "theme",
      JSON.stringify({ ...themeInfo, mode: nextMode })
    );
  };

  const changeAccent = (accent) => {
    setAccent(accents[accent]);
    window.localStorage.setItem(
      "theme",
      JSON.stringify({ ...themeInfo, accent })
    );
  };

  const isActive = (color) => {
    return themeInfo.accent === color;
  };

  return (
    <ThemeMenuContainer id="themeDropdown">
      <Mode color={accents[themeInfo.accent]} onClick={changeMode}>
        {themeInfo.mode === "dark" ? "Light" : "Dark"} Mode
      </Mode>
      <Header>Accent:</Header>
      <Accent
        active={isActive("red")}
        color={accents.red}
        onClick={() => changeAccent("red")}
      />
      <Accent
        active={isActive("purple")}
        color={accents.purple}
        onClick={() => changeAccent("purple")}
      />
      <Accent
        active={isActive("pink")}
        color={accents.pink}
        onClick={() => changeAccent("pink")}
      />
      <Accent
        active={isActive("pinkRed")}
        color={accents.pinkRed}
        onClick={() => changeAccent("pinkRed")}
      />
      <Accent
        active={isActive("blue")}
        color={accents.blue}
        onClick={() => changeAccent("blue")}
      />
      <Accent
        active={isActive("greenBlue")}
        color={accents.greenBlue}
        onClick={() => changeAccent("greenBlue")}
      />
      <Accent
        active={isActive("green")}
        color={accents.green}
        onClick={() => changeAccent("green")}
      />
      <Accent
        active={isActive("orange")}
        color={accents.orange}
        onClick={() => changeAccent("orange")}
      />
    </ThemeMenuContainer>
  );
};

export default ThemeMenu;
