import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoryCard } from '../../components/HistoryCard';

import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';

import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledContent,
  StyledChartContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  LoadContainer
} from './styles';
import { categories } from '../../utils/categories';
interface TransactionData {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

interface CategoryData {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const { user } = useAuth()

  const theme = useTheme()

  const handleDateChange = (action: 'next' | 'previous') => {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1)
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1)
      setSelectedDate(newDate)
    }
  }

  const loadData = async () => {
    setIsLoading(true)
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter((expensive: TransactionData) =>
      expensive.type === 'negative' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    )

    // O reduce() pega uma coleção e soma os elementos
    const expensivesTotal = expensives
      .reduce((acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount)
      }, 0)

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        // ADICIONANDO COM PUSH NO ARRAY
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Resumo por categoria</StyledTitle>
      </StyledHeader>
      {isLoading ?
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} />
        </LoadContainer>
        :
        <StyledContent
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight()
          }}
        >

          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('previous')}>
              <MonthSelectIcon name={'chevron-left'} />
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name={'chevron-right'} />
            </MonthSelectButton>
          </MonthSelect>

          <StyledChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
              labelRadius={60}
              x="percent"
              y="total"
            />
          </StyledChartContainer>
          {totalByCategories.map(item => (
            <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color} />
          ))}
        </StyledContent>
      }
    </StyledContainer>
  );
}
