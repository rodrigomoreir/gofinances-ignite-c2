import React from 'react';
import { HistoryCard } from '../../components/HistoryCard';

import { StyledContainer, StyledHeader, StyledTitle } from './styles';

export function Resume() {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Resumo por categoria</StyledTitle>
      </StyledHeader>

      <HistoryCard title={'Title'} amount={'R$ 150,00'} color={'red'} />

    </StyledContainer>
  );
}
