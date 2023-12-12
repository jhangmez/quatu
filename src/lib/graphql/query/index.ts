import { gql } from '../../gql'

export const Myself = gql(/* GraphQL */ `
  query Me {
    me {
      id
      name
      username
      profile {
        id
        bio
      }
      company {
        name
      }
    }
  }
`)
