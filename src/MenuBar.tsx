import React from "react";
import styled from "styled-components";
import {THEME_PRIMARY, THEME_PRIMARY_DARK, THEME_TERTIARY} from "./helpers/theme";
import {StyledButton} from "./sharedComponents/basicStyledComponents";

interface MenuBarProps {
  addHero: () => void;
}

const StyledMenuBar = styled.div`
  height: 85px;
  background: ${THEME_TERTIARY};
  box-shadow: 2px 2px 2px black;
  font-family: LifeCraft;
  font-size: 60px;
  text-shadow: -2px 0 black, 0 2px black, 1px 0 ${THEME_PRIMARY}, 0 -1px ${THEME_PRIMARY};
  color: ${THEME_PRIMARY_DARK}
  align-items: center;
  justify-content: space-between
  display: flex;
  padding: 0 20px 0 20px;
  `;

const MenuBar: React.FC<MenuBarProps> = (props: MenuBarProps) => {
  return (
    <StyledMenuBar data-testid={"menu-bar"}>
      WoW Compare
      <StyledButton onClick={props.addHero}>Add Hero</StyledButton>
    </StyledMenuBar>
  )
};

export default MenuBar