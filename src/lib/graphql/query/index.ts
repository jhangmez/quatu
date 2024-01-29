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

export const GetCategoryId = gql(`query GetCategory($getCategoryId: Int!) {
  getCategory(id: $getCategoryId) {
    id
    name
    visible
    linkImageCategory {
      link
    }
  }
}
`)

export const AllSubcategoriesByCategory =
  gql(`query AllSubcategoriesByCategory($categoryId: Int!) {
  allSubcategoriesByCategory(categoryId: $categoryId) {
    id
    name
    visible
    linkImageCategory {
      link
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

export const AllProductsByCompany = gql(`
query AllProductsByCompany {
  allProductsByCompany {
    id
    name
    visible
    SKU
    UPC
  }
}
`)

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
