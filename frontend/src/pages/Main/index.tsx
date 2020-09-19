import React, { useContext } from "react";
//----------------------------------------------------------< components >
import Switch from "react-switch";
//--------------------------------------------------------------< assets >
import { ReactComponent as Logo } from "../../assets/logo_name.svg";
//--------------------------------------------------------------< styles >
import { ThemeContext } from "styled-components";

import { Container } from "./styles";
//----------------------------------------------------------< interfaces >
interface Props {
  toggleTheme(): void;
}
//================================================================[ BODY ]
const Main: React.FC<Props> = ({ toggleTheme }) => {
  const { title, colors } = useContext(ThemeContext);

  return (
    <Container>
      <Logo className="logo" />
      <Switch
        className="switch"
        onChange={toggleTheme}
        checked={title === "dark"}
        checkedIcon={false}
        uncheckedIcon={false}
        height={15}
        width={40}
        handleDiameter={25}
        onColor={colors.background[3]}
        onHandleColor={colors.foreground[1]}
        offColor={colors.background[3]}
        offHandleColor={colors.foreground[1]}
      />
    </Container>
  );
};

export default Main;
