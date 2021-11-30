import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize'

import LogoSvg from '../../assets/logo.svg'
import GoogleSvg from '../../assets/google.svg'
import AppleSvg from '../../assets/apple.svg'

import {
  StyledContainer,
  StyledHeader,
  StyledTitleWrapper,
  StyledTitle,
  StyledSignInTitle,
  StyledFooter,
} from './styles';

export const SignIn = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <StyledTitle>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </StyledTitle>
        </StyledTitleWrapper>
        <StyledSignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </StyledSignInTitle>
      </StyledHeader>
      <StyledFooter>

      </StyledFooter>
    </StyledContainer>
  );
}
