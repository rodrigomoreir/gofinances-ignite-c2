import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components';

import { SignInSocialButton } from '../../components/SignInSocialButton'

import { useAuth } from '../../hooks/auth'

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
  StyledFooterWrapper
} from './styles';

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, signInWithApple } = useAuth()
  const theme = useTheme()

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Apple')
    } finally {
      setIsLoading(false)
    }
  }

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
        <StyledFooterWrapper>
          <SignInSocialButton
            title={'Entrar com Google'}
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title={'Entrar com Apple'}
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />
        </StyledFooterWrapper>
        {isLoading && <ActivityIndicator color={theme.colors.shape} style={{ marginTop: 18 }} />}
      </StyledFooter>
    </StyledContainer>
  );
}
