import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize';

import { HistoryCard } from '../../components/HistoryCard';

import { useTheme } from 'styled-components';

import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledContent,
  StyledChartContainer
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
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()

  const loadData = async () => {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'negative')

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
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>Resumo por categoria</StyledTitle>
      </StyledHeader>
      <StyledContent>
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
    </StyledContainer>
  );
}
