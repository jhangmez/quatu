import { gql } from '../../gql'

export const Login = gql(`
  mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
`)

export const ChangePassword = gql(`
mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    message
    status
  }
}
`)

export const RootChangePassword = gql(`
mutation RootchangePassword($idUser: Int!, $newPassword: String!) {
  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {
    message
    status
  }
}`)
