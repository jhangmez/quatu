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

export const AllCategoriesByCompany = gql(`
query AllCategoriesByCompany($companyId: Int) {
  allCategoriesByCompany(companyId: $companyId) {
    id
    name
    visible
    linkImageCategory {
      link
    }
  }
}
`)

export const Borrar = gql(`
query AllListsByCompany($companyId: Int!) {
  allListsByCompany(companyId: $companyId) {
    id
    name
    visible
    company {
      name
    }
    product {
      id
      name
      SKU
      UPC
      visible
      image {
        link
      }
    }
    linkImageList {
      link
    }
  }
}`)
