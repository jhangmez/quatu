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
mutation CreateCategory($name: String!, $visible: Boolean, $link: String!, $namefile: String) {
  createCategory(name: $name, visible: $visible, link: $link, namefile: $namefile) {
    id
    name
    visible
    linkImageCategory {
      link
    }
  }
}`)

export const RootChangePassword = gql(`
mutation RootchangePassword($idUser: Int!, $newPassword: String!) {
  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {
    message
    status
  }
}`)

export const UpdateCategory = gql(`
mutation UpdateCategory($id: Int!, $name: String!, $visible: Boolean!, $link: String!, $namefile: String) {
  updateCategory(id: $id, name: $name, visible: $visible, link: $link, namefile: $namefile) {
    name
    visible
    linkImageCategory {
      link
    }
  }
}
`)

export const DeleteProduct = gql(`
mutation DeleteProduct($id: Int!) {
  deleteProduct(id: $id) {
    id
  }
}`)

export const CreateorUpdateProduct = gql(`
mutation CreateOrUpdateProduct($id: Int, $name: String!, $sku: String, $upc: String, $visible: Boolean) {
  createOrUpdateProduct(id: $id, name: $name, SKU: $sku, UPC: $upc, visible: $visible) {
    id
  }
}`)

export const CreateorUpdatePrice = gql(`
mutation CreateOrUpdatePrice($unitPrice: Float!, $currencyId: Int!, $id: Int, $bulkPrice: Float, $bulkQuantity: Int, $onSale: Boolean, $visible: Boolean, $productId: Int) {
  createOrUpdatePrice(unitPrice: $unitPrice, currencyId: $currencyId, id: $id, bulkPrice: $bulkPrice, bulkQuantity: $bulkQuantity, onSale: $onSale, visible: $visible, productId: $productId) {
    id
    bulkPrice
    bulkQuantity
    onSale
    unitPrice
    visible
    currency {
      id
      name
      abbreviation
    }
  }
}
`)

export const DeleteCategory = gql(`
mutation DeleteCategory($id: Int!) {
  deleteCategory(id: $id) {
    id
  }
}
`)

export const GetCategoryId = gql(`
mutation DeleteCategory($id: Int!) {
  deleteCategory(id: $id) {
    id
  }
}
`)
