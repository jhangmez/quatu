import { gql } from '../../gql'

export const Login = gql(`
  mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
`)
