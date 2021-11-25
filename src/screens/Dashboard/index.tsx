import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { HighlightCard } from '../../components/HiglightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import { useTheme } from 'styled-components'

import AsyncStorage from '@react-native-async-storage/async-storage'

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
  LogoutButton,
  LoadContainer
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string
}
interface HighlightDataProps {
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps)

  const theme = useTheme()

  const loadTransactions = async () => {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

      if (item.type === 'positive') {
        entriesTotal += Number(item.amount)
      } else {
        expensiveTotal += Number(item.amount)
      }

      const amount = Number(item.amount).toLocaleString('pr-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    })

    setTransactions(transactionsFormatted)

    const total = entriesTotal - expensiveTotal

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })

    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <StyledContainer>
      {isLoading ?
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} />
        </LoadContainer> :
        <>
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
              amount={highlightData.entries.amount}
              lastTransaction={'Última entrada dia 13 de abril'}
            />
            <HighlightCard
              type={'down'}
              title={'Saídas'}
              amount={highlightData.expensives.amount}
              lastTransaction={'Última saída dia 03 de abril'}
            />
            <HighlightCard
              type={'total'}
              title={'Total'}
              amount={highlightData.total.amount}
              lastTransaction={'01 à 16 de abril'}
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      }
    </StyledContainer>
  )
}
