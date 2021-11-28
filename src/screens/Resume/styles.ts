import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const StyledContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const StyledHeader = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`
export const StyledTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`

export const StyledContent = styled.ScrollView.attrs({
  contentContainerStyle: { flex: 1, padding: 24 }
})``
