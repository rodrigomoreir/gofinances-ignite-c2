import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
  StyledButton,
  StyledImageContainer,
  StyledText,
} from './styles';

interface Props extends RectButtonProps {
  title: string
  svg: React.FC<SvgProps>
}

export const SignInSocialButton = ({ title, svg: Svg, ...rest }: Props) => {
  return (
    <StyledButton {...rest}>
      <StyledImageContainer>
        <Svg />
      </StyledImageContainer>
      <StyledText>
        {title}
      </StyledText>
    </StyledButton>
  );
}
