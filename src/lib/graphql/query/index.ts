import { gql } from '../../gql'

export const Myself = gql(/* GraphQL */ `
  query Me {
    me {
      id
      name
      email
      profile {
        id
        bio
      }
    }
  }
`)
