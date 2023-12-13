import { gql } from '../../gql'

export const Myself = gql(/* GraphQL */ `
  query Me {
    me {
      id
      name
      username
      company {
        id
        name
        suscription {
          name
        }
      }
      typeuser {
        id
        name
      }
    }
  }
`)
