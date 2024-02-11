/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    token\n  }\n}\n": types.LoginDocument,
    "\nmutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {\n    message\n    status\n  }\n}\n": types.ChangePasswordDocument,
    "\nmutation CreateCategory($name: String!, $visible: Boolean, $link: String!, $namefile: String) {\n  createCategory(name: $name, visible: $visible, link: $link, namefile: $namefile) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}": types.CreateCategoryDocument,
    "\nmutation RootchangePassword($idUser: Int!, $newPassword: String!) {\n  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {\n    message\n    status\n  }\n}": types.RootchangePasswordDocument,
    "\nmutation UpdateCategory($id: Int!, $name: String!, $visible: Boolean!, $link: String!, $namefile: String) {\n  updateCategory(id: $id, name: $name, visible: $visible, link: $link, namefile: $namefile) {\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n": types.UpdateCategoryDocument,
    "\nmutation DeleteProduct($id: Int!) {\n  deleteProduct(id: $id) {\n    id\n  }\n}": types.DeleteProductDocument,
    "\nmutation CreateOrUpdateProduct($id: Int, $name: String!, $sku: String, $upc: String, $visible: Boolean) {\n  createOrUpdateProduct(id: $id, name: $name, SKU: $sku, UPC: $upc, visible: $visible) {\n    id\n  }\n}": types.CreateOrUpdateProductDocument,
    "\nmutation CreateOrUpdatePrice($unitPrice: Float!, $currencyId: Int!, $createOrUpdatePriceId: Int, $bulkPrice: Float, $bulkQuantity: Int, $onSale: Boolean, $visible: Boolean) {\n  createOrUpdatePrice(unitPrice: $unitPrice, currencyId: $currencyId, id: $createOrUpdatePriceId, bulkPrice: $bulkPrice, bulkQuantity: $bulkQuantity, onSale: $onSale, visible: $visible) {\n    id\n  }\n}\n": types.CreateOrUpdatePriceDocument,
    "\nmutation DeleteCategory($id: Int!) {\n  deleteCategory(id: $id) {\n    id\n  }\n}\n": types.DeleteCategoryDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      username\n      company {\n        id\n        name\n        suscription {\n          name\n        }\n      }\n      typeuser {\n        id\n        name\n      }\n    }\n  }\n": types.MeDocument,
    "query GetCategory($getCategoryId: Int!) {\n  getCategory(id: $getCategoryId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n": types.GetCategoryDocument,
    "\nquery GetProduct($getProductId: Int!) {\n  getProduct(id: $getProductId) {\n    SKU\n    UPC\n    category {\n      name\n    }\n    id\n    image {\n      link\n    }\n    name\n    price {\n      id\n      bulkPrice\n      bulkQuantity\n      unitPrice\n      onSale\n      visible\n      currency {\n        abbreviation\n        name\n      }\n    }\n    visible\n  }\n}\n": types.GetProductDocument,
    "\nquery GetPrice($getPriceId: Int!) {\n  getPrice(id: $getPriceId) {\n    bulkPrice\n    bulkQuantity\n    currency {\n      name\n      abbreviation\n    }\n    id\n    onSale\n    unitPrice\n    visible\n  }\n}": types.GetPriceDocument,
    "query AllSubcategoriesByCategory($categoryId: Int!) {\n  allSubcategoriesByCategory(categoryId: $categoryId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n": types.AllSubcategoriesByCategoryDocument,
    "\nquery AllUsers {\n  allUsers {\n    id\n    name\n    typeuser {\n      id\n      name\n    }\n  }\n}\n": types.AllUsersDocument,
    "\nquery AllTypeUser {\n  allTypeUser {\n    id\n    name\n  }\n}": types.AllTypeUserDocument,
    "\nquery AllProductsByCompany {\n  allProductsByCompany {\n    id\n    name\n    visible\n    SKU\n    UPC\n  }\n}\n": types.AllProductsByCompanyDocument,
    "\nquery AllCategoriesByCompany($companyId: Int) {\n  allCategoriesByCompany(companyId: $companyId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n": types.AllCategoriesByCompanyDocument,
    "\nquery AllListsByCompany($companyId: Int!) {\n  allListsByCompany(companyId: $companyId) {\n    id\n    name\n    visible\n    company {\n      name\n    }\n    product {\n      id\n      name\n      SKU\n      UPC\n      visible\n      image {\n        link\n      }\n    }\n    linkImageList {\n      link\n    }\n  }\n}": types.AllListsByCompanyDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    token\n  }\n}\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    token\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateCategory($name: String!, $visible: Boolean, $link: String!, $namefile: String) {\n  createCategory(name: $name, visible: $visible, link: $link, namefile: $namefile) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}"): (typeof documents)["\nmutation CreateCategory($name: String!, $visible: Boolean, $link: String!, $namefile: String) {\n  createCategory(name: $name, visible: $visible, link: $link, namefile: $namefile) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation RootchangePassword($idUser: Int!, $newPassword: String!) {\n  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {\n    message\n    status\n  }\n}"): (typeof documents)["\nmutation RootchangePassword($idUser: Int!, $newPassword: String!) {\n  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {\n    message\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateCategory($id: Int!, $name: String!, $visible: Boolean!, $link: String!, $namefile: String) {\n  updateCategory(id: $id, name: $name, visible: $visible, link: $link, namefile: $namefile) {\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n"): (typeof documents)["\nmutation UpdateCategory($id: Int!, $name: String!, $visible: Boolean!, $link: String!, $namefile: String) {\n  updateCategory(id: $id, name: $name, visible: $visible, link: $link, namefile: $namefile) {\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteProduct($id: Int!) {\n  deleteProduct(id: $id) {\n    id\n  }\n}"): (typeof documents)["\nmutation DeleteProduct($id: Int!) {\n  deleteProduct(id: $id) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateOrUpdateProduct($id: Int, $name: String!, $sku: String, $upc: String, $visible: Boolean) {\n  createOrUpdateProduct(id: $id, name: $name, SKU: $sku, UPC: $upc, visible: $visible) {\n    id\n  }\n}"): (typeof documents)["\nmutation CreateOrUpdateProduct($id: Int, $name: String!, $sku: String, $upc: String, $visible: Boolean) {\n  createOrUpdateProduct(id: $id, name: $name, SKU: $sku, UPC: $upc, visible: $visible) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateOrUpdatePrice($unitPrice: Float!, $currencyId: Int!, $createOrUpdatePriceId: Int, $bulkPrice: Float, $bulkQuantity: Int, $onSale: Boolean, $visible: Boolean) {\n  createOrUpdatePrice(unitPrice: $unitPrice, currencyId: $currencyId, id: $createOrUpdatePriceId, bulkPrice: $bulkPrice, bulkQuantity: $bulkQuantity, onSale: $onSale, visible: $visible) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreateOrUpdatePrice($unitPrice: Float!, $currencyId: Int!, $createOrUpdatePriceId: Int, $bulkPrice: Float, $bulkQuantity: Int, $onSale: Boolean, $visible: Boolean) {\n  createOrUpdatePrice(unitPrice: $unitPrice, currencyId: $currencyId, id: $createOrUpdatePriceId, bulkPrice: $bulkPrice, bulkQuantity: $bulkQuantity, onSale: $onSale, visible: $visible) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteCategory($id: Int!) {\n  deleteCategory(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteCategory($id: Int!) {\n  deleteCategory(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      name\n      username\n      company {\n        id\n        name\n        suscription {\n          name\n        }\n      }\n      typeuser {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      username\n      company {\n        id\n        name\n        suscription {\n          name\n        }\n      }\n      typeuser {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCategory($getCategoryId: Int!) {\n  getCategory(id: $getCategoryId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n"): (typeof documents)["query GetCategory($getCategoryId: Int!) {\n  getCategory(id: $getCategoryId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetProduct($getProductId: Int!) {\n  getProduct(id: $getProductId) {\n    SKU\n    UPC\n    category {\n      name\n    }\n    id\n    image {\n      link\n    }\n    name\n    price {\n      id\n      bulkPrice\n      bulkQuantity\n      unitPrice\n      onSale\n      visible\n      currency {\n        abbreviation\n        name\n      }\n    }\n    visible\n  }\n}\n"): (typeof documents)["\nquery GetProduct($getProductId: Int!) {\n  getProduct(id: $getProductId) {\n    SKU\n    UPC\n    category {\n      name\n    }\n    id\n    image {\n      link\n    }\n    name\n    price {\n      id\n      bulkPrice\n      bulkQuantity\n      unitPrice\n      onSale\n      visible\n      currency {\n        abbreviation\n        name\n      }\n    }\n    visible\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetPrice($getPriceId: Int!) {\n  getPrice(id: $getPriceId) {\n    bulkPrice\n    bulkQuantity\n    currency {\n      name\n      abbreviation\n    }\n    id\n    onSale\n    unitPrice\n    visible\n  }\n}"): (typeof documents)["\nquery GetPrice($getPriceId: Int!) {\n  getPrice(id: $getPriceId) {\n    bulkPrice\n    bulkQuantity\n    currency {\n      name\n      abbreviation\n    }\n    id\n    onSale\n    unitPrice\n    visible\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query AllSubcategoriesByCategory($categoryId: Int!) {\n  allSubcategoriesByCategory(categoryId: $categoryId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n"): (typeof documents)["query AllSubcategoriesByCategory($categoryId: Int!) {\n  allSubcategoriesByCategory(categoryId: $categoryId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery AllUsers {\n  allUsers {\n    id\n    name\n    typeuser {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery AllUsers {\n  allUsers {\n    id\n    name\n    typeuser {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery AllTypeUser {\n  allTypeUser {\n    id\n    name\n  }\n}"): (typeof documents)["\nquery AllTypeUser {\n  allTypeUser {\n    id\n    name\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery AllProductsByCompany {\n  allProductsByCompany {\n    id\n    name\n    visible\n    SKU\n    UPC\n  }\n}\n"): (typeof documents)["\nquery AllProductsByCompany {\n  allProductsByCompany {\n    id\n    name\n    visible\n    SKU\n    UPC\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery AllCategoriesByCompany($companyId: Int) {\n  allCategoriesByCompany(companyId: $companyId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n"): (typeof documents)["\nquery AllCategoriesByCompany($companyId: Int) {\n  allCategoriesByCompany(companyId: $companyId) {\n    id\n    name\n    visible\n    linkImageCategory {\n      link\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery AllListsByCompany($companyId: Int!) {\n  allListsByCompany(companyId: $companyId) {\n    id\n    name\n    visible\n    company {\n      name\n    }\n    product {\n      id\n      name\n      SKU\n      UPC\n      visible\n      image {\n        link\n      }\n    }\n    linkImageList {\n      link\n    }\n  }\n}"): (typeof documents)["\nquery AllListsByCompany($companyId: Int!) {\n  allListsByCompany(companyId: $companyId) {\n    id\n    name\n    visible\n    company {\n      name\n    }\n    product {\n      id\n      name\n      SKU\n      UPC\n      visible\n      image {\n        link\n      }\n    }\n    linkImageList {\n      link\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;