import React from 'react'

import { HighlightCard } from '../../components/HiglightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'

import {
  StyledContainer,
  StyledHeader,
  UserInfo,
  Photo,
  UserGreeting,
  UserName,
  User,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

export const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento do Site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '12/12/2021'
    },
    {
      id: '2',
      type: 'negative',
      title: 'Desenvolvimento do Aplicativo',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'coffee'
      },
      date: '12/12/2021'
    },
    {
      id: '3',
      type: 'negative',
      title: 'Desenvolvimento do Aplicativo',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'shopping-bag'
      },
      date: '12/12/2021'
    },
  ]

  return (
    <StyledContainer>
      <StyledHeader>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/rodrigomoreir.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => { }}>
            <Icon name={'power'} />
          </LogoutButton>
        </UserWrapper>
      </StyledHeader>
      <HighlightCards>
        <HighlightCard
          type={'up'}
          title={'Entradas'}
          amount={'R$ 17.400,00'}
          lastTransaction={'Última entrada dia 13 de abril'}
        />
        <HighlightCard
          type={'down'}
          title={'Saídas'}
          amount={'R$ 1.259,00'}
          lastTransaction={'Última saída dia 03 de abril'}
        />
        <HighlightCard
          type={'total'}
          title={'Total'}
          amount={'R$ 16.141,00'}
          lastTransaction={'01 à 16 de abril'}
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>

    </StyledContainer>
  )
}
