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

export const AllUsers = gql(`
query AllUsers {
  allUsers {
    id
    name
    typeuser {
      id
      name
    }
  }
}
`)

export const AllTypeUsers = gql(`
query AllTypeUser {
  allTypeUser {
    id
    name
  }
}`)
