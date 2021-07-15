import React, { useState } from 'react'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

import { Input } from '../../components/Form/Input'
import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../../components/Form/CategorySelect'

export const Register = () => {
  const [transactionType, setTransactionType] = useState('')

  const handleTransactionsTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>HEader</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder={'Nome'} />
          <Input placeholder={'Preço'} />
          <TransactionsTypes>
            <TransactionTypeButton
              type={'up'}
              title={'Income'}
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type={'down'}
              title={'Outcome'}
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
          <CategorySelect title={'Categoria'} />
        </Fields>
        <Button title={'Enviar'} />
      </Form>

    </Container>
  )
}
