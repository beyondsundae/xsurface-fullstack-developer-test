import { Button } from "antd";
import styled from "styled-components";
import { theme } from "./theme";

export const StyledCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4px;
  line-height: 1.2;
`;

export const debugginBorder = { border: "1px solid red" };

export const StyledClearButton = styled(Button)`
  border: 1px solid white;
  color: white;
  background-color: transparent;
`;

export const StyledWhiteText = styled.span`
  color: white;
`;
export const StyledSecondaryText = styled.span`
  color: ${theme.color.secondary};
`;

