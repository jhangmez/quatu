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

export const CreateCategory = gql(`
mutation CreateCategory($name: String!, $visible: Boolean) {
  createCategory(name: $name, visible: $visible) {
    id
    name
    visible
  }
}`)

export const RootChangePassword = gql(`
mutation RootchangePassword($idUser: Int!, $newPassword: String!) {
  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {
    message
    status
  }
}`)

export const AllProductsByCompany = gql(`
mutation AllProductsByCompany($CompanyId: Int, $filter: ProductFilterInput) {
  allProductsByCompany(companyId: $CompanyId, filter: $filter) {
    id
    name
    createdAt
    price {
      unitPrice
      currency {
        abbreviation
      }
    }
    image {
      link
    }
  }
}
`)
