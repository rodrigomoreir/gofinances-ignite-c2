import React from 'react';

import {
  View
} from 'react-native';

import { StyledAmount, StyledContainer, StyledTitle } from './styles';

interface Props {
  title: string,
  amount: string,
  color: string
}

export const HistoryCard = ({ title, amount, color }: Props) => {
  return (
    <StyledContainer color={color}>
      <StyledTitle>{title}</StyledTitle>
      <StyledAmount>{amount}</StyledAmount>

    </StyledContainer>
  );
}
