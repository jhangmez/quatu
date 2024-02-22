import React from 'react'
import { MeQuery } from '@lib/gql/graphql'
import { ApolloError } from '@apollo/client'

export const UserContext = React.createContext({
  loading: false,
  error: null as ApolloError | null,
  data: null as MeQuery | null,
  refetch: () => {}
})
