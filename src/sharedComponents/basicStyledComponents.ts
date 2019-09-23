import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {THEME_PRIMARY} from "../helpers/theme";

export const CenterContainer = styled.div`
  display: block;
  justify-content: center;
  text-align: center;
  `;

export const StyledButton = styled(Button)`
  &.MuiButton-root {
    color: ${THEME_PRIMARY}
  }
  `;